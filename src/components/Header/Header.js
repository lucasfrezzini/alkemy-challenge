import { NavLink } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";

import "./Header.scss";
import logo from "../../assets/img/logo-primary.png";

function Header(props) {
  const { favourites } = props;

  function toggleMenu() {
    const navbar_collapse = document.querySelector(".navbar-collapse");
    navbar_collapse.classList.toggle("show");
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo site" />
          CinePLUS
        </NavLink>
        <button
          onClick={toggleMenu}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between  "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={toggleMenu}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={toggleMenu}
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={toggleMenu}
                to="/about"
              >
                About us
              </NavLink>
            </li>
            {favourites.length > 0 && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  onClick={toggleMenu}
                  to="/favourites"
                >
                  Favourites
                </NavLink>
                <span className="badge">{favourites.length}</span>
              </li>
            )}
          </ul>
          <SearchForm header />
        </div>
      </div>
    </nav>
  );
}

export default Header;
