import { ApiResponseGetQuiz, ApiQuizzesResponse  } from '../../interfaces'
import './ShowQuizzes.css'
import Quiz from "../../components/Quiz/Quiz"
import {useState, useRef, useEffect} from 'react'
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFwb3JjaXJlcyIsImEiOiJjbGxwNjUwMnIwM2tqM3BwOG5idWxhd2lpIn0.lzqiA47Mt1DcZZw3cSfhRQ'
console.log(mapboxgl.accessToken); 


function ShowQuizzes() {
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
        return <Quiz quiz = {quiz} key={index}/>
    }) 

 

    return(
        <section className='showQuizzes'>
            
        <button onClick={handleGetQuizzes} >Hämta alla quiz</button>
        {QuizElem}

            <div ref={mapContainer} className="map-container" />
        
        </section>
    )

}





export default ShowQuizzes
