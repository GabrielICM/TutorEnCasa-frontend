import React from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {useForm} from 'react-hook-form';


const registroParte2 = () => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    const logged = useSelector(state => state.login);
    if(logged)
        return <Redirect to="/" />

return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>
            
        </Body>
        <Footer/>
    </div>
    )
};

export default registroParte2;
/*
<div >
                <form className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded"  onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="Nombre">Nombre</label>
                        <input type="text" placeholder="Nombre" name="Nombre" ref={register({required: true,message:"* nombre invalido", maxLength: 80})} />
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.nombre && errors.nombre.message}
                    </span>
                    <div className="form-group">
                        <label htmlFor="Apellido">Apellido</label>
                        <input type="text" placeholder="Apellido" name="Apellido" ref={register({required: true,message:"* Apellido invalido", maxLength: 100})} />
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.Apellido && errors.Apellido.message}
                    </span>
                    <div className="form-group">
                        <label htmlFor="Fechadenacimiento">Fecha de nacimiento</label>
                        <input type="datetime" placeholder="FechaDeNacimiento" name="FechaDeNacimiento" ref={register({required: true,message:"* Fecha de nacimiento invalida"})} />
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.FechaDeNacimiento && errors.email.message}
                    </span>

                    <input type="submit" value="Registro"/>
                </form>
            </div>*/