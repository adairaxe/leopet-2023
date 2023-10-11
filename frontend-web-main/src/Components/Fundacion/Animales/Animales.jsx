import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { CardCreate } from './CardCreate';
import { UpdateCreate } from './UpdateCreate';
import { CardDelete } from './CardDelete';
import { Paginacion } from '../../Shared/Paginacion';

import {
  getAnimalsByFundation as get,
  createAnimal as create,
  updateAnimal as update,
  deleteAnimal as deleteA,
} from '../../../Service/Aminal';

import {
  createActualizacion as createActualizacionService,
} from '../../../Service/Actualizacion';

import './Animales.scss';

export const Animales = ({ setdataMessage, setError }) => {
  const [isLoading, setLoading] = useState();
  const [q, setQ] = useState();
  const [animales, setAnimales] = useState();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedAnimal, selectAnimal] = useState();
  const [isEditingAnimal, setEditingAnimal] = useState();
  const [isDeletingAnimal, setDeletingAnimal] = useState();
  const [isCreatingAnimal, setCreatingAnimal] = useState();
  const [isCreatingUpdate, setCreatingUpdate] = useState();

  useEffect(() => {
    getAnimal(1);
  }, []);

  useEffect(() => {
    getAnimal(1);
  }, [q]);

  const createAnimal = (animal) => {
    setLoading(true);
    create(animal, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);
        getAnimal(1);
        setdataMessage({
          title: 'Animal',
          message: 'Animal creada exitosamente',
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const deleteAnimal = (animal) => {
    setLoading(true);

    deleteA(animal, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getAnimal(1);
        setLoading(false);
        setdataMessage({
          title: 'Animal',
          message: 'Animal eliminada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const updateAnimal = (animal) => {    
    setLoading(true);
    update(animal, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getAnimal(1);
        setLoading(false);
        setdataMessage({
          title: 'Animal',
          message: 'Animal actualizada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const getAnimal = (p) => {
    setPage(p);
    setLoading(true);
    get(
      {
        q,
        page: p,
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
      }
    )
      .then((data) => {
        setLoading(false);
        setAnimales(data.animals);
        setTotalRows(data.totalRows);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };


  const createActualizacion = (actualizacion) => {    
    actualizacion.animal_id=selectedAnimal.id;
    actualizacion.fundacion_id=window?.userSigned?.fundacionId;
    let date = new Date();
    actualizacion.fecha=date;
    /* Date let output = String(date.getDate()).padStart(2, '0') 
    + '/' + String(date.getMonth() + 1).padStart(2, '0') + 
    '/' + date.getFullYear(); */
    setLoading(true);
    createActualizacionService(actualizacion, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);       
        setdataMessage({
          title: 'Animal',
          message: 'Actualizacion de '+selectedAnimal.nombre+' Creado exitoso',
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  return (
    <div className="fund-fund-animals">
      <div className="fund-title fund-flx fund-txt-32">
        <div className="titulo-vista">
        Animales
        </div>
        <button
          className="fund-btn"
          onClick={() => {
            setCreatingAnimal(true);
          }}
        >
          Nuevo
        </button>
      </div>
      <div className="fund-form-field">
        <span className="fund-txt-12">Buscar</span>
        <input
          value={q || ''}
          type="text"
          maxLength={50}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
      </div>
      <div className="fund-table-content fund-shadow-1">
        <div className="fund-table fund-shadow-1">
          <div className="fund-table-row-header">
            <div className="fund-table-cell txt-12-white">ID</div>
            <div className="fund-table-cell txt-12-white">NOMBRE</div>
            <div className="fund-table-cell txt-12-white">ESPECIE</div>
            <div className="fund-table-cell txt-12-white">RAZA</div>
            <div className="fund-table-cell txt-12-white">DESCRIPCIÓN</div>
            <div className="fund-table-cell txt-12-white">ACCIONES</div>
          </div>
          {!isLoading &&
            animales?.map((animal, idx) => {
              return (
                <div key={idx} className="fund-table-row">
                  <div className="fund-table-cell fund-txt-14">{animal.id}</div>
                  <div className="fund-table-cell fund-txt-14">
                    {animal.nombre}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {animal.especie}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {animal.raza}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {animal.descripcion}
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                    <i
                      className="fas fa-file-plus fund-mr-8 fund-pointer"
                      onClick={() => {
                        setCreatingUpdate(true);
                        selectAnimal(animal);
                      }}
                    />
                    <i
                      className="fas fa-edit fund-mr-8 fund-pointer"
                      onClick={() => {
                        setEditingAnimal(true);
                        selectAnimal(animal);
                      }}
                    />
                    <i
                      className="fas fa-trash fund-mr-8 fund-pointer"
                      onClick={() => {
                        setDeletingAnimal(true);
                        selectAnimal(animal);
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
          {!isLoading && animales?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay animales disponibles
            </div>
          )}
        </div>
      </div>
      {!isLoading && animales?.length != 0 && (
        <Paginacion
          data={{
            totalRows: totalRows,
            rowsPerPage: 15,
            selectedPage: page,
          }}
          load={({ page: p }) => 
getAnimal(p)}
        />
      )}
      {(isEditingAnimal || isCreatingAnimal) && (
        <CardCreate
          onClose={() => {
            setEditingAnimal();
            setCreatingAnimal();
            selectAnimal();
          }}
          selectedAnimal={selectedAnimal}
          createAnimal={createAnimal}
          updateAnimal={updateAnimal}
          setError={setError}
        />
      )}
        {(isCreatingUpdate) && (
        <UpdateCreate
          onClose={() => {            
            setCreatingUpdate();            
          }}          
          selectedAnimal={selectedAnimal}
          createActualizacion={createActualizacion}
          setError={setError}
        />
      )}
      {isDeletingAnimal && selectedAnimal && (
        <CardDelete
          onClose={() => {
            setDeletingAnimal();
            selectAnimal();
          }}
          selectedAnimal={selectedAnimal}
          deleteAnimal={deleteAnimal}
        />
      )}
    </div>
  );
};
