import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as  Router, Switch, Route, useHistory} from 'react-router-dom';
import {IniciarSesion,Inicio,Nosotros,Tutorias,Registro,VideoLlamada,SolicitudTutor,Cupones,ValidarTutor,VistaClase,Perfil} from '../Scenes/index';

const routes = (props) => {
    return(
    <Router basename="/public">
        <Switch>
            <Route path="/" exact component={Inicio}/>
            <Route path="/precios" component={Tutorias}/>
            <Route path="/tutorias" component={Tutorias}/>
            <Route path="/nosotros" component={Nosotros}/>
            <Route path="/registro" component={Registro}/>
            <Route path="/inicio-sesion" component={IniciarSesion}/>  
            <Route path="/mis-tutorias" component={VideoLlamada}/>
            <Route path="/clase" component={VistaClase}/>
            <Route path="/solicitud" component={SolicitudTutor}/>   
            <Route path="/cupones" component={Cupones}/>
            <Route path="/Validar-Tutor" component={ValidarTutor}/>
            <Route path="/perfil" component={Perfil}/>
        </Switch>     
    </Router>
    )
}

export default routes;