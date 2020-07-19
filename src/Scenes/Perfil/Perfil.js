import React,{useState} from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import api from '../../Servicios/Peticion';
import {Modal} from 'react-bootstrap';
import { RolUsuario } from '../../util/usuario';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const perfil = () => {
    const roles = useSelector(state => state.user ? state.user.roles : []);
    const [esTutor] = useState(() => roles.includes(RolUsuario.TUTOR));
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    const user = useSelector(state => state.user);

    const [showEmail,setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPerfil,setShowPerfil] = useState(false);
    const [showCrearHorario,setShowCrearHorario] = useState(false);
    const [text,setText] = useState();
    const [alertShow,setAlertShow] = useState(false);
    const [horario,sethorario] = useState([]);

    const onSubmit = (data) =>{
        api('PUT','/user/profile',data,{ 'access-token': token })
            .then((res)=>{
                if(res.status =='succes'){
                    setText('Modificado!');
                    
                }else{
                    setText(res.error);
                    console.log(res.error);
                }
                setAlertShow(true);
            }
        )
    }

    /**
     * Arreglar el envio para el horario del tutor
     */
    const addHour = data =>{
        api('GET','/tutor/times/new',data, {'access-token': token}).then((res) => {
            sethorario(res.times)
            console.log(res)
        })
    };

    const datosCupones = horario.map((horarios) => (
        <div className="form-group" key={horario.id}>
            <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`${horario.start}`}/>
        </div>
        ))

    const ShowHorario = () =>{
        setShowCrearHorario(!showCrearHorario)
        setShowPerfil(false)
    } 

    const ShowPerfil = () =>{
        setShowPerfil(!showPerfil)
        setShowCrearHorario(false)
    } 

    const fChangePassword = () =>{
        setShowPassword(!showPassword);
        setShowEmail(false);
    } 

    const fChangeEmail = () =>{
        setShowEmail(!showEmail);
        setShowPassword(false);
    }

    const { register, handleSubmit, errors, watch } = useForm();



    if(! logged)
        return <Redirect to="/inicio-sesion" />
return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div>
                <input className="btn btn-secondary" type="submit" value="Mis datos"  onClick={ShowPerfil}/>
                {esTutor?
                <input className="btn btn-secondary border-left" type="submit" value="Crear horario" onClick={ShowHorario}/>
                :
                ""
                }

                {showPerfil?
                            <div className="container upload border jumbotron rounded shadow p-3 mt-3 bg-white rounded" style={{width:"50%"}}>
                            <div className="form-group">
                                <div className="mb-3">
                                    <div className="center">
                                        <h1 className="h3"> Datos personales</h1>
                                    </div>
                                    <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`Nombre: ${user.firstname}`}/>
                                    <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`Apellido: ${user.lastname}`}/>
                                    <div>
                                        <input type="text" className="form-control mb-1 mt-1" disabled={true} value="Contraseña: ***********"/>
                                        <div className="center ">
                                            <input className="btn btn-secondary w-100" value="Modificar contraseña" onClick={fChangePassword} type="submit" />
                                        </div>
                                    </div>
                                    <div>
                                        <input type="text" className="form-control mb-1 mt-1" disabled={true} value={`Correo electrónico: ${user.email}`}/>
                                        <div className=" center ">
                                            <input className="btn btn-secondary w-100" value="Modificar email" onClick={fChangeEmail} type="submit" />
                                        </div>    
                                    </div>
                                </div>
                            <div>
                                {showPassword?
                                <form  onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label htmlFor="contraseñaActual">Contraseña</label>
                                        <input className="form-control" type="password" id="contraseñaActual" placeholder="Contraseña actual" name="actual_password" 
                                        ref={register({required: true, minLength: 6, maxLength: 12 })} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contraseña">Contraseña</label>
                                        <input className="form-control" type="password" id="contraseña" placeholder="Contraseña" name="passwordFirst" 
                                        ref={register({required: true, minLength: 6, maxLength: 12 })} />
                                    </div>
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.password && errors.password.message}
                                    </span>
                                    <div className="form-group">
                                        <label htmlFor="repetirContraseña">Repetir Contraseña</label>
                                        <input className="form-control" type="password" id="repetirContraseña" placeholder="Repetir contraseña" name="password" 
                                        ref={register({ validate: (value) => watch('passwordFirst') === value || '* Las contraseñas no coinciden',
                                        required: true })} />
                                    </div>
                                    <span className="text-danger text-small d-block mb-2">
                                        {errors.password2 && errors.password2.message}
                                    </span>
        
                                    <div className="center">
                                        <input value="Actualizar btn btn-secondary" type="submit"/>
                                    </div>
                                </form>
                                :
                                ""
                                }
                                
                                {showEmail?
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
                                        <input value="Actualizar btn btn-secondary" type="submit" />
                                    </div>
                                </div>
                                :
                                ""
                                }
                                </div>
                            </div>
                            <Modal show={alertShow} onHide={() => {setAlertShow(false)}}>
                                <Modal.Header closeButton>
                                    <div>
                                        {text}
                                    </div>
                                </Modal.Header> 
                            </Modal>
                        </div>
                        :
                        ""
                        }
                {showCrearHorario?
                <div className="border jumbotron rounded shadow p-3 mt-3 bg-white rounded">
                    <form onSubmit={handleSubmit(addHour)}>
                        <div className="row">
                            <div className="col">
                            <TextField
                                id="datetime-local"
                                label="Fecha"
                                type="datetime-local"
                                defaultValue={new Date()}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </div>
                            <div className="col">
                                <input name="minutes" placeholder="Ingresar en horas" />
                            </div>
                            <div className="col">
                                <input className="btn btn-secondary" type="submit" value="Crear horario" />
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                {datosCupones}
                            </div>
                        </div>
                    </form>
                </div>
                :
                ""
                }
                

            </div>
        </Body>
        <Footer/>
    </div>
    )
};

export default perfil;