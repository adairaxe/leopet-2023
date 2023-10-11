import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './CardPayPal.scss';
export const CardPayPal = ({ onClose, selectedManada }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>PayPal</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">
            {`¡Empieza a donar a la manada ${selectedManada.nombre}!`}
          </div>

          <div className="fund-form-field">
            <span className="fund-txt-12-column">Correo*</span>
            <div className="seccion-detalle-row">
              <div className='icono-seccion-column'><FontAwesomeIcon icon={faEnvelope} color="#028596" /></div>
              <input
                type="text"
                maxLength={20}
                placeholder="usuario@email.com"
              />
            </div>
            <span className="fund-txt-12-column">Contraseña*</span>
            <div className="seccion-detalle-row">
              <div className='icono-seccion-column'><FontAwesomeIcon icon={faLock} color="#028596"/></div>
              <input
                type="text"
                maxLength={20}
                placeholder="******"
              />
            </div>
          </div>
        </div>
        <div className="fund-form-buttons-row">
          <button className="fund-btn" onClick={onClose}>
            cancelar
          </button>
          <button
            className="fund-btn"
            onClick={() => {
              onClose();
            }}
          >
            Suscribirse
          </button>
        </div>
      </div>
    </div>
  );
};