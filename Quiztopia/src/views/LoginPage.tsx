import './LoginPage.css'
import { useState } from "react"


function LoginPage() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    interface ApiResponse {
        success: boolean;
        message?: string;
       }

    async function createUser() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'

        const settings = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const response = await fetch(url, settings)
        const data: ApiResponse = await response.json()
        console.log('data from user',data);
        
    }
    

    return(
        <section>
            <input type="text" placeholder='Sign up' value={username}
            onChange={event =>  setUsername(event.target.value)} />

            <button onClick={createUser}>Sign up</button>
            <input></input>
            <button>Login</button>


        </section>
    )
}

export default LoginPage