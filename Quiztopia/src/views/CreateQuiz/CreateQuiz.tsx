import './CreateQuiz.css'

//import { useLocation } from "react-router-dom"

function CreateQuiz() {


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
               name: 'newQuiz'
            }),
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        
        const response = await fetch(url, settings)
        const data: ApiQuizResponse = await response.json()
        console.log(data);
    }


    return(
        <section>
        <button onClick={handleCreatequiz}>Create quiz</button>
        </section>
    )

}

export default CreateQuiz