import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './Card.scss';

export default function Card(props){
    const { movie, idx, addOrRemoveFromFavs } = props;
    const [inFav, setInFav ] = useState(false);

    const favsInLocal = localStorage.getItem('favs');

    useEffect(()=> {

        if (favsInLocal != null) {
            const favsArray = JSON.parse(favsInLocal);
            const favourite_add = favsArray.some((oneMovie) => {
                return oneMovie.id == movie.id;
            });
            setInFav(favourite_add);
        }
    }, [favsInLocal])

    return(
        <div className="col-6 col-md-3 my-4" key={idx}>
            <div className="Card">
                <Link to={`/detail?movieID=${movie.id}`} >
                    <img src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} data-poster-path={movie.poster_path} className="card-img-top" alt="..." />
                </Link>
                <button 
                    onClick={addOrRemoveFromFavs} 
                    data-id={movie.id}
                    className={`btn_favourite ${inFav ? "btn_favourite__add" : ""}`}>
                    {inFav 
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                        </svg> 
                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
                    }
                </button>
                <span className="average">
                    {movie.vote_average}
                </span>
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <Link to={`/detail?movieID=${movie.id}`} className="btn btn_primary">
                        View detail
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}