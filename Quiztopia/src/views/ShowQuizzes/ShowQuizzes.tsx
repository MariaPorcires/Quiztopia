
import './ShowQuizzes.css'
import Quiz from "../../components/Quiz/Quiz"

function ShowQuizzes() {
    
    const QuizElem: string = quizzes.map((quiz, index) => {
        return <Quiz quiz = {quiz} key={index}/>
    }) 
    return(
        <p>{QuizElem}</p>
    )

}



export default ShowQuizzes
