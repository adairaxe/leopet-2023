import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { getReport } from '../../../Service/Fundaciones';

import './Reportes.scss';

export const Reportes = ({ setError }) => {
  const [isLoading, setLoading] = useState();
  const [mes, setMes] = useState(new Date());
  const [pagos, setPagos] = useState();

  useEffect(() => {
    getPagos();
  }, []);

  useEffect(() => {
    getPagos();
  }, [mes]);

  const getPagos = () => {
    setLoading(true);
    getReport(
      {
        fecha: moment(mes).format('YYYY/MM'),
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
      }
    )
      .then((data) => {
        setLoading(false);
        setPagos(data.pagos);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  return (
    <div className="fund-admin-fundaciones">
      <div className="fund-title fund-flx fund-txt-32">
        Reporte mensual de transferencias
      </div>
      <div className="fund-form-field">
        <span className="fund-txt-12">Mes</span>
        <DatePicker
          selected={mes}
          onChange={(date) =>
setMes(date)}
          dateFormat="MMMM-yyyy"
          showMonthYearPicker
          locale="pt-BR"
        />
      </div>
      <div className="fund-table-content fund-shadow-1">
        <div className="fund-table fund-shadow-1">
          <div className="fund-table-row-header">
            <div className="fund-table-cell txt-12-white">RUC</div>
            <div className="fund-table-cell txt-12-white">Fundación</div>
            <div className="fund-table-cell txt-12-white">Monto</div>
          </div>
          {!isLoading &&
            pagos?.map((pago, idx) => {
              return (
                <div key={idx} className="fund-table-row">
                  <div className="fund-table-cell fund-txt-14">{pago.ruc}</div>
                  <div className="fund-table-cell fund-txt-14">
                    {pago.nombre}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {pago.monto}
                  </div>
                </div>
              );
            })}
          {isLoading && (
            <div className="fund-loading">
              <i className="fad fa-spinner fund-spin" />
            </div>
          )}
          {!isLoading && pagos?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay pagos disponibles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
