import React from 'react';
import { Header, Navbar, Footer, Body } from '../../Components';
import { useForm } from 'react-hook-form';
import Api from '../../Servicios/Peticion';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

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
            history.push("/cupones");
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
                <input id="email" className="form-control" type="email" placeholder="Email" name="email" 
                ref={register({required: {value: true,message: "* Correo invalido" ,pattern: /^\S+@\S+$/i}})} />
            </div>
            <span className="text-danger text-small d-block mb-2">
                {errors.email && errors.email.message}
            </span>
            <div className="form-group">
                <label htmlFor="contraseña">Contraseña</label> 
                <input id="constraseña" className="form-control " type="password" placeholder="Contraseña" name="password" 
                ref={register({required: {value:true, message: "* La contraseña es requerida", maxLength: 80}})} />
            </div>
            <span className="text-danger text-small d-block mb-2">
                {errors.password && errors.password.message}
            </span>
            <div className="mb-2 mt-4 center" >
                <input className="btn btn-secondary" type="submit" value="Iniciar sesion" />
            </div>
    </form>
    </Body>
    <Footer/>
    </div> 
  );
}

