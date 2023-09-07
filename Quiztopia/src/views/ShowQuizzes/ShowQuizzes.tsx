import { ApiResponseGetQuiz, ApiQuizzesResponse  } from '../../interfaces'
import './ShowQuizzes.css'
import Quiz from "../../components/Quiz/Quiz"
import {useState} from 'react'


function ShowQuizzes() {
    const [quizzes, setQuizzes] = useState<ApiQuizzesResponse[]>([])

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
  /*   const QuizElem = quizzes.map((quiz, index) => {
        return <section key={index}>{quiz.quizId}<button>Välj quiz</button></section>
    }) */ 
    
    const QuizElem = quizzes.map((quiz, index) => {
        return <Quiz quiz = {quiz} key={index}/>
    }) 
    return(
        <section>
        <button onClick={handleGetQuizzes} >Hämta alla quiz</button>
        {QuizElem}
        </section>
    )

}



export default ShowQuizzes
