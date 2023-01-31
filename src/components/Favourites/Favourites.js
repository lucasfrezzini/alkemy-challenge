import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

import './Favourites.scss';

export default function Favourites(props) {
    let token = sessionStorage.getItem('token');

    const [favourites, setFavorites] = useState([]);
    const favsInLocal = localStorage.getItem('favs');
    
    useEffect(()=>{
        const favsInLocal = localStorage.getItem('favs');
        const favs = JSON.parse(favsInLocal);
        setFavorites(favs);
    }, [favsInLocal])

    return(
        <>
            {!token && <Navigate replace to="/login" />}
            <div className="container">
                <h2>Favourites</h2>
                <div className="row Favourites">
                {
                favourites.map((movie, idx) => {
                    return (
                        <div className="col-6 col-md-3 my-4" key={idx}>
                            <div className="Card">
                                <Link to={`/detail?movieID=${movie.movieID}`} >
                                    <img src={movie.imgURL} className="card-img-top" alt="..." />
                                </Link>
                                <button 
                                    onClick={props.addOrRemoveFromFavs} 
                                    data-movie-id={movie.id}
                                    className="btn_favourite btn_favourite__add">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                    </svg>
                                </button>
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <Link to={`/detail?movieID=${movie.movieID}`} className="btn btn-primary">View detail</Link>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
                </div>
            </div>
        </>
    )
}