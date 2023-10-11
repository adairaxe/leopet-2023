import { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Logo from '../../../../../src/Assets/Img/leopetLogo.png';
import { NotificacionModal } from '../Notificacion/NotificacionModal';

import { SECCIONES } from './../../constantes';
import './BarraInferior.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const BarraInferior = ({
  selectedSection,
  selectSection,
  reiniciar,
  isSelectManada,
  totalNotificacionesNoleidas,
  notificaciones,
  selectNotificacion,
  loadNotificaciones,
  updateNotificacion,
}) => {
  const [isShowNotificacion, setShowNotificacion] = useState(false);

  return (
    <div className="fun-don-barra-nav">
      <div className="column">
        <Container className="navbar-logo">
          <Link to="/home">
            <img
              src={Logo}
              width="100"
              height="55"
              className="d-inline-block align-top navbar-img rounded-full"
              alt="Leopet"
            />
          </Link>
        </Container>
      </div>

      <div className="barra-items">
        {SECCIONES.map((section, idx) => {
          if (section.oculto) {
            return;
          }
          return (
            <div
              key={idx}
              className={
                'fun-don-barra-items ' +
                //'fund-don-barra-item fund-txt-12 fund-pointer ' +
                (selectedSection.id == section.id ? 'selected' : '')
              }
              onClick={() => {
                if (section.id == 1) {
                  isSelectManada(true);
                } else {
                  isSelectManada(false);
                }
                reiniciar();
                selectSection(section);
              }}
            >
              <i />
              {section.nombre}
            </div>
          );
        })}
      </div>
      <div className="fund-don-bell">
        {totalNotificacionesNoleidas > 0 ? (
          <i
            className="fas fa-bell fund-mr-8 fund-pointer "
            data-count={totalNotificacionesNoleidas}
            onClick={() => {
              //A--selectSection(SECCIONES[7]);
              setShowNotificacion(!isShowNotificacion);
              //A-//selectSection(SECCIONES[8]);
            }}
          />
        ) : (
          <i
            className="fas fa-bell fund-mr-8 fund-pointer "
            onClick={() => {
              //A--selectSection(SECCIONES[7]);
              setShowNotificacion(!isShowNotificacion);
              //A-//selectSection(SECCIONES[8]);
            }}
          />
        )}
      </div>

      <Link to="home">
        <button className="bg-primary px-8 py-2 rounded-lg mx-8 text-white font-bold">
          Salir
        </button>
      </Link>

      {isShowNotificacion && (
        <NotificacionModal
          setShowNotificacion={setShowNotificacion}
          notificaciones={notificaciones}
          selectSection={selectSection}
          selectNotificacion={selectNotificacion}
          loadNotificaciones={loadNotificaciones}
          updateNotificacion={updateNotificacion}
        />
      )}
    </div>
  );
};

export default BarraInferior;
