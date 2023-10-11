import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  getFundaciones as get,
} from '../../../Service/Fundaciones';
import { Password } from '../../Shared/Password';


import { Paginacion } from '../../Shared/Paginacion';

import './Notificaciones.scss';

export const Notificaciones = ({ setdataMessage, setError }) => {
  const [q, setQ] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [fundaciones, setFundaciones] = useState([]);
  const [selectedFundation, selectFundation] = useState();
  const [cambiarContrasenia, setCambiarContrasenia] = useState();

  useEffect(() => {
    getFundaciones(1);
  }, []);

  useEffect(() => {
    getFundaciones(1);
  }, [q]);

  const getFundaciones = (p) => {
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
        setFundaciones(data.fundaciones);
        setTotalRows(data.totalRows);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  return (
    <div className="fund-admin-fundaciones">
      <div className="fund-title fund-flx fund-txt-32">
        Notificaciones
        <button
          className="fund-btn"
          onClick={() => {
            setCreatingFundation(true);
          }}
        >
          Nuevo
        </button>
      </div>
      <div className="fund-form-field">
        <span className="fund-txt-12">Buscar</span>
        <input
          value={q || ''}
          onChange={(e) => {
            setQ(e.target.value);
          }}
        />
      </div>
      <div className="fund-table-content fund-shadow-1">
        <div className="fund-table fund-shadow-1">
          <div className="fund-table-row-header">
            <div className="fund-table-cell fund-txt-12">Id</div>
            <div className="fund-table-cell fund-txt-12">Fecha</div>
            <div className="fund-table-cell fund-txt-12">Descripción</div>
            <div className="fund-table-cell fund-txt-12">Estado de salud</div>
            <div className="fund-table-cell fund-txt-12">Imágen</div>
            <div className="fund-table-cell fund-txt-12">Calificación</div>
            <div className="fund-table-cell fund-txt-12">Animal</div>
            <div className="fund-table-cell fund-txt-12">Acciones</div>
          </div>
          {isLoading && (
            <div className="fund-loading">
              <i className="fad fa-spinner fund-spin" />
            </div>
          )}
          {!isLoading && fundaciones?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay fundaciones disponibles
            </div>
          )}
          {!isLoading &&
            fundaciones?.map((fundacion, idx) => {
              return (
                <div key={idx} className="fund-table-row">
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.id}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {moment(fundacion.createdAt).format('DD/MM/YYYY')}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.nombre}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.direccion}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                  <img src={require('../../../Assets/Img/huella.png').default} />
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.telefono}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {moment(fundacion.createdAt).format('DD/MM/YYYY')}
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                    <i
                      className="fas fa-money-check fund-pointer"
                      onClick={() => {
                        setEditingCuentas(true);
                        selectFundation(fundacion);
                      }}
                    />
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                    <i
                      className="fas fa-edit fund-mr-8 fund-pointer"
                      onClick={() => {
                        setEditingFundation(true);
                        selectFundation(fundacion);
                      }}
                    />
                    <i
                      className={
                        'fas fund-mr-8' +
                        (fundacion?.user?.id
                          ? ' fas fa-user-edit'
                          : ' fa-user-plus')
                      }
                      onClick={() => {
                        setAddingUser(true);
                        selectFundation(fundacion);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {!isLoading && fundaciones?.length != 0 && (
        <Paginacion
          data={{
            totalRows: totalRows,
            rowsPerPage: 15,
            selectedPage: page,
          }}
          load={({ page: p }) =>
getFundaciones(p)}
        />
      )}
      {cambiarContrasenia && selectedFundation && (
        <Password
          onClose={() => {
            setCambiarContrasenia();
          }}
          id={selectedFundation.user.id}
          setError={setError}
          setdataMessage={setdataMessage}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};
