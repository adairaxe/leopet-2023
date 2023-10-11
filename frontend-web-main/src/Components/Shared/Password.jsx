import React, { useState } from 'react';
import { cambiarContrasenia } from './../../Service/User';

export const Password = ({
  id,
  onClose,
  setLoading,
  setdataMessage,
  setError,
}) => {
  const [password, setPassword] = useState({});

  const cambiar = () => {
    setLoading(true);
    return cambiarContrasenia(
      {
        id,
        password,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then(() => {
        setLoading(false);
        onClose();
        setdataMessage({
          title: 'Usuario',
          message: 'Cambio de contraseña exitoso',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-txt-24 fund-mb-16">Cambiar contraseña</div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Contraseña actual</span>
          <input
            value={password.actual || ''}
            type="password"
            maxLength={10}
            onChange={(e) => {
              setPassword({
                ...password,
                actual: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Contraseña nueva</span>
          <input
            value={password.nueva || ''}
            type="password"
            onChange={(e) => {
              setPassword({
                ...password,
                nueva: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-buttons">
          <button className="fund-btn-secundary" onClick={() => 
onClose()}>
            Cancelar
          </button>
          <button
            className="fund-btn"
            disabled={!password.nueva || !password.actual}
            onClick={() => {
              cambiar();
            }}
          >
            Cambiar
          </button>
        </div>
      </div>
    </div>
  );
};
