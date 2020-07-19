import React,{useState} from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import {useForm} from 'react-hook-form';
import Rating from '@material-ui/lab/Rating';
import { TextField, MenuItem, Box } from '@material-ui/core';

const precios = () => {

    const { register, handleSubmit, errors } = useForm();
    const [ratingValue, setRatingValue] = React.useState(1);
    const onSubmit = data => console.log(data);
        console.log(errors);
return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="row">
                <div className="col-3  border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="h2">Filtrar:</h1>
                    <div>
                        <label htmlFor="vincularCupon">Por nombre:</label> 
                        <input className="form-control" type="text" placeholder="" name="Por nombre" ref={register} /> 
                    </div>

                    <div className="mt-3 mr-3">
                        <p>Por tema:</p>
                        <tr>
                            <td>
                                <input className="mr-1" type="checkbox" placeholder="" name="Matemáticas" ref={register} />
                                <label htmlFor="vincularCupon">Matemáticas</label> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="mr-1" type="checkbox" placeholder="" name="Lenguaje" ref={register} />
                                <label htmlFor="vincularCupon">Lenguaje</label> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="mr-1" type="checkbox" placeholder="" name="Biología" ref={register} />
                                <label htmlFor="vincularCupon">Biología</label> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="mr-1" type="checkbox" placeholder="" name="Historia" ref={register} />
                                <label htmlFor="vincularCupon">Historia</label> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="mr-1" type="checkbox" placeholder="" name="Química" ref={register} />
                                <label htmlFor="vincularCupon">Química</label> 
                            </td>
                        </tr>
                    </div>
                    <div className="mt-3 mb-3 mr-3">
                        <p>Por precio:</p>
                        <tr>
                            <td>
                                <input className="mr-1" type="radio" placeholder="" name="1" ref={register} />
                                <label htmlFor="vincularCupon">De menor a Mayor</label> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input className="mr-1" type="radio" placeholder="" name="1" ref={register} />
                                <label htmlFor="vincularCupon">De mayor a menor</label> 
                            </td>
                        </tr>
                    </div>

                    <div className="mt-3 mb-3 mr-3">
                        <p>Por Valoración:</p>
                        <tr>
                            <td>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Rating
                                    name="simple-controlled"
                                    value={ratingValue}
                                    precision={1}
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                    />
                                </Box>
                            </td>
                        </tr>
                    </div>
                    <div className="center">
                        <input className="btn btn-secondary" value="Filtrar" type="submit" />
                    </div>
                </form>
            </div>
                <div className="col-9">
                    <div className="card mt-3 mb-5 border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                        <div className="card-header">
                            Gabriel Cárcamo
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>Valoracion</p>
                                    <footer className="blockquote-footer">Soy un lord dentro de los profesores</footer>
                            </blockquote>
                        </div>
                    </div>
                </div> 
            </div>
        </Body>
        <Footer/>
    </div>    
    )
};

export default precios;