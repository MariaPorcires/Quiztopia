import { Dispatch } from "react";

interface ApiQuizResponse {
    success: boolean;
    quizId: string;
}

async function handleCreatequiz(setShowInput: Dispatch<React.SetStateAction<boolean>>, quizname: string): Promise<void> {
    const url ='https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
    const token = localStorage.getItem("token")
    console.log('JWTtoken: ', token);
    

    const settings = {
        method: 'POST',
        body: JSON.stringify({
           name: quizname
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    
    const response = await fetch(url, settings)
    const data: ApiQuizResponse = await response.json()
    console.log(data);
    setShowInput(true);

    let quizId = data.quizId

    if(data.quizId === undefined) {
        console.log('quizId är undefined');
    }
    localStorage.setItem('quizId',(quizId)) 
    if(data.success === false){
        console.log('logga in igen')
    }

}

export { handleCreatequiz }