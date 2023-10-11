import React from 'react';

export const CardDelete = ({ onClose, selectedFundation, deleteFundation }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>Fundación</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">
            {`¿Esta seguro de eliminar a la fundación "${selectedFundation.nombre}?"`}
          </div>
        </div>
        <div className="fund-form-buttons">
          <button className="fund-btn-secundary" onClick={onClose}>
            No
          </button>
          <button
            className="fund-btn"
            onClick={() => {
              deleteFundation(selectedManada);
              onClose();
            }}
          >
            Si
          </button>
        </div>
      </div>
    </div>
  );
};
