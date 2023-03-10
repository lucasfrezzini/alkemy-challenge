import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Card from "../Card/Card";
import { endPoints } from "../../utils/endpoints";

import "./List.scss";
import SkeletonCard from "../Skeletons/SkeletonCard";

const MySwal = withReactContent(Swal);

function List(props) {
  let token = sessionStorage.getItem("token");
  const [moviesList, setMoviesList] = useState(null);

  useEffect(() => {
    const endPoint = props.endPoint
      ? endPoints[props.endPoint]
      : props.endPointFull;
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        props.cant_movies > 0
          ? setMoviesList(apiData.results.slice(0, props.cant_movies))
          : setMoviesList(apiData.results);
      })
      .catch((e) => {
        MySwal.fire({
          icon: "error",
          title: "We have an error, please try again in a few minutes...",
        });
      });
  }, [setMoviesList]);

  return (
    <>
      {/* {!token && <Navigate replace to="/login" />} */}
      <div className="container">
        <div className="row">
          {moviesList == null ? (
            <SkeletonCard />
          ) : moviesList.length > 0 ? (
            moviesList.map((movie) => {
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  addOrRemoveFromFavs={props.addOrRemoveFromFavs}
                />
              );
            })
          ) : (
            <p>We had no results related to the search.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default List;
