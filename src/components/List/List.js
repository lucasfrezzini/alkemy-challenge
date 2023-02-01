import { Navigate , Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Card from "../Card/Card";

import './List.scss';

const MySwal = withReactContent(Swal);


function List(props) {

    let token = sessionStorage.getItem('token');
    const [moviesList, setMoviesList] = useState([]);
    
    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/movie/upcoming?api_key=d8ae4181638365c66eeed968ae25b657"
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results)
            })
            .catch(e => {
                MySwal.fire({
                    icon: 'error',
                    title: 'We have an error, please try again in a few minutes...'
                })
            })
    }, [setMoviesList])

    return(
        <>
            {!token && <Navigate replace to="/login" />}
            <div className="container">
            <div className="row">
            {
            moviesList.slice(0, 4).map((movie, idx) => {
                return (
                    <Card key={idx} movie={movie} addOrRemoveFromFavs={props.addOrRemoveFromFavs} />
                );
            })
            }
            </div>
            </div>
        </>
    );
}

export default List;