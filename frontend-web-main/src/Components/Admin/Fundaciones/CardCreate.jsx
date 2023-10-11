import React, { useState } from 'react';

export const CardCreate = ({
  selectedFundation,
  onClose,
  updatefundation,
  createfundation,
}) => {
  const [fundation, setFundation] = useState(selectedFundation || {});

  const isInvalid = () => {
    return (
      !fundation.nombre ||
      !(fundation.nombre.length>2) ||
      !fundation.ruc ||
      !(fundation.ruc.length==13) ||
      !fundation.direccion ||
      !fundation.direccion.length>2 ||
      !fundation.telefono
    );
  };

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-txt-24 fund-mb-16">
          {selectedFundation ? 'Editar' : 'Crear'} fundación
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Ruc</span>
          <input
            value={fundation.ruc || ''}
            type="number"
            maxLength={13}
            onChange={(e) => {
              setFundation({
                ...fundation,
                ruc: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Nombre</span>
          <input
            value={fundation.nombre || ''}
            type="text"
            onChange={(e) => {
              setFundation({
                ...fundation,
                nombre: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Dirección</span>
          <input
            value={fundation.direccion || ''}
            type="text"
            onChange={(e) => {
              setFundation({
                ...fundation,
                direccion: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Teléfono</span>
          <input
            value={fundation.telefono || ''}
            type="number"
            onChange={(e) => {
              setFundation({
                ...fundation,
                telefono: e.target.value,
              });
            }}
          />
        </div>
        <div className="form-buttons-2option">
          
          <button
            className="fund-btn"
            disabled={isInvalid()}
            onClick={() => {
              if (fundation.id) {
                updatefundation(fundation);
              } else {
                createfundation(fundation);
              }
              onClose();
            }}
          >
            {fundation.id ? 'Guadar' : 'Crear'}
          </button>
          <div className='form-buttons-2option-cancelar'>
          <button className="fund-btn" onClick={() => 
onClose()}>
            Cancelar
          </button>
          </div>  
        </div>
      </div>
    </div>
  );
};
