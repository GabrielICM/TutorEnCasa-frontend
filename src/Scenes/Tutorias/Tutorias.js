import React,{useState} from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { Redirect } from 'react-router-dom';

const precios = () => {

return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>
            <div className="row">
                <div className="col-3  border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                    <p className="pText">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit aenean dapibus, tortor diam laoreet sem leo volutpat luctus gravida condimentum parturient, at morbi ridiculus nisl porttitor fringilla penatibus sociosqu. Placerat inceptos congue metus varius maecenas eleifend suscipit tempor elementum neque, tincidunt semper auctor lacinia ac egestas diam massa commodo volutpat dictum, dictumst sociosqu ut duis magnis nisl torquent feugiat gravida. Nunc neque accumsan mus cras ante nibh hendrerit vulputate sociis lobortis tempus, pretium nam libero fringilla vitae malesuada elementum arcu suscipit.
                    </p>
                </div>
                <div className="col-9">
                    <p className="pText border jumbotron rounded shadow p-3 mb-5 bg-white rounded">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit aenean dapibus, tortor diam laoreet sem leo volutpat luctus gravida condimentum parturient, at morbi ridiculus nisl porttitor fringilla penatibus sociosqu. Placerat inceptos congue metus varius maecenas eleifend suscipit tempor elementum neque, tincidunt semper auctor lacinia ac egestas diam massa commodo volutpat dictum, dictumst sociosqu ut duis magnis nisl torquent feugiat gravida. Nunc neque accumsan mus cras ante nibh hendrerit vulputate sociis lobortis tempus, pretium nam libero fringilla vitae malesuada elementum arcu suscipit.
                    </p>
                </div> 
            </div>
        </Body>
        <Footer/>
    </div>    
    )
};

export default precios;