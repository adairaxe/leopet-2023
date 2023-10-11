import React from 'react';
import { Container, Button } from 'react-bootstrap';
// Import Logo from './../../../Assets/Img/leopetLogo.png';
import './Footer.scss';

export const Footer = () => {
    return (
        <Container className="contenedorFooter ">
            <div className="filas" >

                <div className="columnas">
                        <h5>Contactanos</h5>
                        <Button variant="link" className="links">Nuestro Correo: consultas@leopet.com</Button>
                        <Button variant="link" className="links">Nuestro Telefono: +593 099 123 45 68</Button>
                </div>
                <div className="columnas">
                    <h5>Siguenos</h5>
                    <Button variant="link" className="links">Facebook</Button>
                    <Button variant="link" className="links">Instagram</Button>
                    <Button variant="link" className="links">Twitter</Button>
                </div>
                <div className="columnas">
                    <h5>Sobre Nosotros</h5>
                    <Button variant="link" className="links">Mision</Button>
                    <Button variant="link" className="links">Vision</Button>
                    <Button variant="link" className="links">Politica de privacidad</Button>
                </div>
            </div>
            <div className="filas" >
                <div className="columnas">
                    <h6>Leopet @2022</h6>
                </div>
            </div>
        </Container>
    );
};

export default Footer;
