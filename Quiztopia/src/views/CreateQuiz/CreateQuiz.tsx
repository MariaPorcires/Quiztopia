import './CreateQuiz.css'
import { useState } from "react"
import {handleCreatequiz} from './api'
import { Position } from '../../interfaces';
import { getPosition } from '../../geolocation';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';


function CreateQuiz() {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [quizName, setQuizName] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [position, setPosition] = useState<Position | null>(null)
    


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
                
        </section>
    )

}

export default CreateQuiz