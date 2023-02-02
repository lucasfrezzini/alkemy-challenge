import { useEffect, useState } from "react";
import { Navigate , Link } from "react-router-dom";
import List from "../List/List";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { LANGUAGE, API_KEY } from "../../utils/endpoints";
import toHoursAndMinutes from "../../utils/utils";

// import no_movie from "../../assets/img/no_movie.jpg";
// import no_character from "../../assets/img/no_character.jpg";

import './Detail.scss';

const MySwal = withReactContent(Swal);



export default function Detail() {
    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID');

    const [movieData, setMovieData] = useState(null);
    const [movieCredits, setmovieCredits] = useState(null);
    const [movieCreditsCrew, setmovieCreditsCrew] = useState(null);
    const [runtime, setRuntime] = useState(null);
 
    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=${LANGUAGE}`;

        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMovieData(apiData);
            })
            .catch(e => {
                MySwal.fire({
                    icon: 'error',
                    title: 'We have an error, please try again in a few minutes...' + e
                })
            })
    }, [setMovieData])

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=${LANGUAGE}`;

        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setmovieCredits(apiData);
            })
            .catch(e => {
                MySwal.fire({
                    icon: 'error',
                    title: 'We have an error, please try again in a few minutes...' + e
                })
            })
    }, [setmovieCredits])

    useEffect(()=>{
        if (movieCredits != null) {
            const crewSorted = movieCredits.crew.sort((a,b)=>{
                return b.popularity - a.popularity;
            })
            setmovieCreditsCrew(crewSorted);
        }
    }, [movieData])


    useEffect(()=>{
        if (movieData != null) {
            setRuntime(toHoursAndMinutes(movieData.runtime));
        }
    }, [movieData])

    return(
        <>
        {!token && <Navigate replace to="/login" />}
        

        {!movieData ? 
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        :
        <section className="Detail">
            <div className="movie-poster" style={{ backgroundImage: "url(http://image.tmdb.org/t/p/original" + movieData.backdrop_path + ")" }}>
                <div className="container">
                    <div className="movie-hero">
                        <img src={`http://image.tmdb.org/t/p/original${movieData.poster_path}`} alt={movieData.title} />
                        <div>
                            <h1>{movieData.title}</h1>
                            <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                            {movieData.release_date}
                            <span>•</span> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                            </svg>
                            {runtime != undefined && runtime.hours + 'h ' + runtime.minutes + 'm'}
                            <span>•</span> 
                            {movieData.genres.map((genre, idx) => {
                                return(<Link key={idx} to="/">{genre.name}</Link>)
                            })} 
                            </p>
                            <h4>OVERVIEW</h4>
                            <p>{movieData.overview}</p>
                            <h3></h3>
                        </div>
                    </div>
                </div>
            </div>
            <section className="movie-detail">
                <div className="container">
                    <div className="row movie-detail__bg">
                        <h2>Cast principal</h2>
                        <article className="characters">
                            {
                            !movieCredits ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            movieCredits.cast.slice(0, 12).map((oneCast, idx)=>{
                                return(
                                    <div className="card" key={idx}>
                                        <img 
                                            src={`http://image.tmdb.org/t/p/original${oneCast.profile_path}`} 
                                            alt={oneCast.title} 
                                            className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{oneCast.name}</h5>
                                            <p className="card-text">{oneCast.character}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </article>
                        <h2>Crew principal</h2>
                        <article className="crew">
                            {
                            !movieCredits ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            movieCredits.crew.slice(0, 24).map((oneCrew, idx)=>{
                                return(
                                    <div key={idx}>
                                        <h5 className="card-title">{oneCrew.name}</h5>
                                        <p className="card-text">{oneCrew.job}</p>
                                    </div>
                                )
                            })}
                        </article>
                        <h2>Recommended movies</h2>
                        <List 
                            endPointFull={`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}&language=${LANGUAGE}`}
                            cant_movies={8} />
                    </div>

                </div>
            </section>
        </section>
        }

        </>
    );
}