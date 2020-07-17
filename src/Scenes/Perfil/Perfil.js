import React,{useState} from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import { Redirect } from 'react-router-dom';

const perfil = () => {

    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);

    const { register, handleSubmit, errors, watch } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });

    const onSubmit = () =>{

    }

    if(! logged)
        return <Redirect to="/inicio-sesion" />
return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="container upload border jumbotron rounded shadow p-3 mt-3 bg-white rounded" style={{width:"50%"}}>
                <div className="form-group">
                    <h1 className="h3"> Datos personales</h1>
                    
                    <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`Nombre: ${user.firstname}`}/>
                    <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`Apellido: ${user.lastname}`}/>
                    <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`Correo electrónico: ${user.email}`}/>
                    <input type="text" className="form-control mb-1 mt-1" disabled={true} value="Contraseña: ***********"/>
                    
                    <div>
                    {true?
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="contraseña">Contraseña</label>
                            <input className="form-control" type="password" id="contraseña" placeholder="Contraseña" name="password" 
                            ref={register({required: true, minLength: 6, maxLength: 12 })} />
                        </div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.password && errors.password.message}
                        </span>
                        <div className="form-group">
                            <label htmlFor="repetirContraseña">Repetir Contraseña</label>
                            <input className="form-control" type="password" id="repetirContraseña" placeholder="Repetir contraseña" name="password2" 
                            ref={register({ validate: (value) => watch('password') === value || '* Las contraseñas no coinciden',
                            required: true })} />
                        </div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.password2 && errors.password2.message}
                        </span>

                        <div className="center">
                            <input value="Modificar contaseña" type="submit" />
                        </div>
                    </form>
                    :
                    ""
                    }
                    
                    {true?
                    <div>
                        <label htmlFor="email">Correo electronico</label>
                        <input className="form-control" type="text" id="email" placeholder="Email" name="email" 
                        ref={register({required: true, pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                        message: 'Correo inválido' }})} />

                        <span className="text-danger text-small d-block mb-2">
                            {errors.email && errors.email.message}
                        </span>
                        <div className="form-group">
                            <label htmlFor="email2">Repetir correo electronico</label>
                            <input className="form-control" type="email" id="repetirContraseña" placeholder="Repetir contraseña" name="email2" 
                            ref={register({ validate: (value) => watch('email') === value || '* Los correos no coinciden',
                            required: true })} />
                        </div>
                        <span className="text-danger text-small d-block mb-2">
                            {errors.email2 && errors.email2.message}
                        </span>

                        <div className="center">
                            <input value="Modificar correo" type="submit" />
                        </div>
                    </div>
                    :
                    ""
                    }
                    </div>
                </div>
                
            </div>
        </Body>
        <Footer/>
    </div>
    )
};

export default perfil;