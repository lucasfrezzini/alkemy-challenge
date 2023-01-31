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
      <div className='layout'>
        <Header favourites={favourites} />
        <main className='main'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<List addOrRemoveFromFavs={addOrRemoveFromFavs} typeShow={'movie'} />} />
            <Route path="/series" element={<List addOrRemoveFromFavs={addOrRemoveFromFavs} typeShow={'serie'} />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/results" element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
            <Route path="/favourites" element={<Favourites favourites={favourites} addOrRemoveFromFavs={addOrRemoveFromFavs} />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default App;
