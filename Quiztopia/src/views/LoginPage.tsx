import './LoginPage.css'
import { useState } from "react"


function LoginPage() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    interface ApiResponse {
        success: boolean;
        message?: string;
       }

    async function handleCreateUser() {
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

    interface ApiSignUp {
        success: boolean;
        message?: string;
        token?: string;
      }
    
    async function handleLogIn() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/login'

        const settings = {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
        const response = await fetch(url, settings)
        const data: ApiSignUp = await response.json()
        console.log('nästa data: ', data);
        
    }

    return(
        <section>
            <input type="text" placeholder='Användarnamn' value={username}
            onChange={event =>  setUsername(event.target.value)} />

            <input type="text" placeholder='Lösenord' value={password}
            onChange={event => setPassword(event.target.value)} />

            <button onClick={ handleCreateUser }>Sign up</button>
            <button onClick={ handleLogIn }>Login</button>


        </section>
    )
}

export default LoginPage