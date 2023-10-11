import React from 'react';

import './CardAnimal.scss';
import { SECCIONES } from '../constantes';

export const CardAnimal = ({
  selectedAnimal,
  selectAnimal,
  selectAnimalToApadrinar,
  selectSection,
}) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card animal">
        <div className="fund-don-dialog-close">
          <i
            className="far fa-times-circle fund-pointer"
            onClick={() => 
selectAnimal()}
          />
        </div>
        <div className="fund-flx">
          <div className="fund-animal-foto fund-flx-column">
            <img className="" src={selectedAnimal?.galeria?.fotos[0]} />
            {/* <img className="" src={selectedAnimal.imagen} /> */}
            {selectedAnimal.status == 'APADRINADO' && (
              <div className="fund-txt-10 fund-tag"> Apadrinado </div>
            )}
          </div>
          <div className="fund-ml-16">
            <b className="fund-txt-24">{selectedAnimal.nombre}</b>
            <div className="fund-data-animal">
              <div className="fund-txt-6">Especie:</div>
              <div className="fund-txt-10">{selectedAnimal.especie}</div>              
            </div>
            <div className="fund-data-animal">
              <div className="fund-txt-6">Raza</div>
              <div className="fund-txt-10">{selectedAnimal.raza}</div>            
            </div>
            <div className="fund-data-animal">
              <div className="fund-txt-6">Fundación</div>
              <div className="fund-txt-10">{selectedAnimal.fundacion}</div>              
            </div>
            <div className="fund-data-animal">
              <div className="fund-txt-6">Descripción</div>
              <div className="fund-txt-10">{selectedAnimal.descripcion}</div>
            </div>
          </div>         
        </div>
       
        <div className="fund-form-buttons">
          <button
            className="fund-btn"
            onClick={() => {
              selectAnimalToApadrinar(selectedAnimal);
              selectSection(SECCIONES[1]);
            }}
          >
            Apadrinar
          </button>
        </div>
      </div>
    </div>
  );
};
