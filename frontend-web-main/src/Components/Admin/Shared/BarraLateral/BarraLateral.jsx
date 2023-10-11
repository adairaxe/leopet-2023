import React from 'react';

import { SECCIONES } from '../../constantes';
import './BarraLateral.scss';

export const BarraLateral = ({ selectedSection, selectSection }) => {
  return (
    <div className="fund-admin-barra-lateral">
      <div className="fund-admin-barra-lateral-icons">
        {SECCIONES.map((section, idx) => {
          if (section.oculto) {
            return;
          }
          return (
            <div
              key={idx}
              className={
                'fund-admin-barra-item fund-txt-12 fund-mb-32 fund-pointer ' +
                (selectedSection.id == section.id ? 'selected' : '')
              }
              onClick={() => {
                selectSection(section);
              }}
            >
              <i className={section.className} />
              {section.nombre}
            </div>
          );
        })}
      </div>
      <div className="fund-admin-barra-item fund-txt-12 fund-mb-32 fund-pointer">
        <i
          className="fas fa-sign-out-alt"
          onClick={() => {
            window.location.replace('/logout');
          }}
        />
        Salir
      </div>
    </div>
  );
};
