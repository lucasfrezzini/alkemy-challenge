import { Navigate , Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


function Listado (props) {

    let token = sessionStorage.getItem('token');
    const [moviesList, setMoviesList] = useState([]);
    
    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=d8ae4181638365c66eeed968ae25b657&language=es-ES&sort_by=popularity.desc&include_adult=true"
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results)
            })
            .catch(e => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Tuvimos un error, intente en unos minutos..'
                })
            })
    }, [setMoviesList])

    return(
        <>
            {!token && <Navigate replace to="/" />}
            <div className="row">
            {
            moviesList.map((movie, idx) => {
                return (
                    <div className="col-6 col-md-3 my-4" key={idx}>
                        <div className="card">
                            <Link to={`/detalle?movieID=${movie.id}`} >
                                <img src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} className="card-img-top" alt="..." />
                            </Link>
                            <button 
                                onClick={props.addOrRemoveFromFavs} 
                                data-movie-id={movie.id}
                                className="btn_favorite added">
                                    🖤
                            </button>
                            {/* 💚 */}
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.overview.substring(0, 200)}...</p>
                                <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">View detail</Link>
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