import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Update.scss';
import { faClipboard, faFile, faBriefcaseMedical, faImages } from '@fortawesome/free-solid-svg-icons';

import { Carousel } from 'react-bootstrap';

export const Update = (
) => {
  return (
    <div className="fund-don-animals-historial">

      <div className="fund-historial-title">
        <div className="fund-return fund-flx">
          <i
            className="fas fa-arrow-alt-circle-left fund-mr-8 fund-pointer"
          />
          <div className="fund-txt-24 fund-mb-16">Update</div>
        </div>
      </div>
      <div className="contenedor-animal-detalle">
        <div className="animal-txt-green fund-txt-24">Manchas</div>
        <div className='detalle-animal-column'>
          <div className="seccion-detalle-row ">
            <div className='icono-seccion'><FontAwesomeIcon icon={faImages} /></div>
            <div className="etiqueta-txt-14 animal-txt-green">Evidencias</div>
          </div>

          <div className='animal-carousel'>
          <Carousel className='animal-carousel-element fund-shadow'>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={'https://www.hogarmania.com/archivos/201705/mascotas-perros-comida-cantidad-pienso-dia-1280x720x80xX.jpg'}
                alt="First slide"
              />
              <Carousel.Caption>
                {/*  <h3>Conoce los Casos</h3>
                <p>
                  Guayaquil, más de 1000 animales de 
                  compañía extraviados en el 2021.
                </p> */}
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={'https://www.hospitalveterinariouax.com/var/site/storage/images/0/5/4/3/73450-1-esl-ES/hero-especialidad-medicina-interna-perros.jpg'}
                alt="Second slide"
              />

              <Carousel.Caption>
                {/*  <h3>Conoce a las Fundaciones</h3>
                <p>Dona a los animales de las distintas fundaciones.</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        </div>
      </div>
      <div className="fund-ml-16">
        <div className='detalle-row'>
          <div className='detalle-column'>
            <div className="seccion-detalle-row ">
              <div className='icono-seccion'><FontAwesomeIcon icon={faClipboard} /></div>
              <div className="etiqueta-txt-14 animal-txt-green">Datos del animal</div>
            </div>
            <div className="info-detalle-column fund-shadow">
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Especie:</div>
                <div className="dato-txt-14 dato-column">Perro</div>
              </div>
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Edad:</div>
                <div className="dato-txt-14 dato-column">12 años</div>
              </div>
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Sexo:</div>
                <div className="dato-txt-14 dato-column">Macho</div>
              </div>
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Raza:</div>
                <div className="dato-txt-14 dato-column">Mestizo</div>
              </div>
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Fundación:</div>
                <div className="dato-txt-14 dato-column">leopet</div>
              </div>
            </div>
          </div>
          <div className='detalle-column'>
            <div className="seccion-detalle-row ">
              <div className='icono-seccion'><FontAwesomeIcon icon={faFile} /></div>
              <div className="etiqueta-txt-14 animal-txt-green">Informe</div>
            </div>
            <div className="info-detalle-column fund-shadow">
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Fecha:</div>
                <div className="dato-txt-14 dato-column">23/04/2022</div>
              </div>
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Descripción:</div>
                <div className="dato-txt-14 dato-column">Se compro medicamentos</div>
              </div>
            </div>
          </div>
          <div className='detalle-column'>
            <div className="seccion-detalle-row ">
              <div className='icono-seccion'><FontAwesomeIcon icon={faBriefcaseMedical} /></div>
              <div className="etiqueta-txt-14 animal-txt-green">Estado de Salud</div>
            </div>
            <div className="info-detalle-column fund-shadow">
              <div className="animal-detalle-row">
                <div className="etiqueta-txt-14 etiqueta-column">Comentarios:</div>
                <div className="dato-txt-14 dato-column">Manchas es sano y tiene todas sus vacunas</div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};
