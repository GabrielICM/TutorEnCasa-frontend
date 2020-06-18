import React, { Component } from 'react';
import IniciarSesion from './Scenes/IniciarSesion/IniciarSesion';
import Inicio from './Scenes/Inicio/Inicio';
import Nosotros from './Scenes/Nosotros/Nosotros';
import Precios from './Scenes/Precios/Precios';
import Registro from './Scenes/Registro/Registro';
import Herramientas from './Scenes/Herramientas/Herramientas';
import {BrowserRouter as  Router, Switch, Route} from 'react-router-dom';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Inicio}/>    
          <Route path="/precios" component={Precios}/>   
          <Route path="/nosotros" component={Nosotros}/>
          <Route path="/registro" component={Registro}/>   
          <Route path="/inicio-sesion" component={IniciarSesion}/>   
          <Route path="/herramientas" component={Herramientas}/>  
        </Switch>     
      </Router>
    )
  }
}

export default App;
