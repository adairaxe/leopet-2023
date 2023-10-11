import React from 'react';
import NavBarLandingPage from './Navbars/NavBarLandingPage';
import { Carousel, Card } from 'react-bootstrap';
import RegistroLanding from '../Fundacion/Shared/Forms/RegistroLanding';
import perro from '../../Assets/Img/Rectangle.png';
import figuraPerro from '../../Assets/Img/Group.png';
import huella from '../../Assets/Img/huella.png';
import Footer from './Footer/Footer';

import './Home.scss';

export const Home = () => {

  return (
    <div>
      <NavBarLandingPage></NavBarLandingPage>
      <div className='home-title'>
        <h1 className='fund-txt-32'>LEOPET</h1>
      </div>
      <div className='home-title'>
        <p className='fund-txt-24'>Dona y apadrina animales de diversas fundaciones</p>
        <p>Pues hemos nacido para colaborar,
          al igual que los pies, las manos, los
          párpados, las hileras de dientes,
          superiores e inferiores. Obrar, pues,
          como adversarios los unos de los otros
          es contrario a la naturaleza.
        </p>
      </div>
      <div className='home-carousel'>
        <Carousel className='home-carousel-element'>
          <Carousel.Item>
            <img
              className="d-block home-carousel-img"
              src='https://i0.wp.com/www.encantadordeperros.es/wp-content/uploads/2017/10/pexels-photo-117486-6.jpeg?resize=805%2C452&ssl=1'
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Conoce los Casos</h3>
              <p>
                Guayaquil, más de 1000 animales de
                compañía extraviados en el 2021.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={perro}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Conoce a las Fundaciones</h3>
              <p>Dona a los animales de las distintas fundaciones.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='home-cards'>
        <Card className='home-card-info' style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Subtitle>Estamos actuando</Card.Subtitle>
            <Card.Title className='fund-txt-24'>Por Los Animales</Card.Title>
            <Card.Text className='fund-txt-14'>
              Desde el Despacho Legal de
              nuestro Centro Comunitario
              por la Liberación Animal (COLA);
              emprendemos la defensa de los
              derechos animales; asesorando a la
              comunidad en temas de maltrato
              animal o violencia con enfoque de
              género y derechos de la población LGBTIQ+.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="top" className='card-img' src={figuraPerro} />
        </Card>

        <Card className='home-card-info' style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Subtitle>Estamos actuando</Card.Subtitle>
            <Card.Title className='fund-txt-24'>Por Los Animales</Card.Title>
            <Card.Text className='fund-txt-14'>
              Desde el Despacho Legal de
              nuestro Centro Comunitario
              por la Liberación Animal (COLA);
              emprendemos la defensa de los
              derechos animales; asesorando a la
              comunidad en temas de maltrato
              animal o violencia con enfoque de
              género y derechos de la población LGBTIQ+.
            </Card.Text>
          </Card.Body>
          <Card.Img variant="top" className='card-img' src={huella} />
        </Card>
      </div>
      <div className='home-header-form'>
        <h2 className='fund-txt-24'>Solicita el registro de una Fundación</h2>
        <p>Puedes solicitar el registro de una Fundación
          completando los datos del siguiente formulario.
        </p>
      </div>
      <RegistroLanding ></RegistroLanding>
      <Footer></Footer>

    </div>
  );
};

export default Home;
