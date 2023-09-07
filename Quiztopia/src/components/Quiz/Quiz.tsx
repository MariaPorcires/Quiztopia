import { ApiQuizzesResponse } from "../../interfaces"

interface QuizProps {
    quiz: ApiQuizzesResponse
}

function Quiz(props: QuizProps) {
    const quiz = props.quiz
    return(
        <div>
            {quiz.quizId}
        </div>
    )
}

export default Quiz