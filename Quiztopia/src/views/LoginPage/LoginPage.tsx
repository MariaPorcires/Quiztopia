import './LoginPage.css'
import { useState } from "react"
import { useNavigate } from 'react-router';


function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')

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
            setUsername('')
            setPassword('')
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
        localStorage.setItem("token", data.token || '')
 
        if( data.success ) {
			navigate('/navigation')
		} else {
			setMessage('Kunde inte logga in.')
		}
    }

    return(
        <div className='loginPage'>
            
            <section className='loginPage_frame'>
            
                <section className='loginPage_input'>
                
                    <input className='inputs' type="text" placeholder='Användarnamn' value={username}
                    onChange={event =>  setUsername(event.target.value)} />
                    
                    <input className='inputs' type="text" placeholder='Lösenord' value={password}
                    onChange={event => setPassword(event.target.value)} />
                    </section>
                
                <section className='loginPage_buttons'>
                    <button onClick={ handleCreateUser }>Sign up</button>
                    <button onClick={ handleLogIn }>Login</button>
                    
                </section>
                <p> {message} </p>
            </section>

        </div>
    )
}

export default LoginPage