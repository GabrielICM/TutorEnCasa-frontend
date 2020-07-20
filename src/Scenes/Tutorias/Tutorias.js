import React,{useState} from 'react';
import api from '../../Servicios/Peticion';
import Rating from '@material-ui/lab/Rating';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import { Header, Navbar, Body, Footer } from '../../Components';
import { Box } from '@material-ui/core';
import {Modal} from 'react-bootstrap';
const precios = () => {

    const { register, handleSubmit, errors } = useForm();
    const [ratingValue, setRatingValue] = useState(1);
    const [tutores, setTutores] = useState([]);
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    
    const [text,setText] = useState();
    const [alertShow,setAlertShow] = useState(false);

    const onSubmit = data => console.log(data);
        console.log(errors);

    const apiTutor = data =>{
        api('GET',`/tutor/${data.id}`,{}, {'access-token': token})
            .then((res) => {
                if(res.status == 'success'){
                    console.log(res)
                    setTutores([res.tutor]);
                }else{
                    console.log(res.error)
                }
            })
    };

    const showTutoresCard = tutores.map((tutor)=>(
        
            <div className="card mb-5 border jumbotron rounded shadow p-3 mb-5 bg-white rounded" >
                <div className="card-header" key={tutor.id}>
                    {tutor.id_user}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>
                            Área: {tutor.themes[0].name} Grado de enseñanza: {tutor.themes[0].TutorTheme.grade} Valor: {tutor.themes[0].TutorTheme.price}
                        </p>
                        <footer className="blockquote-footer">
                            {tutor.id}
                        </footer>
                    </blockquote>
                </div>
            </div>
    )
    )
return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="row">
                <div className="col-3  border jumbotron rounded shadow p-3 mb-3 bg-white rounded">
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
                    <div className="center" >
                        <input className="btn btn-secondary" value="Filtrar" type="submit" />
                    </div>
                </form>
                </div >
                <div className="col-9 mb-3" >
                    <input type="submit" onClick={apiTutor({id:1})}/>
                    {showTutoresCard}
                </div>
            </div>
            <Modal show={alertShow} onHide={() => {setAlertShow(false)}}>
                    <Modal.Header closeButton>
                        <div>
                            {text}
                        </div>
                    </Modal.Header> 
                </Modal>
        </Body>
        <Footer/>
    </div>    
    )
};

export default precios;