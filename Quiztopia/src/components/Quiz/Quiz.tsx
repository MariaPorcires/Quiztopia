import { ApiQuizzesResponse } from "../../interfaces"
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import './Quiz.css'

interface QuizProps {
    quiz: ApiQuizzesResponse;
    map: mapboxgl.Map | null;
}

interface Quiz {
    quiz: {
        questions: Question[]
    }
}
interface Question {
    answer: string,
    location: {
        latitude: number,
        longitude: number
    },
    question: string
}

function Quiz(props: QuizProps) {
    const quiz = props.quiz

    async function handleChosenQuiz() {
        const url =`https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${quiz.userId}/${quiz.quizId}`
        const settings = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',}
            
    }
        const response = await fetch(url, settings)
        const data: Quiz = await response.json()
        console.log(data);

      
        const questions: Question[] = data.quiz.questions
        questions.forEach(question => {
           if(!props.map) {
                return
           }
            const marker = new mapboxgl.Marker()
             marker.setLngLat([question.location.longitude, question.location.latitude])
             marker.addTo(props.map)
             marker.setPopup(new mapboxgl.Popup().setHTML(`<h1>Fråga: ${ question.question } Svar: ${ question.answer}</h1>`))
             
        });
    }
    return(
        <div className="quiz">
            <div className="quizContainer">
            <h2>Quiz: {quiz.quizId}</h2>
            <p>Av: {quiz.username}</p>
            <button onClick={handleChosenQuiz}>Välj quiz</button>
            </div>
        </div>
    )
}

export default Quiz