import { Navigate , Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

function Listado () {

    let token = localStorage.getItem('token');
    const [moviesList, setMoviesList] = useState([]);
    
    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=d8ae4181638365c66eeed968ae25b657&language=es-ES&sort_by=popularity.desc&include_adult=true"
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results)
            })
    }, [setMoviesList])

    console.log(moviesList);

    return(
        <>
            {!token && <Navigate replace to="/" />}
            <div className="row">
            {moviesList.length > 0 && 
            moviesList.map(movie => {
                return (
                    <div className="col-3" key={movie.id}>
                        <div className="card" style={{width: "18rem"}}>
                            <img src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.overview}</p>
                                <Link to="#" className="btn btn-primary">Go somewhere</Link>
                            </div>
                        </div>
                    </div>
                );
            })
            }
            </div>
        </>
    );
}

export default Listado;