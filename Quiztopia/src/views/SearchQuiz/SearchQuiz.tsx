

function SearchQuiz() {

    async function GetQuizFromUser() {
        const quizId = localStorage.getItem('quizId')
        const userId = localStorage.getItem('user')
    }
    return(
        <></>
    )
}

export default SearchQuiz



/* const SpeificQuizFromUser = async()=>{

    const quizId = localStorage.getItem('quizId')
    const userId = localStorage.getItem('user')

    const url  = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/${userId}/${quizId}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
 */