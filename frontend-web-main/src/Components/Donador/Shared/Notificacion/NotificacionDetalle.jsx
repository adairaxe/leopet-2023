import React, { useState } from 'react';

//A-//import { SECCIONES } from '../../constantes';

import { FaStar } from 'react-icons/fa';
import { Container, Radio, Rating } from './RatingStyles';
import imanada from './../../../../Assets/icons/pawfill.png';

import { Carousel } from 'react-bootstrap';

import '../../Animals/AnimalsDetalle.scss';

export const NotificacionDetalle = ({      
  //A-//selectSection,  
  //A-//selectNotificacion,  
  selectedNotificacion,
  updateNotificacion,
}) => {
  const [rate, setRate] = useState(selectedNotificacion.calificacion);
  return (
    <div className="fund-don-animals-historial" key={selectedNotificacion.id}>      
      <div className="fund-historial-title">
        <div className="fund-return fund-flx">
         {/*  <i
            className="fas fa-arrow-alt-circle-left fund-mr-8 fund-pointer"
            onClick={() => {
              selectNotificacion();
              selectSection(SECCIONES[8]);
            }}
          /> */}
          <div className="fund-txt-24 fund-mb-16">Detalle de Notificación</div>
        </div>        
     
      </div>
      <div className="contenedor-animal-detalle">
        <div className="animal-txt-green fund-txt-24">{selectedNotificacion.animal.nombre}</div>
                
        <div className="fund-ml-8">
        
          <div className='detalle-row'>
            <div className='detalle-column'>             
              <div className="seccion-detalle-row">
                {/* <div className='icono-seccion'>
                <FontAwesomeIcon 
                icon={faBriefcaseMedical} /></div> */}                
                  
              </div>

              <div className='animal-detalle-carousel'>
          <Carousel className='animal-detalle-carousel-element fund-shadow'>
          {selectedNotificacion.actualizacion.
          galeria?.fotos?.map((foto, idx) => {
            return (    
              <Carousel.Item key={idx} >                
              <img
                              
                className="d-block w-100"
                src={foto}
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
          );})}
          </Carousel>
        </div>

              
              <div className="info-detalle-column-estrellas fund-shadow"> 
              <div className="animal-detalle-row">
                <div className="animal-detalle-row etiqueta-estrella">
                <div className='icono-seccion'>
                  <img  src={imanada} />
                </div>                  
                  <div className="etiqueta-txt-14 animal-txt-green ">Calificación</div>
                  </div>
                  <div className="dato-txt-14 dato-column">                
                <Container>
                  {[...Array(5)].map((item, index) => {
                    const givenRating = index + 1;
                    return (
                      <>
                      <label>
                        <Radio
                          type="radio"
                          value={givenRating}
                          onClick={() => {
                            if ( selectedNotificacion.calificacion==null || 
                              selectedNotificacion.calificacion==0)
                              setRate(givenRating);                
                          }}
                        />
                        <Rating>
                          {(givenRating < rate || givenRating === rate) ?
                            ( 
                            <FaStar color='#FFC300' />
                          ):
                          (
                            <FaStar color='grey' />
                          )
                          
                          }             

                        </Rating>
                      </label>
                      </>
                    );
                  })}
                </Container>
                </div>

                </div>
                { (selectedNotificacion.calificacion==null || 
                              selectedNotificacion.calificacion==0 )&&(
                
                    <button
                      className="fund-btn"
                      onClick={() => {
                        updateNotificacion(
                          {
                            id: selectedNotificacion.id,
                            calificacion: rate,
                            fecha_calificacion: Date.now(),
                          }                          
                        );                        
                        selectedNotificacion.calificacion=rate;
                      }}
                    >
                      Enviar Calificación
                    </button>
                  
                )}
              </div>
            </div>
          </div>

          <div className='detalle-row'>
            
            <div className='detalle-column'>
              <div className="seccion-detalle-row">
                
              <div className='icono-seccion'>
                <img  src={imanada} />
               </div>

                <div className="etiqueta-txt-14 animal-txt-green ">Datos del Animal</div>
              </div>
              <div className="info-detalle-column fund-shadow detalle-animal-info ">
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Especie:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.animal.especie}</div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Edad:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.animal.edad}</div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Sexo:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.animal.sexo? 'Macho' : 'Hembra'}</div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Raza:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.animal.raza}</div>
                </div>                
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Fundacion:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.actualizacion.fundacion}</div>
                </div>                
              </div>
            </div>

            <div className='detalle-column'>
              <div className="seccion-detalle-row">
                
              <div className='icono-seccion'>
                <img  src={imanada} />
               </div>

              <div className="etiqueta-txt-14 animal-txt-green ">Informe</div>
              </div>
              <div className="info-detalle-column fund-shadow detalle-animal-info ">
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Fecha:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.actualizacion.fecha}</div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Descripción:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.actualizacion.descripcion}</div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Estado Salud:</div>
                  <div className="dato-txt-14 dato-column">{selectedNotificacion.actualizacion.estado_salud}</div>
                </div>                
              </div>
            </div>
           

          </div>
        </div>
      </div>      
    
    </div>
  );
};