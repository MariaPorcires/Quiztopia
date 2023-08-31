import './CreateQuiz.css'
import { useState } from "react"
import {handleCreatequiz} from './api'
import { getPosition } from '../../geolocation';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';


function CreateQuiz() {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [createQuiz, setCreateQuiz] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')


  



    return(
        <section>
            <input type='text' placeholder='Namn på quiz' value={createQuiz} onChange={event => setCreateQuiz(event.target.value)} />   
                <button onClick={() => handleCreatequiz(setShowInput, createQuiz )}>Skapa quiz</button>
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


                        <button>Submit Quiz Name</button>
                        
                    </div>
                )} 
        </section>
    )

}

export default CreateQuiz