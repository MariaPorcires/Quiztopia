import './CreateQuiz.css'
import { useState } from "react"


function CreateQuiz() {
    const [showInput, setShowInput] = useState<boolean>(false)
    const [createQuiz, setCreateQuiz] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')


    interface ApiQuizResponse {
        success: boolean;
        quizId: string;
    }

    async function handleCreatequiz() {
        const url ='https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
        const token = localStorage.getItem("token")
        console.log('JWTtoken: ', token);
        
    
        const settings = {
            method: 'POST',
            body: JSON.stringify({
               name: 'createQuiz'
            }),
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        
        const response = await fetch(url, settings)
        const data: ApiQuizResponse = await response.json()
        console.log(data);
        setShowInput(true);
    }


    return(
        <section>
            <input type='text' placeholder='Namn på quiz' value={createQuiz} onChange={event => setCreateQuiz(event.target.value)} />   
                <button onClick={handleCreatequiz}>Skapa quiz</button>
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