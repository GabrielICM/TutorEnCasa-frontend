import React, { Fragment } from 'react';
import Header from '../../Components/Header';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Body from '../../Components/Body';
import Text from '../../Components/Text';

const inicio = () => {
    return(
     <div>
        <Header>
            <Navbar/>
         </Header>
        <Body>
            <Text>
                inicio
            </Text>
        </Body>
        <Footer/>
     </div>   
    )
};

export default inicio;