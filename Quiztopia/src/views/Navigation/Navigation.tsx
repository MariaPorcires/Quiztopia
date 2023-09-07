import './Navigation.css'
import { Link } from 'react-router-dom';

function Navigation() {

    
    return (

        <section className='navigation'>
            <section className='img'>
                <img className='img' src='\src\assets\pin7.jpg' />

            </section>
            <Link className='nav__links' to={'/createquiz'}>Skapa ett quiz</Link>
            <Link className='nav__links' to={'/showquizzes'}>Hämta quiz</Link>
            
        </section>
    )
}

export default Navigation