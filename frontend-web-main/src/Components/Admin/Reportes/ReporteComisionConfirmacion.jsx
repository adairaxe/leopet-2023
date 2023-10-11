import React/*, { useState } */from 'react';

export const ReporteComisionConfirmacion = ({
  guardar,
  onClose, 
}) => {
  //A-const [fundation, setFundation] = useState(selectedFundation || {});

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-txt-24 fund-mb-16">
          DESEA GENERAR
        </div>        

        <div className="form-buttons-2option">          
          <button
            className="fund-btn"            
            onClick={() => {
              guardar();
              onClose();
            }}
          >
           Aceptar
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
