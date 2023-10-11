import React from 'react';
import './CardApadrinar.scss';

export const CardApadrinar = ({
  showCardApadrinar,
  selectedAnimal,
  selectedManada,
  onClick,
}) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>Apadrinar</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">
            {`Esta seguro de asignar a ${selectedAnimal.nombre} a la manada ${selectedManada.nombre}`}
          </div>
        </div>
        <div className="form-buttons-2option">
        <div>
          <button
            className="fund-btn"
            onClick={() => 
showCardApadrinar()}
          >
            Cancelar
          </button>
          </div>
          <div className='form-buttons-2option-cancelar'>
          <button className="fund-btn" onClick={onClick}>
            Guardar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
