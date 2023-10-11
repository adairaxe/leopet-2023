import React from 'react';

export const CardFromDeleteManada = ({
  onClose,
  selectedManada,
  selectedAnimal,
  deleteFromManada,
}) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>Manada</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">
            {`¿Esta seguro de eliminar a "${selectedAnimal.nombre}" de la manada "${selectedManada.nombre}?"`}
          </div>
        </div>
        <div className="form-buttons-2option">
          <div>
          <button className="fund-btn" onClick={onClose}>
            No
          </button>
          </div>
          <div className='form-buttons-2option-cancelar'>
          <button
            className="fund-btn"
            onClick={() => {
              deleteFromManada(selectedAnimal.id, selectedManada.id);
              onClose();
            }}
          >
            Si
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
