import { Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Inicio from './components/Inicio';
import Header from './components/Header';
import Footer from './components/Footer';
import Registro from './components/Registro';
import PerfilCuenta from './components/PerfilCuenta';
import BiografiaUpdate from './components/BiografiaUpdate';
import DatosContacto from './components/DatosContacto';
import Direcion from './components/Direcion';
import DatosLaborales from './components/DatosLaborales';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element = {<Login />}/>
        <Route path='/inicio' element = {<Inicio />}></Route>
        <Route path='/registrate' element = {<Registro />}></Route>
        <Route path='/perfil-cuenta' element={<PerfilCuenta />}></Route>
        <Route path='/perfil-cuenta/biografia' element={<BiografiaUpdate />}></Route>
        <Route path='/datos-contacto' element={<DatosContacto />}></Route>
        <Route path='/datos-contacto/direccion' element={<Direcion />}></Route>
        <Route path='/datos-laborales' element={<DatosLaborales />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
