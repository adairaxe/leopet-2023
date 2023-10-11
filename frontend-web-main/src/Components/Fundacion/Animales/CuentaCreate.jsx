import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './CuentaCreate.scss';

export const CuentaCreate = ({   
  selectedCuenta,
  updateCuenta,
  createCuenta,
  onClose, 
}) => {  
  const [cuenta, setCuenta] = 
  useState(selectedCuenta || {}); 
  
  const isInvalid = () => {
    return (
      !cuenta.banco ||
      !(cuenta.banco.length>2) ||
      !cuenta.numero ||
      !(cuenta.numero.length>2) ||
      !cuenta.tipo ||      
      !cuenta.nombre ||
      !(cuenta.nombre.length>2) 
    );
  };

  const handleSelect = ( e ) => {
    console.log(e);
    setCuenta({
      ...cuenta,
      tipo: e,
    });    
  };
 
  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card fund-create-animal">
        <div className="fund-txt-24 fund-mb-16">
        {selectedCuenta ? 'Editar' : 'Crear'} 
        </div>
                
        <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Banco</span>
          <input
            value={cuenta.banco || ''}
            type="text"
            onChange={(e) => {
              setCuenta({
                ...cuenta,
                banco: e.target.value,
              });
            }}
          />
        </div>

        <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Numero</span>
          <input
            value={cuenta.numero ||''}
            type="number"
            onChange={(e) => {
              setCuenta({
                ...cuenta,
                numero: e.target.value,
              });
            }}
          />
        </div>

        <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Titular de la cuenta</span>
          <input
            value={cuenta.nombre ||''}
            type="text"
            onChange={(e) => {
              setCuenta({
                ...cuenta,
                nombre: e.target.value,
              });
            }}
          />
        </div>

        <div className="fund-form-field titulo-negrita">
         
          <DropdownButton          
          as={ButtonGroup}
          key='Secondary'
          id={'dropdown-variants-Secondary'}
          variant=''
          title='ELIJA EL TIPO DE CUENTA'
          onSelect={handleSelect}            
          >
            <Dropdown.Item eventKey="AHORROS">AHORROS</Dropdown.Item>
            <Dropdown.Item eventKey="CORRIENTE">CORRIENTE</Dropdown.Item>            
          </DropdownButton>
       
      
      <input 
            value={cuenta.tipo ||''}
            type="text"
            disabled            
          />
      <span className="fund-txt-12"></span>
        </div>
              
        <div className="form-buttons-2option">
        <div>
          
          <button
            className="fund-btn" 
            disabled={isInvalid()}          
            onClick={() => {
              if (cuenta.id) {
                updateCuenta(cuenta);
              } else {
                createCuenta(cuenta);
              }
              onClose();              
            }}
          >
         {cuenta.id ? 'Guadar' : 'Crear'}         
          </button>
          </div>
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
