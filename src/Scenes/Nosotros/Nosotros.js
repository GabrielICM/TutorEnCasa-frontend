import React, { useState } from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { Redirect } from 'react-router-dom';

const nosotros = () => {

return(
    <div>  
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="center">
                <img style={{width: "450px",height:"300px"}} src={"/public/Images/QuienesSomos.png"} alt="Nosotros" />
            </div>
            <div className="row mt-3 mb-5">
                <div className="horizontal-line col"></div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className="h3 center">¿Quienes somos?</h1>
                    <p className="pText">
                    Somos una empresa emergente, que busca la excelencia en el servicio de tutorías.
                    </p>
                    <p>
                    Nuestra forma de operar es a través de dar las herramientas a los tutores que lo necesiten,
                    para que estos puedan realizar sus tutorías de la mejor manera.
                    </p>
                    <p>
                    La confianza es algo fundamental para nosotros, por lo que buscamos a tutores con el conocimiento mínimo para enseñar.
                    </p>
                </div>
                <div className="vertical-line"></div>
                <div className="col awayFooter">
                <h1 className="h3 center">Misión y Visión</h1>
                    <p className="pText">
                        Nuestra misión es posicionarnos como líderes dentro del área de tutorías en chile,
                        logrando establecer un estándar de excelencia en el funcionamiento y realización de tutorías.
                    </p>
                </div>
            </div>
        </Body>
        <Footer/>
    </div>
    ) 
};

export default nosotros;