import { Link } from "react-router-dom";
import Buscador from "./Buscador";

function Header (props) {
    const { favorites } = props;

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">Movieeees</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/listado">Listado</Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <Link className="nav-link" to="/favoritos">Favoritos</Link>
                            {favorites.length > 0 && <span class="badge bg-secondary">{favorites.length}</span>}
                        </li>
                    </ul>
                </div>
                <Buscador />
            </div>
        </nav>
    );
}

export default Header