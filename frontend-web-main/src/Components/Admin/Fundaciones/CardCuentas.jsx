import React, { useState } from 'react';
import { BANCOS } from '../constantes';

import './CardCuentas.scss';

export const CardCuentas = ({
  selectedFundation,
  onClose,
  createCuenta,
  updateCuenta,
}) => {
  const [selectedCuenta, setCuenta] = useState(
    selectedFundation.cuentaBancaria || {
      banco: BANCOS[0],
      tipo: 'Corriente',
    }
  );

  const isInvalid = () => {
    return (
      !selectedCuenta.banco ||
      !selectedCuenta.numero ||
      !selectedCuenta.tipo ||
      !selectedCuenta.nombre
    );
  };

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card card-cuentas">
        <div className="fund-txt-24 fund-mb-16">Cuenta</div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Banco</span>
          <select
            value={selectedCuenta.banco}
            onChange={(e) => {
              setCuenta({
                ...selectedCuenta,
                banco: e.target.value,
              });
            }}
          >
            {BANCOS.map((banco, idx) => {
              return (
                <option key={idx} value={banco}>
                  {banco}
                </option>
              );
            })}
          </select>
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Número de cuenta</span>
          <input
            value={selectedCuenta.numero || ''}
            type="number"
            onChange={(e) => {
              setCuenta({
                ...selectedCuenta,
                numero: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Nombre del titular</span>
          <input
            value={selectedCuenta.nombre || ''}
            type="text"
            onChange={(e) => {
              setCuenta({
                ...selectedCuenta,
                nombre: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Tipo de cuenta</span>
          <select
            value={selectedCuenta.tipo}
            onChange={(e) => {
              setCuenta({
                ...selectedCuenta,
                tipo: e.target.value,
              });
            }}
          >
            <option value="Corriente">Corriente</option>
            <option value="Ahorro">Ahorro</option>
          </select>
        </div>
        <div className="fund-form-buttons">
          <button className="fund-btn-secundary" onClick={() =>
onClose()}>
            Cancelar
          </button>
          <button
            className="fund-btn"
            disabled={isInvalid()}
            onClick={() => {
              selectedCuenta.id
                ? updateCuenta(selectedCuenta)
                : createCuenta({
                    ...selectedCuenta,
                    fundacionId: selectedFundation.id,
                  });
            }}
          >
            {selectedCuenta.id ? 'Guadar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
};
