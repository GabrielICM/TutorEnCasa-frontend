import React, { useState } from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';

const inicio = () => {

    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>
        <div id="carouselExampleControls" className="carousel slide container pt-1 center " data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleControls" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleControls" data-slide-to="1"></li>
                <li data-target="#carouselExampleControls" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100 "  src={"/public/Images/inicio.jpg"} alt="First slide"></img>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100"  src={"/public/Images/inicio.jpg"} alt="Second slide"></img>
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100"  src={"/public/Images/inicio.jpg"} alt="Third slide"></img>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="false"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        <div className="row mt-3 mb-5">
            <div className="horizontal-line col"></div>
        </div>
        <div className="row">
            <div className="col">
                <h1 className="h3 center"> ¿Quieres ser tutor?</h1>
                <p className="pText">Te buscamos a tí universitario o egresado. Sólo debes registrarte con tu correo, completas los datos solicitados, los cuales serán mostrados en tu perfil. Finalmente solicita ser tutor con tu certificiado de alumno regular y te validaremos en las próximas 24 horas.</p>
            </div>
            <div className="vertical-line"></div>
            <div className="col awayFooter">
                <h1 className="h3 center"> ¿Quieres ser estudiante?</h1>
                <p className="pText">Sólo debes registrarte con tu correo, completas los datos solicitados, los cuales serán mostrados en tu perfil. Todo rápido y sencillo.</p>
            </div>
        </div>

        </Body>
        <Footer/>
     </div>   
    )
};

export default inicio;