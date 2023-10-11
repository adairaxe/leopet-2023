import { useState } from 'react';
import { login } from './../../../Service/User';
import NavBarLandingPage from '../Navbars/NavBarLandingPage';

import log from './../../../Assets/Img/login.png';
import './Login.scss';
import { GLOBALCONFIG } from '../../Config';

const Login = ({ history }) => {
  const [correo, setCorreo] = useState();
  const [contrasenia, setContrasenia] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const iniciarSesion = () => {
    setLoading(true);
    login(
      {
        correo,
        contrasenia,
      },
      {
        apiUrl:
          window.userSigned?.apiUrl ||
          GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort,
      }
    )
      .then((user) => {
        localStorage.setItem('session', JSON.stringify(user));
        setLoading(false);
        window.userSigned = user;
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const iniciarSesionFacebook = () => {
    setLoading(true);
    login(
      {
        correo,
        contrasenia,
      },
      {
        apiUrl:
          window.userSigned?.apiUrl ||
          GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort,
      }
    )
      .then((user) => {
        localStorage.setItem('session', JSON.stringify(user));
        setLoading(false);
        window.userSigned = user;
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  return (
    <div className="fund-login">
      <NavBarLandingPage></NavBarLandingPage>
      {iniciarSesionFacebook}
      <div className="fund-login-container-img">
        <img src={log} />
      </div>
      <div className="fund-login-container-form fund-flx-c fund-card">
        <div className="fund-login-form">
          <p className="fund-txt-14">Bienvenid@</p>
          <span className="fund-txt-32 fund-mb-32">Iniciar sesión</span>
          <div className="fund-form-field">
            <span className="fund-txt-12">Correo Electrónico</span>
            <input
              value={correo || ''}
              onChange={(e) => {
                setCorreo(e.target.value);
              }}
            />
          </div>
          <div className="fund-form-field">
            <span className="fund-txt-12">Contraseña</span>
            <input
              value={contrasenia || ''}
              type="password"
              onChange={(e) => {
                setContrasenia(e.target.value);
              }}
            />
          </div>
          <div className="fund-form-recuerdame">
            <span className="fund-txt-12">Recuérdame </span>
            <input type="checkbox" id="recuerdame" name="Recuérdame" />
          </div>
          {error && (
            <span className="fund-form-field fund-text-error fund-txt-12">
              <i className="fas fa-exclamation-circle fas-mini fund-mr-4 fund-text-error"></i>
              {error}
            </span>
          )}
          <div className="fund-form-buttons">
            <button
              disabled={loading}
              className="fund-btn"
              onClick={iniciarSesion}
            >
              Ingresar
            </button>
            <button
              disabled={loading}
              className="fund-btn fund-btn-gmail"
              onClick={iniciarSesion}
            >
              <a className="fund-btn-logo-container">
                <img
                  className="fund-btn-logo"
                  alt="gmail"
                  src="https://img.icons8.com/color/25/000000/google-logo.png"
                />
              </a>
              <a>Ingresar Con Gmail</a>
            </button>
            <button
              disabled={loading}
              className="fund-btn fund-btn-facebook"
              onClick={iniciarSesion}
            >
              <a className="fund-btn-logo-container">
                <img
                  className="fund-btn-logo"
                  alt="facebook"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjUiIGhlaWdodD0iMjUiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iIzQyNjdiMiI+PHBhdGggZD0iTTExNy41NTQ4Myw2NC41aC0xNy4yMjE1di0xNC4zMzMzM2MwLC03LjM5NiAwLjYwMiwtMTIuMDU0MzMgMTEuMjAxNSwtMTIuMDU0MzNoNi4yMjA2N2MzLjk1NiwwIDcuMTY2NjcsLTMuMjEwNjcgNy4xNjY2NywtNy4xNjY2N3YtOC45ODdjMCwtMy43NDgxNyAtMi44NzM4MywtNi45NTE2NyAtNi42MTQ4MywtNy4yMDI1Yy00LjMyODY3LC0wLjI5MzgzIC04LjY2NDUsLTAuNDMgLTEzLjAwNzUsLTAuNDIyODNjLTE5LjQ0MzE3LDAgLTMzLjYzMzE3LDExLjg3NTE3IC0zMy42MzMxNywzMy42NzYxN3YxNi40OTA1aC0xNC4zMzMzM2MtMy45NTYsMCAtNy4xNjY2NywzLjIxMDY3IC03LjE2NjY3LDcuMTY2Njd2MTQuMzMzMzNjMCwzLjk1NiAzLjIxMDY3LDcuMTY2NjcgNy4xNjY2Nyw3LjE2NjY3bDE0LjMzMzMzLC0wLjAwNzE3djU3LjM0MDVjMCwzLjk1NiAzLjIxMDY3LDcuMTY2NjcgNy4xNjY2Nyw3LjE2NjY3aDE0LjMzMzMzYzMuOTU2LDAgNy4xNjY2NywtMy4yMTA2NyA3LjE2NjY3LC03LjE2NjY3di01Ny4zNTQ4M2wxNS41ODAzMywtMC4wMDcxN2MzLjY0MDY3LDAgNi43MDA4MywtMi43MzA1IDcuMTE2NSwtNi4zNDk2N2wxLjY0MTE3LC0xNC4zMDQ2N2MwLjQ5NDUsLTQuMjQ5ODMgLTIuODMwODMsLTcuOTgzNjcgLTcuMTE2NSwtNy45ODM2N3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                />
              </a>
              <a>Ingresar Con Facebook</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
