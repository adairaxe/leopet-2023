import React from 'react';


import './CardCuentas.scss';

export const CardCuentaPrincipal = ({  
  selectedCuenta,
  onClose,  
}) => {  


  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card card-cuentas">
        <div className="fund-txt-24 fund-mb-16">Cuenta</div>
        <div className="fund-form-field">
          <span className="fund-txt-12 titulo-negrita">Banco</span>
          <input
            value= {selectedCuenta.banco}
            type="text"           
            disabled
          />
         
        </div>
        <div className="fund-form-field ">
          <span className="fund-txt-12 titulo-negrita">Número de cuenta</span>
          <input
            value=  {selectedCuenta.numero}
            type="text"           
            disabled
          />
         
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12 titulo-negrita">Nombre del titular</span>
          
          <input
            value=  {selectedCuenta.nombre}
            type="text"           
            disabled
          />
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12 titulo-negrita">Tipo de cuenta</span>
         
          <input
            value=   {selectedCuenta.tipo}
            type="text"           
            disabled
          />
        </div>
        <div className="form-buttons-2option">
        <div className='form-buttons-2option-cancelar'>
          <button className="fund-btn" onClick={() => 
onClose()}>
            Salir
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
