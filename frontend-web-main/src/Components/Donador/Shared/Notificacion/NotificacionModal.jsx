import imgPerro from './../../../../Assets/icons/dog.png';
import imgGato from './../../../../Assets/icons/cat.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState } from 'react';
import { SECCIONES } from '../../constantes';

import './Notificacion.scss';

export const NotificacionModal = ({  
  setShowNotificacion, 
   notificaciones,  
  selectSection,  
  selectNotificacion, 
  //A-//loadNotificaciones, 
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
    <div className="notificacion-dialog ">
      <div className="notificacion-content noti-card">
        <div className="fund-txt-24 fund-mb-16">
         Notificaciones
        </div>
        <div className="noti-don-animals-content">   
     <div className="fund-txt-24 fund-mb-16">       
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
              className="noti-animal noti-card-white fund-pointer"
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
                setShowNotificacion();
                selectSection(SECCIONES[9]);
                selectNotificacion(notificacion);
              }            
            }
            >              
              <div className='noti-animal'>
                <img
                  className="noti-animal-foto"
                  src={notificacion.animal.imagen} />               
              </div>

              <div className="noti-animal-descripcion">
                <div className="noti-data-animal noti-animal-row">
                  <div className="noti-column">
                    <img
                      className="noti-especie-icons "
                      src={notificacion.animal.especie == 'Perro' ? imgPerro : imgGato} />

                  </div>
                  <div className="noti-txt-10-green noti-animal-column">{notificacion.animal.nombre} </div> 
                                 
                </div> 
                 <div className="noti-column"> 
                  <div className="noti-txt-8 noti-animal-column">
                    Fundación {notificacion.actualizacion.fundacion.length<=17?
                    notificacion.actualizacion.fundacion:(
                    `${notificacion.actualizacion.fundacion.substring(0, 17)}...`)
                    } 
                  </div>
                </div>            
                <div className="noti-column">                  
                  <div className="noti-txt-datofun noti-animal-row"> 
                  {notificacion.actualizacion.descripcion.length<=28?
                  notificacion.actualizacion.descripcion:(
                  `${notificacion.actualizacion.descripcion.substring(0, 28)}...`)
                  }</div>
                </div>  
                                              
              </div>
                 

            </div>
            
          ))}
        </InfiniteScroll>
      )}
    </div>
        
        
        <div className="fund-form-buttons">
          <button
            className="fund-btn"
            onClick={() => 
              setShowNotificacion()}>
            CERRAR
          </button>
             
        </div>
      </div>
    </div>
  );
};
