import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Movies from "./components/Movies/Movies";
import Detail from "./components/Detail/Detail";
import Results from "./components/Results/Results";
import About from "./components/About/About";
import Favourites from "./components/Favourites/Favourites";

// Styles
import "./css/bootstrap.min.css";
import "./css/app.scss";

function App() {
  const [favourites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal != null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem("favs");
    let tempMoviesInFavs;

    favMovies === null
      ? (tempMoviesInFavs = [])
      : (tempMoviesInFavs = JSON.parse(favMovies));

    const btn = e.currentTarget;
    const parent = btn.parentElement;

    const poster_path = parent.querySelector("img").dataset.posterPath;
    const title = parent.querySelector("h5").innerText;
    const vote_average = Number(parent.querySelector(".average").innerText);
    const id = btn.dataset.id;

    const movieData = {
      poster_path,
      title,
      vote_average,
      id,
    };

    let movieIsInArray = tempMoviesInFavs.find((movie) => {
      return movie.id === movieData.id;
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
    }
  };

  return (
    <>
      <div className="layout">
        <Header favourites={favourites} />
        <main className="main">
          <Routes>
            <Route
              exact
              path="/"
              element={<Home addOrRemoveFromFavs={addOrRemoveFromFavs} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/movies"
              element={
                <Movies
                  title={"Discover movies"}
                  endPoint={"discover_popularity"}
                  cant_movies={20}
                  addOrRemoveFromFavs={addOrRemoveFromFavs}
                />
              }
            />
            <Route path="/detail" element={<Detail />}>
              <Route path=":movieID" element={<Detail />} />
            </Route>
            <Route
              path="/results/:search"
              element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs} />}
            />
            <Route
              path="/favourites"
              element={<Favourites addOrRemoveFromFavs={addOrRemoveFromFavs} />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
