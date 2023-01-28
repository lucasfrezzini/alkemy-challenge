import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from "./components/Login";
import Listado from './components/Listado';
import Detalle from './components/Detalle';


// Styles
import './css/bootstrap.min.css'
import './css/app.css';


function App() {
  return (
    <>
      <Header />
      <main className='container main'>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/detalle" element={<Detalle />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
