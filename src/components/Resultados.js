import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Resultados () {
    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('search');

    const [ moviesResults, setMoviesResults ] = useState([]);
    
    useEffect(()=> {

        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=d8ae4181638365c66eeed968ae25b657&language=es-ES&query=${keyword}&page=1&include_adult=false`;

        axios.get(endPoint)
        .then(result => {
            const apiData = result.data.results;
            setMoviesResults(apiData);
        })
        .catch(error => {
            MySwal.fire({
                icon: 'error',
                title: 'Tuvimos un error, intente en unos minutos..'
            })
        })
    }, [moviesResults]);

    return (
        <>
            {!token && <Navigate replace to="/" />}
            <h2>Buscaste: <em>{keyword}</em></h2>

            {moviesResults.length === 0 && <h5>No hay resultados para esa búsqueda...</h5>}

            <div className="row">
            {
            moviesResults.map((oneMovie, idx) => {
                return (
                    <div className="col-3 my-4" key={idx}>
                        <div className="card" style={{width: "18rem"}}>
                            <Link to={`/detalle?movieID=${oneMovie.id}`}>
                                <img src={`http://image.tmdb.org/t/p/original${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{oneMovie.title}</h5>
                                <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">View detail</Link>
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