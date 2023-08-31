import './CreateQuiz.css'
import { useState, useRef, useEffect } from "react"
import {handleCreatequiz} from './api'
import { Position } from '../../interfaces';
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

    return(
        <section>
            <input type='text' placeholder='Namn på quiz' value={quizName} onChange={event => setQuizName(event.target.value)} />   
                <button onClick={() => handleCreatequiz(setShowInput, quizName )}>Skapa quiz</button>
                { showInput && (
                    <div>
                        <input placeholder='Fråga'
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        />
                        <input placeholder='Svar'
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        />

                        <button >Lägg till fråga</button>
                    </div>
                )} 
                  <button onClick={() => getPosition(setPosition)}> Var är jag? </button>
                  <p>Du är här! {position?.latitude} {position?.longitude}</p>
                  <p> Center position: {lat} lat, {lng} lng </p>
                  <div ref={mapContainer} className="map-container" />
        </section>
    )

}

export default CreateQuiz