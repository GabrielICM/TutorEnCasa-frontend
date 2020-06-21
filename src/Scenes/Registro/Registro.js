import React from 'react';
import { Header, Navbar, Body, Footer } from '../../Components';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const registro = () => {
    const logged = useSelector(state => state.login);
    if(logged)
        return <Redirect to="/" />

return(
    <div>
        <Header>
            <Navbar/>
        </Header>
        <Body>registro</Body>
        <Footer/>
    </div>
    )
};

export default registro;

/* ejemplo caja negra, Usuario se logea, intenta entrar nuevamente a registro de manera manual y lo rerdirecciona
 a login en vez de inicio u otra vista logica */ 