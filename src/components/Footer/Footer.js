import { Link } from 'react-router-dom';

import './Footer.scss';
import logo from '../../assets/img/logo-primary.png';

function Footer () {

    const y = new Date().getFullYear();

    return(
        <div className="container">
            <footer className="Footer d-flex flex-wrap justify-content-between align-items-center">
                <p className="col-md-4 mb-0">©{y} MOVIEMOVIE, Inc</p>

                {<Link to="/"><img src={logo} /></Link>}

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><Link to="/home" className="nav-link px-2">Home</Link></li>
                    <li className="nav-item"><Link to="/movies" className="nav-link px-2">Movies</Link></li>
                    <li className="nav-item"><Link to="/about" className="nav-link px-2">About us</Link></li>
                    <li className="nav-item"><Link to="/contact" className="nav-link px-2">Contact</Link></li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer