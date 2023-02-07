import { useEffect, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import List from "../List/List";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { LANGUAGE, API_KEY } from "../../utils/endpoints";
import toHoursAndMinutes from "../../utils/utils";

import no_movie from "../../assets/img/no-movie.jpg";
import no_character from "../../assets/img/no-character.jpg";

import "./Detail.scss";

const MySwal = withReactContent(Swal);

export default function Detail() {
  let token = sessionStorage.getItem("token");

  // let query = new URLSearchParams(window.location.search);
  // let movieID = query.get('movieID');
  let { movieID } = useParams();

  const [movieData, setMovieData] = useState(null);
  const [movieCredits, setmovieCredits] = useState(null);
  const [movieCreditsCrew, setmovieCreditsCrew] = useState(null);
  const [runtime, setRuntime] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=${LANGUAGE}`;

    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMovieData(apiData);
        return apiData;
      })
      .then((data) => {
        setRuntime(toHoursAndMinutes(data.runtime));
      })
      .catch((e) => {
        MySwal.fire({
          icon: "error",
          title: "We have an error, please try again in a few minutes..." + e,
        });
      });
  }, [setMovieData]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${API_KEY}&language=${LANGUAGE}`;

    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setmovieCredits(apiData);
        return apiData;
      })
      .then((data) => {
        const crewSorted = data.crew.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        setmovieCreditsCrew(crewSorted);
      })
      .catch((e) => {
        MySwal.fire({
          icon: "error",
          title: "We have an error, please try again in a few minutes..." + e,
        });
      });
  }, [setmovieCredits]);

  return (
    <>
      {/* {!token && <Navigate replace to="/login" />} */}

      {!movieData ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <section className="Detail">
          <div
            className="movie-poster"
            style={{
              backgroundImage:
                "url(http://image.tmdb.org/t/p/original" +
                movieData.backdrop_path +
                ")",
            }}
          >
            <div className="container">
              <div className="movie-hero">
                <img
                  src={
                    movieData.poster_path != null
                      ? `http://image.tmdb.org/t/p/original${movieData.poster_path}`
                      : no_movie
                  }
                  alt={movieData.title}
                />
                <div className="movie-hero__info">
                  <h1>{movieData.title}</h1>
                  <p>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-calendar3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                      {movieData.release_date}
                      <em>•</em>
                    </span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-stopwatch"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                        <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                      </svg>
                      {runtime != undefined &&
                        runtime.hours + "h " + runtime.minutes + "m"}
                      <em>•</em>
                    </span>
                    {movieData.genres.map((genre, idx) => {
                      return (
                        <Link key={idx} to="/">
                          {genre.name}
                        </Link>
                      );
                    })}
                  </p>
                  <h4>OVERVIEW</h4>
                  <p>{movieData.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <section className="movie-detail">
            <div className="container">
              {movieCredits && (
                <div className="row movie-detail__bg">
                  {(movieCredits.crew.length == 0 ||
                    movieCredits.cast.length == 0) && (
                    <h2>Not info for this movie 😭</h2>
                  )}
                  {movieCredits.cast.length != 0 && (
                    <>
                      <h2> Cast principal</h2>
                      <article className="characters">
                        {!movieCredits ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          movieCredits.cast.slice(0, 12).map((oneCast, idx) => {
                            return (
                              <div className="card" key={idx}>
                                <img
                                  src={
                                    oneCast.profile_path !== null
                                      ? `http://image.tmdb.org/t/p/w500${oneCast.profile_path}`
                                      : no_character
                                  }
                                  alt={oneCast.title}
                                  className="card-img-top"
                                />
                                <div className="card-body">
                                  <h5 className="card-title">{oneCast.name}</h5>
                                  <p className="card-text">
                                    {oneCast.character}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </article>
                    </>
                  )}
                  {movieCredits.crew.length != 0 && (
                    <>
                      <h2>Crew principal</h2>
                      <article className="crew">
                        {!movieCreditsCrew ? (
                          <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          movieCreditsCrew.slice(0, 24).map((oneCrew, idx) => {
                            return (
                              <div key={idx} className="">
                                <h5 className="card-title">{oneCrew.name}</h5>
                                <p className="card-text">{oneCrew.job}</p>
                              </div>
                            );
                          })
                        )}
                      </article>
                    </>
                  )}
                  {!(
                    movieCredits.crew.length == 0 &&
                    movieCredits.cast.length == 0
                  ) && (
                    <>
                      <h2>Recommended movies</h2>
                      <List
                        endPointFull={`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}&language=${LANGUAGE}`}
                        cant_movies={8}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </section>
        </section>
      )}
    </>
  );
}
