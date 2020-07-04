import React, { Fragment } from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import Text from '../../Components/Text';

const inicio = () => {
    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>
        <div id="carouselExampleControls" className="carousel slide container pt-4 " data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img className="d-block w-100" src={"/public/Images/imagen.jpg"} alt="First slide"></img>
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src={"/public/Images/imagen.jpg"} alt="Second slide"></img>
                </div>
                <div className="carousel-item">
                <img className="d-block w-100" src={"/public/Images/imagen.jpg"} alt="Third slide"></img>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        </Body>
        <Footer/>
     </div>   
    )
};

export default inicio;