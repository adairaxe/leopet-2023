import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Logo from './../../../Assets/Img/leopetLogo.png';
import './NavBars.scss';

import { Link } from 'react-router-dom/cjs/react-router-dom';

export const NavBarLandingPage = () => {
  return (
    <Navbar className="navbarLeopet-bg" expand="lg">
      <div className="column">
        <Container className="navbarLeopet-logo">
          <Link to="/home">
            <img
              src={Logo}
              width="55"
              height="55"
              className="d-inline-block align-top navbarLeopet-img"
              alt="Leopet"
            />
          </Link>
        </Container>
      </div>
      <div className="barra-items">
        <Container className="navbarLeopet-container">
          <Nav className="ml-auto">
            <Nav.Link
              href="/home"
              className="navbarLeopet-link fun-don-barra-items"
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              href="#"
              className="navbarLeopet-link fun-don-barra-items"
            >
              Misión
            </Nav.Link>
            <Nav.Link
              href="#"
              className="navbarLeopet-link fun-don-barra-items"
            >
              Nosotros
            </Nav.Link>
          </Nav>
        </Container>
      </div>
      <div className="flex gap-12 px-4 mx-6">
        <div className="column">
          <Link to="/login">
            <Button className="navbarLeopet-button-login w-36">Ingresar</Button>
          </Link>
        </div>
        <div className="column">
          <Link to="/register">
            <Button className="ml-1 navbarLeopet-button-register font-bold">
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default NavBarLandingPage;
