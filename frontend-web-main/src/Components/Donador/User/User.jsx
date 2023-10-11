import { useState, useEffect } from 'react';
import ima from './../../../Assets/Img/ima_registro.png';
import { register } from './../../../Service/User';
import { Password } from '../../Shared/Password';
import { CardMessage } from './../Shared/CardMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faIdCard,
  faUser,
  faPhone,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import './User.scss';
import { GLOBALCONFIG } from '../../Config';

export const User = ({ selectedUser, logout, editUser, history }) => {
  const [user, setUser] = useState(selectedUser || {});
  const [isEditingCard, setEditingCard] = useState();
  const [isLoading, setLoading] = useState();
  const [dataMessage, setdataMessage] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setUser(selectedUser || {});
  }, [selectedUser]);

  const registerUser = () => {
    setLoading(true);
    return register(
      {
        user: {
          ...user,
          role: 3,
        },
      },
      {
        apiUrl:
          window.userSigned?.apiUrl ||
          GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort,
      }
    )
      .then(() => {
        setLoading(false);
        setdataMessage({
          title: 'Registro',
          message: 'Registro exitoso',
        });
        history.push('/login');
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const valid = () => {
    return (
      user.cedula &&
      user.nombres &&
      user.apellidos &&
      user.email &&
      user.telefono &&
      ((!selectedUser && user.password) || selectedUser)
    );
  };
  return (
    <div>
      <div
        className={
          'fund-don-user-content' + (!selectedUser ? ' fund-mt-32' : '')
        }
      >
        {dataMessage && (
          <CardMessage
            message={dataMessage.message}
            title={dataMessage.title}
            onClose={() => setdataMessage()}
          />
        )}
        {isLoading && (
          <div className="fund-loading">
            <i className="fad fa-spinner fund-spin" />
          </div>
        )}
        {error && (
          <div className="fund-error fund-txt-12 fund-flx">
            <i className="fas fa-exclamation-triangle" />
            {error}
            <button
              className="fund-btn fund-mt-16"
              onClick={() => window.location.replace('')}
            >
              Recargar
            </button>
          </div>
        )}
        {!isLoading && !error && (
          <div className="form-registro">
            <div className="form-registro-container-form">
              <div className="fund-title">
                <div className="fund-txt-24 fund-mb-16 fund-flx-b">
                  {user?.id ? 'Perfil' : 'Registro'}
                </div>
                {selectedUser && (
                  <i className="fas fa-sign-out-alt" onClick={logout} />
                )}
              </div>

              <div className="fund-form-field">
                <span className="fund-txt-12 titulo-negrita">Correo</span>
                <div className="seccion-detalle-row">
                  <div className="icono-seccion-column">
                    <FontAwesomeIcon icon={faEnvelope} color="#028596" />
                  </div>
                  <input
                    value={user.email || ''}
                    type="text"
                    placeholder="ingrese su correo electrónico"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="fund-form-field">
                <span className="fund-txt-12 titulo-negrita">Cédula</span>
                <div className="seccion-detalle-row">
                  <div className="icono-seccion-column">
                    <FontAwesomeIcon icon={faIdCard} color="#028596" />
                  </div>
                  <input
                    value={user.cedula || ''}
                    type="number"
                    placeholder="Ingrese su número de cedula"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        cedula: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="fund-form-field">
                <span className="fund-txt-12 titulo-negrita">Nombres</span>
                <div className="seccion-detalle-row">
                  <div className="icono-seccion-column">
                    <FontAwesomeIcon icon={faUser} color="#028596" />
                  </div>
                  <input
                    value={user.nombres || ''}
                    type="text"
                    placeholder="Ingrese sus nombres"
                    maxLength={20}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        nombres: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="fund-form-field">
                <span className="fund-txt-12 titulo-negrita">Apellidos</span>
                <div className="seccion-detalle-row">
                  <div className="icono-seccion-column">
                    <FontAwesomeIcon icon={faUser} color="#028596" />
                  </div>
                  <input
                    value={user.apellidos || ''}
                    type="text"
                    placeholder="Ingrese sus apellidos"
                    maxLength={20}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        apellidos: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="fund-form-field">
                <span className="fund-txt-12 titulo-negrita">Teléfono</span>
                <div className="seccion-detalle-row">
                  <div className="icono-seccion-column">
                    <FontAwesomeIcon icon={faPhone} color="#028596" />
                  </div>
                  <input
                    value={user.telefono || ''}
                    type="number"
                    placeholder="Ingrese su número de teléfono"
                    onChange={(e) => {
                      setUser({
                        ...user,
                        telefono: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              {!selectedUser && (
                <div className="fund-form-field">
                  <span className="fund-txt-12">Contraseña*</span>
                  <div className="seccion-detalle-row">
                    <div className="icono-seccion-column">
                      <FontAwesomeIcon icon={faLock} color="#028596" />
                    </div>
                    <input
                      value={user.password || ''}
                      type="password"
                      placeholder="Ingrese una contraseña"
                      maxLength={20}
                      onChange={(e) => {
                        setUser({
                          ...user,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="fund-flx-column">
                {selectedUser !== undefined && (
                  <button
                    className="fund-btn-pago fund-btn-secundary fund-shadow-1 fund-flx-column "
                    onClick={() => setEditingCard(true)}
                  >
                    Cambiar contraseña
                  </button>
                )}
                <button
                  className="fund-btn fund-btn-guardar  "
                  onClick={() => {
                    if (user.id) {
                      editUser(user);
                    } else {
                      registerUser(user);
                    }
                  }}
                  disabled={!valid()}
                >
                  {selectedUser ? 'Guardar' : 'Registrarse'}
                </button>
              </div>
            </div>
            <div className="form-registro-container-img">
              <img src={ima} />
            </div>
          </div>
        )}
        {isEditingCard && (
          <Password
            id={user.id}
            onClose={() => setEditingCard()}
            setLoading={setLoading}
            setdataMessage={setdataMessage}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
