import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
 
import { Paginacion } from '../../Shared/Paginacion';
import { CuentaCreate } from './CuentaCreate';
import { CuentaDelete } from './CuentaDelete'; 


import {
  getCuentas as get, 
  createCuentaBancaria,
  updateCuentaBancaria, 
  updateCuentaPrincipal, 
  deleteCuentaBancaria, 
} from '../../../Service/Cuentas';

import './Cuenta.scss';

export const Cuenta = ({ setdataMessage, setError }) => {
  const [isLoading, setLoading] = useState();
  const [q, setQ] = useState();
  const [cuentas, setCuentas] = useState();  
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);  
  const [selectedCuenta, selectCuenta] = useState();
  const [isCreatingCuenta, setCreatingCuenta] = useState();
  const [isEditingCuenta, setEditingCuenta] = useState();
  const [isDeletingCuenta, setDeletingCuenta] = useState(); 
 
  useEffect(() => {
    setQ('');
    getCuentas(1);
    
  }, []);

  useEffect(() => {
    getCuentas(1);
  }, [q]);

  const getCuentas = (p) => {
    setPage(p);
    setLoading(true);
    get(
      {
        q,
        page: p,
      },
      {        
        fundacionId: window?.userSigned?.fundacionId,
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,        
      }
    )
      .then((data) => {
        setLoading(false);
        console.log(data.cuentas);
        setCuentas(data.cuentas);
        setTotalRows(data.totalRows);
            
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
        setdataMessage({
          title: 'error',
          message: 'errr',
        });
      });
  };

  const updatePrincipal = (cuenta) => {
    setLoading(true);
    updateCuentaPrincipal(cuenta, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getCuentas(1);
        setLoading(false);
        setdataMessage({
          title: 'Actualizacion',
          message: 'Actualizacion de cuenta exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };  

  const createCuenta = (cuenta) => {    
    cuenta.fundacionId=window?.userSigned?.fundacionId; 
    if (cuenta.tipo=='' || cuenta.tipo==null) cuenta.tipo='AHORROS';
    setLoading(true);
    createCuentaBancaria(cuenta, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);  
        getCuentas(1);
        setdataMessage({
          title: 'Cuenta',
          message: 'Cuenta Creada exitoso',
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const updateCuenta = (cuenta) => {
    setLoading(true);
    updateCuentaBancaria(cuenta, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getCuentas(1);
        setLoading(false);
        setdataMessage({
          title: 'Actualizacion',
          message: 'Actualizacion de Cuenta editada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };  

  const deleteCuenta = (cuenta) => {
    setLoading(true);

    deleteCuentaBancaria(cuenta, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getCuentas(1);
        setLoading(false);
        setdataMessage({
          title: 'Cuentas',
          message: 'Cuentas eliminada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

   return (
    <div className="cuen-cuen-animals">
      <div className="cuen-title fund-flx fund-txt-32">
      <div className="titulo-vista">
        Cuentas
      </div>
        <button
          className="fund-btn"
          onClick={() => {
            setCreatingCuenta(true);
          }}
        >
          Nuevo
        </button>
        </div>
      <div className="cuen-table-content fund-shadow-1">
        <div className="cuen-table fund-shadow-1">
          <div className="cuen-table-row-header">
            <div className="cuen-table-cell txt-12-white">ID</div>             
            <div className="cuen-table-cell txt-12-white">BANCO</div>
            <div className="cuen-table-cell txt-12-white">NUMERO</div>
            <div className="cuen-table-cell txt-12-white">TIPO</div>
            <div className="cuen-table-cell txt-12-white">TITULAR DE LA CUENTA</div>
            <div className="cuen-table-cell txt-12-white">PRINCIPAL</div>            
            <div className="cuen-table-cell txt-12-white">ACCIONES</div>
          </div>
          {!isLoading && cuentas?.map((cuenta, idx) => {            
              return (
                <div key={idx} className="cuen-table-row">
                  <div className="cuen-table-cell fund-txt-14">
                    {cuenta.id}
                  </div>                  
                  <div className="cuen-table-cell fund-txt-14">
                    {cuenta.banco}
                  </div>
                  <div className="cuen-table-cell fund-txt-14">
                    {cuenta.numero}
                  </div>
                  <div className="cuen-table-cell fund-txt-14">
                    {cuenta.tipo}
                  </div>
                  <div className="cuen-table-cell fund-txt-14">
                    {cuenta.nombre}
                  </div>
                  <div className="cuen-table-cell fund-txt-14">
                  {cuenta.principal ? (
                      <i
                        className="fas fa-toggle-on primary fund-mr-8 fund-pointer"                        
                      />
                    ) : (
                      <i
                        className="fad fa-toggle-off fund-mr-8 fund-pointer"
                        onClick={() => {
                          updatePrincipal(cuenta);
                        }}
                      />
                    )}
                  </div>
                  <div className="cuen-table-cell fund-flx-c">
                   
                    <i
                      className="fas fa-edit fund-mr-8 fund-pointer"
                      onClick={() => {
                        setEditingCuenta(true);                        
                        selectCuenta(cuenta); 
                      }}
                    />
                    <i
                      className="fas fa-trash fund-mr-8 fund-pointer"
                      onClick={() => {
                        setDeletingCuenta(true);                        
                        selectCuenta(cuenta);
                      }}
                    />
                  </div>
                </div>
              );
            })}
          {isLoading && (
            <div className="fund-loading">
              <i className="fad fa-spinner fund-spin" />
            </div>
          )}
          {!isLoading && cuentas?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay cuentas disponibles
            </div>
          )}
        </div>
      </div>
      {!isLoading && cuentas?.length != 0 && (
        <Paginacion
          data={{
            totalRows: totalRows,
            rowsPerPage: 15,
            selectedPage: page,
          }}
          load={({ page: p }) => 
                getCuentas(p)}
        />
      )} 

    {(isEditingCuenta || isCreatingCuenta) && (
        <CuentaCreate
          onClose={() => {
            setEditingCuenta();
            setCreatingCuenta();
            selectCuenta();
          }}          
          selectedCuenta={selectedCuenta}
          createCuenta={createCuenta}
          updateCuenta={updateCuenta}
          setError={setError}
        />
      )}
       {isDeletingCuenta  && (
        <CuentaDelete
          onClose={() => {
            setDeletingCuenta();
            selectCuenta();
          }}          
          selectedCuenta={selectedCuenta} 
          deleteCuenta={deleteCuenta}
        />
        )}
    </div>
  );
};
