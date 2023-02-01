import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from "./components/Login/Login";
import List from './components/List/List';
import Detail from './components/Detail/Detail';
import Results from './components/Results/Results';
import Favourites from './components/Favourites/Favourites';


// Styles
import './css/bootstrap.min.css'
import './css/app.scss';


function App() {
  const API_KEY = 'd8ae4181638365c66eeed968ae25b657';
  const ORDERS = [
    'popularity.desc'
  ]

  const MOVIES_QUERYS = [
    'top_rated',
    'popular',
    'upcoming',
    'now_playing'
  ]

  const [favourites, setFavorites ] = useState([]);

  useEffect(()=> {
      const favsInLocal = localStorage.getItem('favs');
      if (favsInLocal != null) {
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);
          console.log(favsArray);
      }
  }, [])

  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem('favs');
    let tempMoviesInFavs;
  
    favMovies === null 
      ? tempMoviesInFavs = [] 
      : tempMoviesInFavs = JSON.parse(favMovies);


    const btn = e.currentTarget;
    const parent = btn.parentElement;

    const poster_path = parent.querySelector('img').dataset.posterPath;
    const title = parent.querySelector('h5').innerText;
    const vote_average = parent.querySelector('.average').innerText;
    const id = btn.dataset.id;

    const movieData = {
      poster_path,
      title,
      vote_average,
      id
    }

    let movieIsInArray = tempMoviesInFavs.find(movie => {
      return movie.id === movieData.id;
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log('Se agrego peli')
    } else {
      let moviesLeft = tempMoviesInFavs.filter( oneMovie =>{
        return oneMovie.id !== movieData.id;
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log('se quito peli');
    }
  }

  return (
    <>
      <div className='layout'>
        <Header favourites={favourites} />
        <main className='main'>
          <Routes>
            <Route exact path="/" element={<Home addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<List addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/results" element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
            <Route path="/favourites" element={<Favourites addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default App;
