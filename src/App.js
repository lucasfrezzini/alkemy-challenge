import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from "./components/Login";
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';


// Styles
import './css/bootstrap.min.css'
import './css/app.css';


function App() {
  
  const [favorites, setFavorites ] = useState([]);

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

    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieID = btn.dataset.movieId;

    const movieData = {
      imgURL,
      title,
      overview,
      movieID
    }

    let movieIsInArray = tempMoviesInFavs.find(movie => {
      return movie.movieID === movieData.movieID;
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log('Se agrego peli')
    } else {
      let moviesLeft = tempMoviesInFavs.filter( oneMovie =>{
        return oneMovie.movieID !== movieData.movieID;
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      console.log('se quito peli');
    }
  }

  return (
    <>
      <Header favorites={favorites} />
      <main className='container main'>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/resultados" element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
