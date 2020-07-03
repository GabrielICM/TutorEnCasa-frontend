import React from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as  Router, Switch, Route, useHistory} from 'react-router-dom';
import {IniciarSesion,Inicio,Nosotros,Precios,Registro,Herramientas,VideoLlamada,SolicitudTutor,Cupones} from '../Scenes/index';

const routes = (props) => {

    return(
    <Router>
        <Switch>
            <Route path="public/" exact component={Inicio}/>
            <Route path="public/precios" component={Precios}/>
            <Route path="public/nosotros" component={Nosotros}/>
            <Route path="public/registro" component={Registro}/>
            <Route path="public/inicio-sesion" component={IniciarSesion}/>  
            <Route path="public/herramientas" component={Herramientas}/>  
            <Route path="public/video-llamadas" component={VideoLlamada}/>
            <Route path="public/solicitud" component={SolicitudTutor}/>   
            <Route path="public/cupones" component={Cupones}/>
        </Switch>     
    </Router>
    )
}

export default routes;