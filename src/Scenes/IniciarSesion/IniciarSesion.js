import React from 'react';
import Header from '../../Components/Header';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Body from '../../Components/Body';
import { useForm } from 'react-hook-form';
import Api from '../../Servicios/Peticion';
import {  useHistory } from "react-router-dom";

export default function App() {
const { register, handleSubmit, errors } = useForm();
const history = useHistory();
const onSubmit = data => {

    console.log(data);
    Api('POST','/login', data).then((Respuesta) => {
        if(Respuesta.status == 'success'){
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

