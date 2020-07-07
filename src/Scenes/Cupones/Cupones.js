import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Cupones() {

    const[ValidateInput, setValidateInput] = useState(true);
    const ShowInput = () =>{
        if(ValidateInput)
            setValidateInput(false);
        else
             setValidateInput(true);
    }
    const { register, handleSubmit, errors } = useForm();
    const logged = useSelector(state => state.login);
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    if(! logged)
        return <Redirect to="/inicio-sesion" />
    return (
        <div>  
        <Header>
            <Navbar/>
         </Header>
         <Body>
            <form className="container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="vincularCupon">Valor del cupon</label> 
                    <input className="form-control " type="text" placeholder="En pesos" name="password" 
                    ref={register({required: {value:true, message: "* El monto a pagar es requerido", maxLength: 80}})} />
                </div>
                <span className="text-danger text-small d-block mb-2">
                    {errors.password && errors.password.message}
                </span>
                <table className="form-group">
                <h2>¿El cupon es para?</h2>
                    <tr>
                        <td>
                            <input className="mr-1" name="Developer" type="radio" value="Yes" onClick={ShowInput} ref={register({ required: true })}/>
                            <label htmlFor="vincularCupon">Ti mismo</label> 
                        </td>
                    </tr>
                    <tr>
                        <td className="">
                            <input className="mr-1" id="show" name="Developer" type="radio" value="No" onClick={ShowInput} ref={register({ required: true })}/>
                            <label htmlFor="vincularCupon">otro</label> 
                        </td>
                    </tr>
                    {ValidateInput ? '' : 
                    <tr>
                        <td>
                            <input name="vincular" type="text" />
                        </td>
                    </tr>
                    }
                </table>
                <div className="form-group"> 
                    <label htmlFor="vincularCupon">Correo electrónico</label>   
                    <input id="email" className="form-control " type="email" placeholder="Email" name="email" 
                    ref={register({required: {value: true,message: "* El correo es requerido" ,pattern: /^\S+@\S+$/i}})} />
                </div>
                <span className="text-danger text-small d-block mb-2">
                    {errors.email && errors.email.message}
                </span>

                <input type="submit" />
            </form>
         </Body>
         <Footer/>
         </div>
    );
  }
