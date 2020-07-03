import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as  Router, Switch, Route, useHistory} from 'react-router-dom';
import {IniciarSesion,Inicio,Nosotros,Precios,Registro,Herramientas,VideoLlamada,SolicitudTutor,Cupones} from '../Scenes/index';

const routes = (props) => {

    return(
    <Router basename="/public">
        <Switch>
            <Route path="/" exact component={Inicio}/>
            <Route path="/precios" component={Precios}/>
            <Route path="/nosotros" component={Nosotros}/>
            <Route path="/registro" component={Registro}/>
            <Route path="/inicio-sesion" component={IniciarSesion}/>  
            <Route path="/video-llamadas" component={VideoLlamada}/>
            <Route path="/solicitud" component={SolicitudTutor}/>   
            <Route path="/cupones" component={Cupones}/>
        </Switch>     
    </Router>
    )
}

export default routes;