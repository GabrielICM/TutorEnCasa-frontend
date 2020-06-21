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
            history.push("/herramientas");
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
        <form className="center" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Email" name="email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
        <input type="password" placeholder="Contraseña" name="password" ref={register({required: true, maxLength: 80})} />
    
        <input type="submit" />
    </form>
    </Body>
    <Footer/>
    </div> 
  );
}

