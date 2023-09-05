import { ApiQuizzesResponse } from "../../interfaces"


function ShowQuizzes() {

    async function handleGetQuizzes() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
        const settings = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        const response = await fetch(url, settings)
        const data: ApiQuizzesResponse  = await response.json()
        
    
        if(data.quizzes){
            setQuizzes(data.quizzes)
        }
     
    };
    
    const QuizElement = quizzes.map((quiz, index) => {
        return <Quiz key={index} quiz={quiz.quizId} />
    })
    

    return(
        <>
         <button onClick={handleGetQuizzes}>Hämta alla quiz</button>
          {QuizElement}
        </>
    )
}

