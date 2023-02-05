import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

import './Header.scss';
import logo from '../../assets/img/logo-primary.png';


function Header (props) {
    const { favourites } = props;


    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Logo site" />
                    MOVIEMOVIE
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/movies">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About us</Link>
                        </li>
                        { favourites.length > 0 &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/favourites">Favourites</Link>
                            <span className="badge">{favourites.length}</span>
                        </li>
                        }
                    </ul>
                </div>
                <SearchForm header />
            </div>
        </nav>
    );
}

export default Header