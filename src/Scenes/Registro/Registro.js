import React from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {useForm} from 'react-hook-form';


const registro = () => {

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
            <div >
                <form className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded"  onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Correo electronico</label>
                        <input className="form-control" type="text" id="email" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contraseña">Contraseña</label>
                        <input className="form-control" type="password" id="contraseña" placeholder="Contraseña" name="Password" ref={register({required: true, maxLength: 80})} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="repetirContraseña">Repetir Contraseña</label>
                        <input className="form-control" type="password" id="repetirContraseña" placeholder="Repetir contraseña" name="Password2" ref={register} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rut">Rut</label>
                        <input className="form-control" type="text" id="rut" placeholder="Formato: 18857113-1" name="rut" ref={register({required: true, pattern: /^\d{1,2}\d{3}\d{3}[-][0-9kK]{1}$/i})} />
                    </div>

                    <input type="submit" value="Registro"/>
                </form>
            </div>
        </Body>
        <Footer/>
    </div>
    )
};

export default registro;

/* ejemplo caja negra, Usuario se logea, intenta entrar nuevamente a registro de manera manual y lo rerdirecciona
 a login en vez de inicio u otra vista logica */ 