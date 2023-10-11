import React from 'react';

import './Especies.scss';

const Especies = ({ selectedSpecie, selectSpecie, species }) => {
  return (
    <div className="fund-don-barra-especies">
      {species?.map((especie, idx) => 
(
        <div
          key={idx}
          className={
            'fund-don-tab fund-txt-14 ' +
            (selectedSpecie == especie ? 'selected' : '')
          }
          onClick={() => 
selectSpecie(especie)}
        >
          {especie}
        </div>
      ))}
    </div>
  );
};

export default Especies;
