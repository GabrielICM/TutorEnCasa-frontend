import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header, Body, Footer, Navbar } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import api from '../../Servicios/Peticion';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

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

export default function VistaClase() {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const logged = useSelector(state => state.login);
    const token = useSelector(state => state.token);
    const [mostrarRating, setMostrarRating] = useState(false);
    const [value, setValue] = React.useState(1);
    const params = getParams();
    if(! params['id']) {
        return <Redirect to="/mis-tutorias" />
    }

    const idClase = params['id'];

    if(! logged)
    return <Redirect to="/inicio-sesion" />

    const terminarClase = () =>{
        const id = params['id'];
        api('PUT',`/class/${id}/end`,{},{ 'access-token': token }).then((res)=>{
            if(res.status == 'success'){
                setMostrarRating(true);
            }
            else{
                alert(res.errors)
            }   
        });

    }

    const ratingClase = (value) =>{
        const id = params['id'];
        api('POST',`/class/${id}/rating`, { value },{ 'access-token': token })
            .then((res) => {
                history.push('/mis-tutorias');
            });
    }

    return (
        <div>  
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="center container upload border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                <input type="submit" value="Terminar clase" onClick={terminarClase} />
                {mostrarRating?
                    <div>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Rating:</Typography>
                        <Rating
                        name="simple-controlled"
                        value={value}
                        precision={1}
                        onChange={(event, newValue) => {
                            ratingClase(newValue);
                            setValue(newValue);
                        }}
                        />
                    </Box>
                    </div>
                    :
                    ""
                }
            </div>
            
        </Body>
        <Footer/>
        </div>
    );
  }