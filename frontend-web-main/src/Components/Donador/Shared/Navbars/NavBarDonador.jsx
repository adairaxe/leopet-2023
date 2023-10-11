import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Logo from '../../../../Assets/Img/leopetLogo.png';
import './NavBars.scss';
//Import BarraInferior from '../BarraInferior/BarraInferior';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const NavBarDonador = () => {
  return (
    <Navbar className="navbarLeopet-bg" expand="lg">
      <Container className="navbarLeopet-logo">
        <Link to="/home">
          <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top navbar-img"
            alt="Leopet"
          />
        </Link>
      </Container>
      <Container className="navbarLeopet-container">
        <Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/home" className="navbarLeopet-link">
              Inicio
            </Nav.Link>
            <Nav.Link href="#" className="navbarLeopet-link">
              Animales
            </Nav.Link>
            <Nav.Link href="#" className="navbarLeopet-link">
              Manadas
            </Nav.Link>
            <Nav.Link href="#" className="navbarLeopet-link">
              Notificaciones
            </Nav.Link>
            <Nav.Link href="#" className="navbarLeopet-link">
              Nosotros
            </Nav.Link>
            <Nav.Link href="/login">
              <Button className="navbarLeopet-button-login">Logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBarDonador;
