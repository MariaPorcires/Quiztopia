import './CreateQuiz.css'
import { useState, useRef, useEffect } from "react"
import { handleCreatequiz } from './api'
import { Position, ApiQuestionResponse, ApiResponseGetQuiz, ApiQuizResponse, ApiQuizzesResponse, ApiQuizResponseQuestions, QuestionsResponse } from '../../interfaces';
import { getPosition } from '../../geolocation';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFwb3JjaXJlcyIsImEiOiJjbGxwNjUwMnIwM2tqM3BwOG5idWxhd2lpIn0.lzqiA47Mt1DcZZw3cSfhRQ'
console.log(mapboxgl.accessToken);


function CreateQuiz() {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [quizName, setQuizName] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [position, setPosition] = useState<Position | null>(null)
    const mapContainer = useRef(null)
    const mapRef = useRef<MapGl | null>(null)
    const [lat, setLat] = useState<number>(57.7)
    const [lng, setLng] = useState<number>(11.89)
    const [zoom, setZoom] = useState<number>(10)
    const [lngQuestion, setLngQuestion] = useState<number>()
    const [latQuestion, setLatQuestion] = useState<number>()
    const [addedQuestions, setAddedQuestions] = useState<ApiQuizResponseQuestions[]>([])
    
    
    useEffect(() => {
        
        if( mapRef.current || !mapContainer.current ) return
        
        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        
        const map: MapGl = mapRef.current
        
        map.on('move', () => {
            interface Position {
                lng: number;
                lat: number;
            }
            const position: Position = map.getCenter()
            setLat(Number(position.lat.toFixed(4)))
            setLng(Number(position.lng.toFixed(4)))
            setZoom(map.getZoom());
        
        })

        map.on('click',(e)=>{
            console.log('Click on map', e)
            const marker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
            
            const lngLat = marker.getLngLat()
            setLngQuestion(e.lngLat.lng)
            setLatQuestion( e.lngLat.lat)
            
            console.log('lnglat klickat',lngLat);
            
        })
        
    }, [lat, lng, zoom])
    
    
    async function handleAddQuestion() {
        
        const quizId = localStorage.getItem('quizId')
        console.log(quizId);
        
        const url ='https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question'
        const token: string = localStorage.getItem('token') || ""
        console.log('JWTtoken: ', token)
        
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                name: quizId,
                question: question,
                answer: answer,
                location: {
                    longitude: lng,
                    latitude: lat,
                }
            }),
            
            headers: { 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`},
        }
        
        const response = await fetch(url, settings)
        const data: QuestionsResponse = await response.json()
        console.log(data);
        setAddedQuestions([ 
            ...addedQuestions,
            {
                answer: answer,
                location: {
                    latitude: lat,
                    longitude: lng,
                },
                question: question,
            }
        ])
    }
    
    
    return(
        <section className='createPage'>
            <section className='createPage__main'>
                <section className='createPage__container'>
                <button className='create__button' onClick={() => getPosition(mapRef.current, setPosition)}> Var är jag? </button>
            <h2 className='create__title'>Skapa quiz:</h2>
            <input className='create_input' type='text' placeholder='Namn på quiz' value={quizName} onChange={event => setQuizName(event.target.value)} /> 

            <button className='create__button' onClick={() => handleCreatequiz(setShowInput, quizName )}>Skapa quiz</button>
            { showInput && (
                <div>
                <input className='create_input' placeholder='Fråga'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                />
                <input className='create_input' placeholder='Svar'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                />
                
                <button className='create__button' onClick={handleAddQuestion}>Lägg till fråga</button>
                <div>
                    {
                        addedQuestions.map(q => (
                            <div key={q.question}>{q.question} {q.answer} {q.location.latitude} {q.location.longitude}</div>
                        ))
                    }
                </div>
                </div>
                
                )} 
            </section>
            
            <section className='createPage__map'>
                <div ref={mapContainer} className="map-container" />
                </section>
                </section>
            </section>
            )
            
        }
        
        export default CreateQuiz