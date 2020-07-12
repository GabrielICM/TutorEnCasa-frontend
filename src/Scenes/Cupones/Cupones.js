import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../Servicios/Peticion';

export default function Cupones() {

    const[ValidateInput, setValidateInput] = useState(true);
    const[FormComprar, setFormComprar] = useState(false);
    const[FormListarCupones, setFormListarCupones] = useState(false);
    const[cupones, setCupones] = useState([]);

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
            HideFormListar(); 
    }
    const HideFormListar = () =>{
            setFormListarCupones(false);  
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
    <div className="card">
        <div className="card-header">
            Quote
        </div>
        <div className="card-body">
            <blockquote className="blockquote mb-0">
            <p key={cupon.code}>Cupon valido por {cupon.value}</p>
                <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
        </div>
    </div>
    ))
    
    const { register, handleSubmit, errors } = useForm();
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token)

    const onSubmitCrearcupon = data => {
        api('POST','/coupon/new',data, { 'access-token': token })
            .then((Respuesta) => {
                console.log(Respuesta)
            });
        }
    
    const onSubmitListarCupones = data => {

    };
    console.log(errors);
    
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
                    <button onClick={ShowFormComprar}>Comprar Cupon</button>
                    {FormComprar? <form className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmitCrearcupon)}>
                    <div className="form-group">
                        <label htmlFor="vincularCupon">Valor del cupon</label> 
                        <input className="form-control " type="text" placeholder="En pesos" name="value" 
                        ref={register({required: {value:true, message: "* El monto a pagar es requerido", maxLength: 80}})} />
                    </div>
                    <span className="text-danger text-small d-block mb-2">
                        {errors.password && errors.password.message}
                    </span>
                    <table className="form-group">
                    <h2>¿El cupon es para?</h2>
                        <tr>
                            <td>
                                <input className="mr-1" name="Developer" type="radio" value="Yes" onClick={HideInput} ref={register({ required: true })}/>
                                <label htmlFor="vincularCupon">Ti mismo</label> 
                            </td>
                        </tr>
                        <tr>
                            <td className="">
                                <input className="mr-1" id="show" name="Developer" type="radio" value="No" onClick={ShowInput} ref={register({ required: true })}/>
                                <label htmlFor="vincularCupon">otro</label> 
                            </td>
                        </tr>
                        {ValidateInput ? "" : 
                        <tr>
                            <td>
                            <div className="form-group"> 
                                <label htmlFor="vincularCupon">Correo electrónico</label>   
                                <input id="email" className="form-control " type="email" placeholder="Email" name="to" 
                                ref={register({required: {value: true,message: "* El correo es requerido" ,pattern: /^\S+@\S+$/i}})} />
                            </div>
                            <span className="text-danger text-small d-block mb-2">
                                {errors.email && errors.email.message}
                            </span>
                            </td>
                        </tr>
                        }
                    </table>
                    <div className="center">
                        <input value="Pagar cupon" type="submit" />
                    </div>
                </form>: ""}
                    {FormListarCupones? 
                        <div>{DatosCupones}</div>
                        :
                         ""
                        }       
                </div>
            </div>
        </Body>
        <Footer/>
        </div>
    );
  }