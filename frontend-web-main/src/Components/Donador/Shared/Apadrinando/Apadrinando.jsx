import React from 'react';

import './Apadrinando.scss';

const Apadrinando = ({ selectedAnimal, selectAnimal }) => {
  return (
    <div className="fund-don-barra-apadrinando">
      <div className="fund-apadrinando-section">
        <img
          className="fund-animal-foto fund-mr-16"
          src={selectedAnimal?.galeria?.fotos[0]}
        />
        <div>
          <div className="fund-txt-12">
            <b>{selectedAnimal.nombre}</b>
          </div>
          <div className="fund-txt-10">Apadrinando...</div>
        </div>
      </div>
      <i
        className="fas fa-times-circle fund-pointer"
        onClick={() => 
selectAnimal()}
      />
    </div>
  );
};

export default Apadrinando;
