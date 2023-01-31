import { Navigate, Link } from "react-router-dom";

import './Favourites.scss';

export default function Favourites(props) {
    let token = sessionStorage.getItem('token');

    return(
        <>
            {!token && <Navigate replace to="/login" />}
            <h2>Favourites</h2>
            <div className="row Favourites">
            {
            props.favourites.map((movie, idx) => {
                return (
                    <div className="col-6 col-md-3 my-4" key={idx}>
                        <div className="card">
                            <Link to={`/detail?movieID=${movie.movieID}`} >
                                <img src={movie.imgURL} className="card-img-top" alt="..." />
                            </Link>
                            <button 
                                onClick={props.addOrRemoveFromFavs} 
                                data-movie-id={movie.movieID}
                                className="btn_favorite added">
                                    🖤
                            </button>
                            {/* 💚 */}
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.overview.substring(0, 200)}...</p>
                                <Link to={`/detail?movieID=${movie.movieID}`} className="btn btn-primary">View detail</Link>
                            </div>
                        </div>
                    </div>
                );
            })
            }
            </div>
        </>
    )
}