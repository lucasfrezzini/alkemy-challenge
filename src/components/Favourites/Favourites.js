import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Card from "../Card/Card";

import "./Favourites.scss";

export default function Favourites(props) {
  let token = sessionStorage.getItem("token");

  const [favourites, setFavorites] = useState([]);
  const favsInLocal = localStorage.getItem("favs");

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    const favs = JSON.parse(favsInLocal);
    setFavorites(favs);
  }, [favsInLocal]);

  return (
    <>
      {/* {!token && <Navigate replace to="/login" />} */}
      <section>
        <div className="container section-header">
          <h2>Favourites</h2>
        </div>
        <div className="container">
          <div className="row Favourites">
            {favourites.length > 0 ? (
              favourites.map( movie => {
                return (
                  <Card
                    key={movie.id}
                    movie={movie}
                    addOrRemoveFromFavs={props.addOrRemoveFromFavs}
                  />
                );
              })
            ) : (
              <p>You don't have any favourite movie!</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
