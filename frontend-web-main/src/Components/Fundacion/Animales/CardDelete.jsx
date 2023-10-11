import React from 'react';

export const CardDelete = ({ onClose, selectedAnimal, deleteAnimal }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>Animal</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">
            {`¿Esta seguro de eliminar al animal "${selectedAnimal.nombre}?"`}
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
              deleteAnimal(selectedAnimal);
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
