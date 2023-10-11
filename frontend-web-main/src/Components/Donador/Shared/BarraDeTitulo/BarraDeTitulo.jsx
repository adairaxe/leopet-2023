import React from 'react';

import './BarraDeTitulo.scss';
//Import leopet from './../../../../Assets/Img/leopet.png';

const BarraDeTitulo = ({ selectedSection, q, setQ }) => {
  return (
  
    
    <div className="fund-don-barra-titulo">   
     {/* <img src={leopet} />  */}
      {selectedSection?.isVisibleSearch && (
        <div className="fund-form-field">
          <input
            value={q || ''}
            onChange={(e) => {
              setQ(e.target.value);
            }}
          />
          {!q ? (
            <i className="fas fa-search" />
          ) : (
            <i className="fas fa-times-circle" onClick={() => 
setQ()} />
          )}
        </div>
      )}
    </div>
    
  );
};

export default BarraDeTitulo;
