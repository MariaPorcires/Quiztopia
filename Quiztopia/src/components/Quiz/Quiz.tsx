import { ApiQuizzesResponse } from "../../interfaces"

interface QuizProps {
    quiz: ApiQuizzesResponse
}

function Quiz(props: QuizProps) {
    const quiz = props.quiz
    return(
        <div className="quiz">
            <h2>Quiz: {quiz.quizId}</h2>
            <p>Av: {quiz.username}</p>
            <button>Välj quiz</button>

        </div>
    )
}

export default Quiz