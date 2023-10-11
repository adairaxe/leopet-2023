import React, { useState } from 'react';

export const CardAddUser = ({
  onClose,
  selectedUser,
  fundation,
  updateUser,
  createUser,
  setCambiarContrasenia,
}) => {
  const [user, setUser] = useState(selectedUser || {});

  const isValid = () => {
    return (
      user.cedula &&
      user.nombres &&
      user.apellidos &&
      user.email &&
      user.direccion &&
      user.telefono &&
      ((!selectedUser && user.password) || selectedUser)
    );
  };

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card fund-card-user">
        <div className="fund-title">
          <div className="fund-txt-24 fund-mb-16 fund-flx-b">
            {user.id ? 'Perfil' : 'Registro'}
          </div>
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Cedula*</span>
          <input
            value={user.cedula || ''}
            type="number"
            onChange={(e) => {
              setUser({
                ...user,
                cedula: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Nombres*</span>
          <input
            value={user.nombres || ''}
            type="text"
            maxLength={50}
            onChange={(e) => {
              setUser({
                ...user,
                nombres: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Apellidos*</span>
          <input
            value={user.apellidos || ''}
            type="text"
            maxLength={50}
            onChange={(e) => {
              setUser({
                ...user,
                apellidos: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Dirección*</span>
          <input
            value={user.direccion || ''}
            type="text"
            maxLength={50}
            onChange={(e) => {
              setUser({
                ...user,
                direccion: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Teléfono*</span>
          <input
            value={user.telefono || ''}
            type="number"
            onChange={(e) => {
              setUser({
                ...user,
                telefono: e.target.value,
              });
            }}
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Correo*</span>
          <input
            value={user.email || ''}
            type="text"
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
        </div>
        {!user.id && (
          <div className="fund-form-field">
            <span className="fund-txt-12">Contraseña*</span>
            <input
              value={user.password || ''}
              type="password"
              maxLength={20}
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
        )}
        {user.id !== undefined && (
          <button
            style={{ display: 'none' }}
            className="fund-btn-guardar fund-btn-secundary fund-shadow-1 fund-mt-16"
            onClick={() => 
setCambiarContrasenia(true)}
          >
            Cambiar contraseña
          </button>
        )}
        <div className="form-buttons-2option">
         
          <button
            className="fund-btn"
            disabled={!isValid()}
            onClick={() => {
              if (user.id) {
                updateUser(user);
              } else {
                createUser(user, fundation);
              }
              onClose();
            }}
          >
            {user.id ? 'Guadar' : 'Crear'}
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
