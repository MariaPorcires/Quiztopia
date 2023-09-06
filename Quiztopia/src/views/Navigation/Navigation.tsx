import './Navigation.css'
import { Link } from 'react-router-dom';

function Navigation() {
    return (

        <section className='navigation'>
            
            <Link className='nav__links' to={'/createquiz'}>Skapa ett quiz</Link>
            <Link className='nav__links' to={''}>Hämta quiz</Link>
            <Link className='nav__links' to={''}>Sök quiz</Link>
        </section>
    )
}

export default Navigation