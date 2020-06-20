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
            <Text>
                inicio
            </Text>
        </Body>
        <Footer/>
     </div>   
    )
};

export default inicio;