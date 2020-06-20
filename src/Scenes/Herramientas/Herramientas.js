import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Body from '../../Components/Body';

const herramientas = () => {
    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>
            <ul className="nav">
                <Link to="/video-llamadas" className="nav-link">
                    <li>Video llamadas</li>
                </Link>
                <Link to="/solicitud" className="nav-link">
                    <li>Solicitud Tutorias</li>
                </Link>         
                <Link to="/cupones" className="nav-link">
                    <li>Cupones</li>
                </Link>   
            </ul>
        </Body>
        <Footer/>
     </div>   
    )
};

export default herramientas;