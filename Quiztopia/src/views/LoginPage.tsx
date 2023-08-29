import './LoginPage.css'
import { useState } from "react"


function LoginPage() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function createUser() {
        const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/auth/signup'

        const setting = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
    }

    return(
        <section>
            <input></input>
            <button>Sign up</button>
            <input></input>
            <button>Login</button>


        </section>
    )
}

export default LoginPage