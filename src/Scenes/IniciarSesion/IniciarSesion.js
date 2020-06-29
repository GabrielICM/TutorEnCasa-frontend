import React from 'react';
import { Header, Navbar, Footer, Body } from '../../Components';

import { useForm } from 'react-hook-form';
import Api from '../../Servicios/Peticion';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export default function App() {
const { register, handleSubmit, errors } = useForm();
const history = useHistory();
const dispach = useDispatch();

const onSubmit = data => {
    Api('POST','/login', data).then((Respuesta) => {
        console.log(Respuesta);
        if(Respuesta.status == 'success'){
            dispach({
                type: 'SIGN_APP',
                user: Respuesta.user,
                token: Respuesta.token,
                login: true
            });
            history.push("/");
        } else {
           alert(Respuesta.error);
        }
    });
};

return (
    <div>
    <Header>
        <Navbar/>
     </Header>
    <Body>
        <form className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>   
                <input id="email" className="form-control " type="email" placeholder="Email" name="email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Contraseña</label> 
                <input className="form-control " type="password" placeholder="Contraseña" name="password" ref={register({required: true, maxLength: 80})} />
            </div>
            <div className="mb-2 mt-4 center">
                <input type="submit" />
            </div>
    </form>
    </Body>
    <Footer/>
    </div> 
  );
}

