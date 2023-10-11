import React from 'react';

import './Subscripcion.scss';

export const Subscripcion = ({ onClose, link }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card card-message">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>Manada</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">Enlace generado.</div>
        </div>
        <div className="fund-form-buttons">
          <button className="fund-btn-secundary" onClick={onClose}>
            Cancelar
          </button>
          <a className="fund-btn" href={link} rel="noreferrer" target="_blank">
            Continuar
          </a>
        </div>
      </div>
    </div>
  );
};
