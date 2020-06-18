import React from 'react';
import Header from '../../Components/Header';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Body from '../../Components/Body';
import Text from '../../Components/Text';

const herramientas = () => {
    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>
            <Text>
                <h1>Herramientas</h1>
            </Text>
        </Body>
        <Footer/>
     </div>   
    )
};

export default herramientas;