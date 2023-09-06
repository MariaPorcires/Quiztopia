import './CreateQuiz.css'
import { useState, useRef, useEffect } from "react"
import {handleCreatequiz} from './api'
import { Position, ApiQuestionResponse, ApiResponseGetQuiz, ApiQuizResponse, ApiQuizzesResponse, ApiQuizResponseQuestions } from '../../interfaces';

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
    const [quizzes, setQuizzes] = useState<ApiQuizzesResponse[]>([])

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
        const data: ApiQuestionResponse = await response.json()
        console.log('userid data', data.quiz.Attributes.userId);
        

        localStorage.setItem('userId',(data.quiz.Attributes.userId)) 


        }


         async function handleGetQuizzes() {
            const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
            const settings = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
            const response = await fetch(url, settings)
            const data: ApiResponseGetQuiz = await response.json()
            console.log('data',data)
            
            if(data.quizzes){
                setQuizzes(data.quizzes)
            }
        };
        const QuizElem = quizzes.map((quiz, index) => {
            return <article key={index}>{quiz.quizId}</article>
        }) 
    

    return(
        <section className='createPage'>
            <section className='page'>
            <button onClick={handleGetQuizzes}>Hämta alla quiz</button>
         {QuizElem}
            <input/>
            <button>Sök</button>
            <input className='create_input' type='text' placeholder='Namn på quiz' value={quizName} onChange={event => setQuizName(event.target.value)} />   
                <button onClick={() => handleCreatequiz(setShowInput, quizName )}>Skapa quiz</button>
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

                        <button onClick={handleAddQuestion}>Lägg till fråga</button>
                    </div>
                    
                )} 
                  <button onClick={() => getPosition(setPosition)}> Var är jag? </button>
                  <p>Du är här! {position?.latitude} {position?.longitude}</p>
                 <p> Center position: {lat} lat, {lng} lng </p>
                </section>
                 
                  <div ref={mapContainer} className="map-container" />
        </section>
    )

}

export default CreateQuiz