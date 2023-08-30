import './LoginPage.css'
import { useState } from "react"
import { useNavigate } from 'react-router';


function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    //const [token, setToken] = useState<string>('') 

    interface ApiResponse {
        success: boolean;
        message?: string;
       }

    async function handleCreateUser() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'

        const settings = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }

        const response = await fetch(url, settings)
        const data: ApiResponse = await response.json()
        console.log('data from user',data);

        if( data.success ) {
			setMessage('Användaren skapades.')
		} else {
			setMessage('Kunde inte skapa användare.')
		}
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
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlF3cHh2VEx0WW0wY1YyQlVaLXFWYSIsInVzZXJuYW1lIjoidHQiLCJpYXQiOjE2OTMzODg4MTksImV4cCI6MTY5MzM5MjQxOX0.1J7WZTuNsbQLrwG4oYTR2KULyP6JnrvwTRIS3UCOKSM" )
 
        if( data.success ) {
			navigate('/createquiz')
			//if( data.token ) setToken(data.token)
		} else {
			setMessage('Kunde inte logga in.')
		}
    }

    return(
        <div className='loginPage'>
            <header className='loginPage_header'>
                <h1>Quiztopia</h1>
            </header>
            <section className='loginPage_frame'>
                <section className='loginPage_input'>
                    <input type="text" placeholder='Användarnamn' value={username}
                    onChange={event =>  setUsername(event.target.value)} />
                    
                    <input type="text" placeholder='Lösenord' value={password}
                    onChange={event => setPassword(event.target.value)} />
                </section>
                
                <section className='loginPage_buttons'>
                    <button onClick={ handleCreateUser }>Sign up</button>
                    <button onClick={ handleLogIn }>Login</button>
                    <p> {message} </p>
                </section>
            </section>

        </div>
    )
}

export default LoginPage