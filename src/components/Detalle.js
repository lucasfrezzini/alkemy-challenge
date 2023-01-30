import { Navigate , Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



export default function Detalle () {
    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const [movieData, setMovieData] = useState(null);
    
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=d8ae4181638365c66eeed968ae25b657&language=es-ES`;

        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMovieData(apiData)
            })
            .catch(e => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Tuvimos un error, intente en unos minutos..'
                })
            })
    }, [setMovieData])

    return(
        <>
        {!token && <Navigate replace to="/" />}
        
        { 
        !movieData ?
        <h2> Cargando ...</h2> :
        <div className="container col-xxl-8 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
                <img src={`http://image.tmdb.org/t/p/original${movieData.poster_path}`} className="d-block mx-lg-auto img-fluid" alt={movieData.title} width="700" height="500" loading="lazy" />
            </div>
            <div className="col-lg-6">
                <h1 className="display-5 lh-1 mb-3">{movieData.title}</h1>
                <p className="lead">{movieData.overview}</p>
                <p>Estreno: {movieData.release_date}</p>
                <p>Ganancia: {movieData.revenue}</p>
                <p>Generos:</p>
                <ul>
                {movieData.genres.map((genre, idx) => {
                    return(
                        <li key={idx}>{genre.name}</li>
                    );
                })}
                </ul>
            </div>
            </div>
        </div>
        }

        </>
    );
}