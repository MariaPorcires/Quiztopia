import './ShowOptions.css'
import { Link } from 'react-router-dom';

function ShowOptions() {
    return (

        <section className='navigation'>

            <Link className='nav_link' to={'/createquiz'}>Skapa ett quiz</Link>
            <Link className='nav_link' to={''}>Hämta alla quiz</Link>
            <Link className='nav_link' to={''}>Sök quiz</Link>
        </section>
    )
}

export default ShowOptions