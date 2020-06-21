import React from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Cupones() {

    const logged = useSelector(state => state.login);
    if(! logged)
        return <Redirect to="/inicio-sesion" />

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <div>  
        <Header>
            <Navbar/>
         </Header>
         <Body>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Ingrese el monto a pagar" name="Cupon" ref={register({required: true})} />
                <input type="submit" />
            </form>
         </Body>
         <Footer/>
         </div>
    );
  }
