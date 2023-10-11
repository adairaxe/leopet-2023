import React from 'react';
import { Animals } from '../Animals/Animals';

import { SECCIONES } from './../constantes';
import leopetLogo from './../../../Assets/Img/leopetLogo.png';

import './FundacionDetalle.scss';

export const FundacionDetalle = ({  
  selectSection, 
  selectedFundacion,  
  animals, 
  loadAnimals,
  selectAnimalToHistory,  
}) => {
  

  return (    
    <div className="fund-don-animals-historial">     
      <div className="fund-historial-title">
        <div className="fund-return fund-flx">
          <i
            className="fas fa-arrow-alt-circle-left fund-mr-8 fund-pointer"
            onClick={() => {              
              selectSection(SECCIONES[2]);
            }}
          />
          <div className="fund-txt-24 fund-mb-16">Detalle de Fundación</div>                 
        </div>                      
      </div>            
      <div className="contenedor-fun-detalle fund-shadow">
        <div className="detalle-fila"> 
          <div className="detalle-col"> 
              <img
                className="fund-logo-foto"
                src={selectedFundacion.id==3 ? 
                      leopetLogo: 
                      selectedFundacion.logo}/>
          </div>
          <div className="detalle-col"> 
            <div className="detalle-fila">
              <div className="fun-txt-green fund-txt-24">{selectedFundacion.nombre}</div> 
            </div>  
            <div className="detalle-fila">
              <div className="etiqueta-txt-14 detalle-col">Teléfono: </div>
              <div className="dato-txt-14 detalle-col">{selectedFundacion.telefono}</div>              
            </div>
            <div className="detalle-fila">
              <div className="etiqueta-txt-14 detalle-col">Email: </div>
              <div className="dato-txt-14 detalle-col">{selectedFundacion.user.email}</div>            
            </div>
            <div className="detalle-fila">
              <div className="etiqueta-txt-14 detalle-col">Dirección: </div>
              <div className="dato-txt-14 detalle-col">{selectedFundacion.direccion}</div>              
            </div>               
          </div>               
          
          </div>         
       
        </div>  
        <Animals 
          animals={animals}
          selectSection={selectSection}
          loadAnimals={loadAnimals}
          selectAnimalToHistory={selectAnimalToHistory}
        ></Animals>       

      </div>
    
  );
};