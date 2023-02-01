import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import Card from "../Card/Card";

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
                    console.log(movie);
                    return (
                        <Card key={idx} movie={movie} addOrRemoveFromFavs={props.addOrRemoveFromFavs} />
                    );
                })
                }
                </div>
            </div>
        </>
    )
}