import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { SECCIONES } from '../../constantes';
import '../../Animals/Animals.scss';

import imgPerro from './../../../../Assets/icons/dog.png';
import imgGato from './../../../../Assets/icons/cat.png';
import leohuella from './../../../../Assets/icons/leohuella1.png';

export const Notificacion = ({
  notificaciones,  
  selectSection,  
  selectNotificacion, 
  loadNotificaciones, 
  updateNotificacion,
}) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); 

  const fetchMoreData = () => {
    loadNotificaciones(page + 1, false, (more) => {
      setHasMore(more);
      setPage(page + (more ? 1 : 0));
    });
  };

  return (
    <div className="fund-don-animals-content">   
     <div className="fund-txt-24 fund-mb-16">
       Tus Notificaciones        
      </div>   
      {!notificaciones?.length ? (
        <div className="fund-empty fund-txt-12 fund-flx">
          <img
            className="fund-img-empty"
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
          />
          No hay Notificaciones disponibles
        </div>
      ) : (
        <InfiniteScroll
          dataLength={notificaciones?.length || 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="fund-loading-cards fund-flx-c fund-full">
              <i className="fad fa-spinner fund-spin" />
            </div>
          }
        >
          {notificaciones?.map((notificacion, idx) => 
            (
            <div
              className="fund-animal fund-card fund-pointer"
              key={idx}
              onClick={() => {  
                if ( !notificacion.leido ) {
                updateNotificacion(
                  {
                    id: notificacion.id,
                    leido: true,
                    fecha_leido: Date.now(),
                  }
                );
                }
                selectSection(SECCIONES[9]);
                return selectNotificacion(notificacion);
              }            
            }
            >              
              <div className='fund-animal'>
                <img
                  className="fund-animal-foto"
                  src={notificacion.animal?.galeria?.fotos[0]} />
                {notificacion.animal.fundacion_id == 3 && (
                  <div className='fun-leopet'>
                    <img
                      className="img-huella"
                      src={leohuella} />
                  </div>

                )}
              </div>

              <div className="fund-animal-descripcion">
                <div className="fund-data-animal animal-row">
                  <div className="animal-column">

                    <img
                      className="especie-icons "
                      src={notificacion.animal.especie == 'Perro' ? imgPerro : imgGato} />


                  </div>
                  <div className="fund-txt-12-green animal-column">{notificacion.animal.nombre} </div>
                </div>
                <div className="animal-column">
                  <div className="fund-txt-6 animal-column">Descripción: </div>
                  <div className="fund-txt-datofun animal-row">{notificacion.actualizacion.descripcion}</div>
                </div>
                <div className="animal-column">
                  <div className="fund-txt-6 animal-column">Estado: </div>
                  <div className="fund-txt-datofun animal-row">{notificacion.actualizacion.estado_salud}</div>
                </div>
                <div className="animal-column">
                  <div className="fund-txt-6 animal-column">Fundación: </div>
                  <div className="fund-txt-datofun animal-row">{notificacion.actualizacion.fundacion}</div>
                </div>
              </div>
                 

            </div>
            
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};
