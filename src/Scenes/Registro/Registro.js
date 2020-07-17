import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {Modal} from 'react-bootstrap';
import { Header, Navbar, Body, Footer } from '../../Components';
import api from '../../Servicios/Peticion';
import { validadorRut } from '../../Servicios/Validador';

const getParams = function () {
	let params = {};
	const parser = document.createElement('a');
	parser.href = window.location.href;
	const query = parser.search.substring(1);
	const vars = query.split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

const registro = () => {
    const { register, handleSubmit, errors, watch } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    });
    const token = useSelector(state => state.token);

    const [validarCuenta, setValidarCuenta] = useState(false);
    const [alertShow,setAlertShow] = useState(false);
    const [alertdesign,setAlertdesign] = useState(true);
    const [text,setText] = useState();
    const params = getParams();
    
    const onSubmit = data => {
        console.log(data);
        let step = 1;
        if(params.paso && params.run) {
            data.step = 2;
            data.dni = params.run;
            step = 2;
        }
        else {
            data.dni = data.dni.split('-')[0];
        }
        api('POST', `/register/${step}`, data, { 'access-token': token })
            .then((res) => {
                if(res.status == 'failed') {
                    setText((res.error).toString());
                }
                else {
                    setValidarCuenta((params.paso && params.run) ? false : true);
                }
            });
    }
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
            <div>
                <form className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded"  onSubmit={handleSubmit(onSubmit)}>              
                    {
                        params.paso
                        ?
                            <div>
                                <div className="form-group">
                                    <label htmlFor="firstname">Nombre</label>
                                    <input className="form-control" type="text" placeholder="Nombre" name="firstname" id="firstname" 
                                    ref={register({required: true,minLength: 6, maxLength: 20, pattern: { value: /^[a-z]+/i,
                                    message:"* Nombre inválido" }})} />
                                </div>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.firstname && errors.firstname.message}
                                </span>
                                <div className="form-group">
                                    <label htmlFor="lastname">Apellido</label>
                                    <input className="form-control" type="text" placeholder="lastname" name="lastname" 
                                    ref={register({required: true,minLength: 6, maxLength: 20, pattern: { value: /^[a-z]+/i,
                                    message:"* Apellido inválido" }})} />
                                </div>
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.lastname && errors.lastname.message}
                                </span>
                                <div className="form-group">
                                    <label htmlFor="birthdate">Fecha de nacimiento</label>
                                    <input type="date" placeholder="birthdate" name="birthdate" className="form-control"
                                    ref={register({required: true,message:"* Fecha de nacimiento invalida"})} />
                                </div>
                                <span className="text-danger text-small d-block mb-2">
                                {   errors.birthdate && errors.birthdate.message}
                                </span>
                            </div>
                        :
                        <div>
                            <div className="form-group">
                                <h1 className="center h2">Completa tus datos</h1>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo electronico</label>
                                <input className="form-control" type="text" id="email" placeholder="Email" name="email" 
                                ref={register({required: true, pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                                message: 'Correo inválido' }})} />
                            </div>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.email && errors.email.message}
                            </span>
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
                            <div className="form-group">
                                <label htmlFor="dni">R.U.N.</label>
                                <input className="form-control" type="text" id="dni" placeholder="Ej: 18857113-1" name="dni" 
                                ref={register({required: true, validate: (value) => validadorRut(value) || 'El R.U.N. es inválido'})} />
                            </div>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.dni && errors.dni.message}
                            </span>
                        </div>
                    }
                    <div className="center" variant="secondary">
                        <input className="btn btn-secondary" type="submit" value="Registro"/>
                    </div>
                    <div>
                        {
                            validarCuenta
                            ?
                            <Link 
                                to={'https://tutorencasa.awsapps.com/mail'} 
                                target="_blank" 
                                onClick={(event) => {event.preventDefault(); window.open('https://tutorencasa.awsapps.com/mail');}}>
                                Valida tu cuenta aquí
                            </Link>
                            : 
                            ''
                        }
                    </div>
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