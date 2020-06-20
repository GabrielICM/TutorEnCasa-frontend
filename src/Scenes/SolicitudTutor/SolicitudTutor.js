import React from 'react';
import {useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import api from '../../Servicios/Peticion';
import { Header, Navbar, Body, Footer,UploadPDF } from '../../Components';



export default function App() {
    const { register, handleSubmit, errors } = useForm();
    const token = useSelector(state => state.token);
    const onSubmit = data => {
        const file = document.querySelector('.custom-file-input').files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('themes', data.themes);
        console.log(formData);
        api('POST','/tutor/request', formData, { 'access-token': token });
    }
    console.log(errors);
    
    return (
        <div>  
            <Header>
                <Navbar/>
            </Header>
            <Body>
               
                <div className="container">
                    <form className="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <UploadPDF/>
                        <input name="themes[]" type="checkbox" value="Matemáticas" ref={register({ required: true })}/>
                        <label htmlFor="male">Matematicas</label><br></br>
                        <input name="themes[]" type="checkbox" value="Lenguaje" ref={register({ required: true })}/>
                        <label htmlFor="male">Lenguaje</label><br></br>
                        <input name="themes[]" type="checkbox" value="Biologia" ref={register({ required: true })}/>
                        <label htmlFor="male">Biologia</label><br></br>
                        <input name="themes[]" type="checkbox" value="Historia" ref={register({ required: true })}/>
                        <label htmlFor="male">Historia</label><br></br>
                        <input type="submit" value="Solicitar" className="btn btn-primary" />
                    </form>
                </div>
            </Body>
            <Footer/>
</div>
) 
};


