import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { UpdateCreate } from './UpdateCreate';
import { UpdateDelete } from './UpdateDelete'; 
import { Paginacion } from '../../Shared/Paginacion';

import {
  getActualizacion as get,
  updateActualizacion as update,
  deleteActualizacion as deleteA,
} from '../../../Service/Actualizacion';

import './Update.scss';

export const Update = ({ setdataMessage, setError }) => {
  const [isLoading, setLoading] = useState();
  const [busqueda, setBusqueda] = useState();
  const [actualizaciones, setActualizaciones] = useState();
  const [actualizacionesAll, setActualizacionesAll] = useState();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedAnimal, selectAnimal] = useState();
  const [selectedActualizacion, selectActualizacion] = useState();
  const [isEditingActualizacion, setEditingActualizacion] = useState();
  const [isDeletingActualizacion, setDeletingActualizacion] = useState(); 
 
  useEffect(() => {    
    getActualizacion(1);
    
  }, []);

  useEffect(() => {
    getActualizacion(1);
  }, []);

  const getActualizacion = (p) => {
    setPage(p);
    setLoading(true);
    get(
      {
        q: '',
        page: p,
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
        fundacionId: window?.userSigned?.fundacionId,
      }
    )
      .then((data) => {
        setLoading(false);
        setActualizaciones(data.actualizaciones);
        setActualizacionesAll(data.actualizaciones);
        setTotalRows(data.totalRows);
        console.log(data.actualizaciones);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };

  const updateActualizacion = (actualizacion) => {
    setLoading(true);
    update(actualizacion, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getActualizacion(1);
        setLoading(false);
        setdataMessage({
          title: 'Actualizacion',
          message: 'Actualizacion de Animal editada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };  

  const deleteActualizacion = (actualizacion) => {
    setLoading(true);

    deleteA(actualizacion, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getActualizacion(1);
        setLoading(false);
        setdataMessage({
          title: 'Actualizacion',
          message: 'Actualizacion eliminada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const filtro = (buscar) => {
    const filtrados= actualizacionesAll.filter(actualizacion => 
      actualizacion.animal.nombre.
      toUpperCase().includes(buscar.toUpperCase()));   
    setActualizaciones(filtrados);
    setTotalRows(filtrados.length);
  };

   return (
    <div className="fund-fund-animals">
       <div className="fund-title fund-flx fund-txt-32">
        <div className="titulo-vista">
          Actualizaciones        
        </div>
      </div>
      <div className="fund-form-field">
        <span className="fund-txt-12">Buscar</span>
        <input
          value={busqueda || ''}
          type="text"
          maxLength={50}
          onChange={(e) => {
            setBusqueda(e.target.value);
            filtro(e.target.value);
          }}
        />
      </div>
      <div className="fund-table-content fund-shadow-1">
        <div className="fund-table fund-shadow-1">
          <div className="fund-table-row-header">
            <div className="fund-table-cell txt-12-white">ID</div>
            <div className="fund-table-cell txt-12-white">ANIMAL</div>
            <div className="fund-table-cell txt-12-white">FECHA</div>
            <div className="fund-table-cell txt-12-white">ESTADO DE SALUD</div>
            <div className="fund-table-cell txt-12-white">DESCRIPCIÓN</div>
            <div className="fund-table-cell txt-12-white">ACCIONES</div>
          </div>
          {!isLoading &&
            actualizaciones?.map((actualizacion, idx) => {
              return (
                <div key={idx} className="fund-table-row">
                  <div className="fund-table-cell fund-txt-14">{actualizacion.id}</div>
                  <div className="fund-table-cell fund-txt-14">
                    {actualizacion.animal.nombre}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {actualizacion.fecha}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {actualizacion.estado_salud}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {actualizacion.descripcion}
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                   
                    <i
                      className="fas fa-edit fund-mr-8 fund-pointer"
                      onClick={() => {
                        setEditingActualizacion(true);
                        selectAnimal(actualizacion.animal);
                        selectActualizacion(actualizacion); 
                      }}
                    />
                    <i
                      className="fas fa-trash fund-mr-8 fund-pointer"
                      onClick={() => {
                        setDeletingActualizacion(true);
                        selectAnimal(actualizacion.animal);
                        selectActualizacion(actualizacion);
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
          {!isLoading && actualizaciones?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay actualizaciones disponibles
            </div>
          )}
        </div>
      </div>
      {!isLoading && actualizaciones?.length != 0 && (
        <Paginacion
          data={{
            totalRows: totalRows,
            rowsPerPage: 15,
            selectedPage: page,
          }}
          load={({ page: p }) => 
                getActualizacion(p)}
        />
      )}
       {(isEditingActualizacion) && (
        <UpdateCreate
          onClose={() => {
            setEditingActualizacion();            
            selectActualizacion();
          }}
          selectedAnimal={selectedAnimal}
          selectedActualizacion={selectedActualizacion}          
          updateActualizacion={updateActualizacion}
          setError={setError}
        />
      )}
       {isDeletingActualizacion  && (
        <UpdateDelete
          onClose={() => {
            setDeletingActualizacion();
            selectActualizacion();
          }}
          selectedAnimal={selectedAnimal}
          selectedActualizacion={selectedActualizacion} 
          deleteActualizacion={deleteActualizacion}
        />
      )} 
    </div>
  );
};
