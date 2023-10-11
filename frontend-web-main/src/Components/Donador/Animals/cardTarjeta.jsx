import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faUser, faCalendarDay, faLock } from '@fortawesome/free-solid-svg-icons';

import './CardPayPal.scss';
export const CardTarjeta = ({ onClose, selectedManada }) => {
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-flx-column">
          <div className="fund-txt-24">
            <b>Crédito o débito</b>
          </div>
          <div className="fund-txt-14 fund-mt-16">
            {`¡Empieza a donar a la manada ${selectedManada.nombre}!`}
          </div>

          <div className="fund-form-field">
            <span className="fund-txt-12-column">Número de tarjeta*</span>
            <div className="seccion-detalle-row">
              <div className='icono-seccion-column'><FontAwesomeIcon icon={faCreditCard} color="#028596" /></div>
              <input
                type="text"
                maxLength={20}
                placeholder="Ingrese su número de tarjeta"
              />
            </div>
            <span className="fund-txt-12-column">Nombre del titular*</span>
            <div className="seccion-detalle-row">
              <div className='icono-seccion-column'><FontAwesomeIcon icon={faUser} color="#028596"/></div>
              <input
                type="text"
                maxLength={20}
                placeholder="Ingrese nombre y apellidos"
              />
            </div>
            <span className="fund-txt-12-column">Fecha de nacimiento*</span>
            <div className="seccion-detalle-row">
              <div className='icono-seccion-column'><FontAwesomeIcon icon={faCalendarDay} color="#028596"/></div>
              <input
                type="text"
                maxLength={20}
                placeholder="MM/AA"
              />
            </div>
            <span className="fund-txt-12-column">Código de seguridad*</span>
            <div className="seccion-detalle-row">
              <div className='icono-seccion-column'><FontAwesomeIcon icon={faLock} color="#028596"/></div>
              <input
                type="text"
                maxLength={20}
                placeholder="Ingrese su código"
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