import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { CardHistoria } from './CardHistoria';
import { Paginacion } from '../../Shared/Paginacion';

import {
  getDonaciones as get,
  createHistoria as create,
  updateHistoria as update,
  getDineroDisponible,
} from '../../../Service/Donacion';

import './Donaciones.scss';

export const Donaciones = ({ setError, setdataMessage }) => {
  const [isLoading, setLoading] = useState();
  const [q, setQ] = useState();
  const [donaciones, setDonaciones] = useState();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedDonacion, selectDonacion] = useState();
  const [dineroDisponible, setDineroDisponible] = useState(0);

  useEffect(() => {
    getDonaciones(1);
    getDinero();
  }, []);

  useEffect(() => {
    getDonaciones(1);
  }, [q]);

  const getDonaciones = (p) => {
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
        setDonaciones(data.donaciones);
        setTotalRows(data.totalRows);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };

  const getDinero = () => {
    setLoading(true);
    getDineroDisponible({
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then((monto) => {
        setLoading(false);
        setDineroDisponible(monto);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };

  const createEvidencia = (donacion) => {
    setLoading(true);
    create(donacion, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);
        getDonaciones(1);
        setdataMessage({
          title: 'Historia',
          message: 'Historia creada exitosamente',
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const updateEvidencia = (donacion) => {
    setLoading(true);
    update(donacion, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);
        getDonaciones(1);
        setdataMessage({
          title: 'Historia',
          message: 'Historia actualizada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  return (
    <div className="fund-fund-donaciones">
      <div className="fund-title fund-flx fund-txt-32">
      <div className="titulo-vista">
        Donaciones
        </div>
        <span className="fund-txt-16">
          Dinero disponible ${dineroDisponible}
        </span>
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
          <div className="fund-table-row">
            <div className="fund-table-cell fund-txt-12">Donador</div>
            <div className="fund-table-cell fund-txt-12">Animal</div>
            <div className="fund-table-cell fund-txt-12">Monto</div>
            <div className="fund-table-cell fund-txt-12">Fecha</div>
            <div className="fund-table-cell fund-txt-12">Estado</div>
            <div className="fund-table-cell fund-txt-12">Evidencias</div>
          </div>
          {!isLoading &&
            donaciones?.map((donacion, idx) => {
              return (
                <div key={idx} className="fund-table-row">
                  <div className="fund-table-cell fund-txt-14">
                    {donacion.donador}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {donacion.animal}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {donacion.dinero}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {donacion.fecha}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {donacion.status ? 'APROBADO' : 'NO APROBADO'}
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                    <i
                      className={
                        'fas fa-photo-video fund-pointer' +
                        (donacion?.evidencia?.id ? ' primary' : '')
                      }
                      onClick={() => {
                        selectDonacion(donacion);
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
          {!isLoading && donaciones?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay donaciones disponibles
            </div>
          )}
        </div>
      </div>
      {!isLoading && donaciones?.length != 0 && (
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
      {selectedDonacion && (
        <CardHistoria
          onClose={() => {
            selectDonacion();
          }}
          selectedDonacion={selectedDonacion}
          createEvidencia={createEvidencia}
          updateEvidencia={updateEvidencia}
        />
      )}
    </div>
  );
};
