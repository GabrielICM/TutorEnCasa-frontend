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
                    <h1 className="h3 center"> ¿Quieres ser tutor?</h1>
                    <p className="pText">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit aenean dapibus, tortor diam laoreet sem leo volutpat luctus 
                    gravida condimentum parturient, at morbi ridiculus nisl porttitor fringilla penatibus sociosqu. Placerat inceptos 
                    congue metus varius maecenas eleifend suscipit tempor elementum neque, tincidunt semper auctor lacinia ac egestas 
                    diam massa commodo volutpat dictum, dictumst sociosqu ut duis magnis nisl torquent feugiat gravida. Nunc neque 
                    accumsan mus cras ante nibh hendrerit vulputate sociis lobortis tempus, pretium nam libero fringilla vitae 
                    malesuada elementum arcu suscipit.
                    </p>
                </div>
                <div className="vertical-line"></div>
                <div className="col awayFooter">
                <h1 className="h3 center"> ¿Quieres ser tutor?</h1>
                <p className="pText">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit aenean dapibus, tortor diam laoreet sem leo volutpat luctus 
                    gravida condimentum parturient, at morbi ridiculus nisl porttitor fringilla penatibus sociosqu. Placerat inceptos 
                    congue metus varius maecenas eleifend suscipit tempor elementum neque, tincidunt semper auctor lacinia ac egestas 
                    diam massa commodo volutpat dictum, dictumst sociosqu ut duis magnis nisl torquent feugiat gravida. Nunc neque 
                    accumsan mus cras ante nibh hendrerit vulputate sociis lobortis tempus, pretium nam libero fringilla vitae 
                    malesuada elementum arcu suscipit.
                    </p>
                </div>
            </div>
        </Body>
        <Footer/>
    </div>
    ) 
};

export default nosotros;