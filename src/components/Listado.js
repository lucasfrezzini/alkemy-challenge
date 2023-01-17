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
                <div className="col-3">
                    <div className="card" style={{width: "18rem"}}>
                        <img src="" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="#" className="btn btn-primary">Go somewhere</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Listado;