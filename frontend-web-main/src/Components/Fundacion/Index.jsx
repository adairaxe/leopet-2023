import React, { useState } from 'react';

import BarraDeTitulo from './Shared/BarraDeTitulo/BarraDeTitulo';
import { BarraLateral } from './Shared/BarraLateral/BarraLateral';
import { CardMessage } from './../Shared/CardMessage';
import { SECCIONES } from './constantes';

export const Fundacion = () => {
  const [selectedSection, selectSection] = useState(SECCIONES[0]);
  const [dataMessage, setdataMessage] = useState();
  const [error, setError] = useState();
  const Component = selectedSection.component;

  return (
    <div className="fund-admin">
      <BarraDeTitulo />
      <div className="fund-flx fund-full">
        <BarraLateral
          selectedSection={selectedSection}
          selectSection={selectSection}
        />
        {!error && (
          <Component setError={setError} setdataMessage={setdataMessage} 
          selectSection={selectSection}/>
        )}
        {(dataMessage || error) && (
          <CardMessage
            message={error ? error : dataMessage.message}
            title={error ? 'Error' : dataMessage.title}
            onClose={() => {
              setdataMessage();
              setError();
            }}
          />
        )}
      </div>
    </div>
  );
};
