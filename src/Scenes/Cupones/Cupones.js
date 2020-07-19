import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../Servicios/Peticion';
import {Modal} from 'react-bootstrap';

export default function Cupones() {

    const[ValidateInput, setValidateInput] = useState(true);
    const[FormComprar, setFormComprar] = useState(false);
    const[FormListarCupones, setFormListarCupones] = useState(false);
    const [text,setText] = useState();
    const [alertShow,setAlertShow] = useState(false);
    const [alertdesign,setAlertdesign] = useState(true);
    const[cupones, setCupones] = useState([]);
    
    const { register, handleSubmit, errors } = useForm();
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    
    const ShowInput = () =>{
            setValidateInput(false);  
    }
    const HideInput = () =>{
            setValidateInput(true);  
    }

    const HideFormComprar = () =>{
            setFormComprar(false);  
    }
    const ShowFormComprar = () =>{
            setFormComprar(true);  
            setFormListarCupones(false);
            HideFormListar(); 
    }
    const HideFormListar = () =>{
            setFormListarCupones(false);  
    }

    const onSubmitCrearcupon = async data => {

        return await api('POST','/coupon/new', data, { 'access-token': token })
            .then((res) => {
                if(res.status == 'failed') {
                    setText((res.error).toString());
                    setAlertdesign(false);
                } else {
                    window.open(res.url, '_blank');
                    if(!data.to){
                        setText('Cupon creado correctamente');
                    }else{
                        setText('Cupon regalado correctamente');
                    }
                }
                setAlertShow(true);
            });
    }    
    
    const ShowFormListar = data =>{
        api('GET','/coupon',data, {'access-token': token}).then((Respuesta) => {
            console.log(Respuesta)
            setFormListarCupones(true);
            HideFormComprar();  
            setCupones(Respuesta.coupons);
        })
    };

    const DatosCupones = cupones.map((cupon) => (
    <div className="card mt-3 mb-5">
        <div className="card-header" key={cupon.code}>
            Código: {cupon.code}
        </div>
        <div className="card-body">
            <blockquote className="blockquote mb-0">
                <p key={cupon.code}>Cupón valido por ${cupon.value}</p>
                    <footer className="blockquote-footer">¡Ocupa este cupón con sabiduría!</footer>
            </blockquote>
        </div>
    </div>
    ))
    
    if(! logged)
    return <Redirect to="/inicio-sesion" />
    return (
        <div>  
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div>
                <div>
                    <input type="submit" value="Mis cupones"  onClick={ShowFormListar}/>
                    <input type="submit" value="Comprar cupón" onClick={ShowFormComprar}/>

                    {FormComprar? 
                    
                    <form className="container upload border jumbotron rounded shadow p-3 mt-3 bg-white rounded" 
                    onSubmit={handleSubmit(onSubmitCrearcupon)}>

                    <div className="form-group">
                        <label htmlFor="vincularCupon">Valor del cupón</label> 
                        <input className="form-control " type="text" placeholder="En pesos" name="value" 
                        ref={register({required: {value:true, message: "* El monto a pagar es requerido", maxLength: 10}})} />
                    </div>

                    <span className="text-danger text-small d-block mb-2">
                        {errors.value && errors.value.message}
                    </span>

                    <table className="form-group" style={{width:"100%"}}>
                        <h2>
                            ¿El cupón es para?
                        </h2>
                        <tr>
                            <td>
                                <input className="mr-1" name="Developer" type="radio" value="Yes"  onChange={HideInput}
                                    ref={register({ required: {value:true, message: "* ¡debes seleccionar una!"}})}/>
                                    <label htmlFor="vincularCupon">Uso personal</label> 
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                <input className="mr-1" id="show" name="Developer" type="radio" value="No" onClick={ShowInput}
                                    ref={register({ required: {value:true, message: "* ¡Debes seleccionar una!"}})}/>
                                    <label htmlFor="vincularCupon">Regalar</label> 
                            </td>
                        </tr>
                    
                        {ValidateInput ? "" : 

                        <tr className="fluid">
                            <td>
                            <div className="form-group"> 
                                <label htmlFor="vincularCupon">Correo electrónico</label>   
                                <input id="email" className="form-control " type="email" placeholder="Email" name="to" 
                                ref={register({required: {value: true,message: "* Correo invalido" ,pattern: /^\S+@\S+$/i}})} />
                            </div>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.email && errors.email.message}
                            </span>
                            </td>
                        </tr>
                        }

                    </table>

                    <div className="center">
                        <input className="btn btn-secondary" value="Pagar cupon" type="submit" />
                    </div>
                    <div style={{textAlign:"center"}}>
                    <Modal show={alertShow} onHide={() => {setAlertShow(false)}}>
                        <Modal.Header closeButton>
                            <div>
                                {text}
                            </div>
                        </Modal.Header> 
                    </Modal>
                    </div>
                </form>: ""}

                    {cupones.length > 0 && FormListarCupones?
                        <div>{DatosCupones}</div>
                        :
                        (FormListarCupones?
                        <p className="center">No tienes cupones</p>
                        :
                        ""
                        )
                    }
                </div>
            </div>
        </Body>
        <Footer/>
        </div>
    );
  }