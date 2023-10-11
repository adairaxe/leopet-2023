import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {
  getFundaciones as get,
  createFundacion as create,
  upadteFundacion as update,
  deleteFundacion as deleteF,
  /*A- createCuenta as createCta,
  upadteCuenta as updateCta, */
} from '../../../Service/Fundaciones';

import {
 getCuentaPrincipal
} from '../../../Service/Cuentas';

import { Password } from '../../Shared/Password';
import { register, updateUser as updateU } from '../../../Service/User';

import { Paginacion } from '../../Shared/Paginacion';
//A-import { CardCuentas } from './CardCuentas';
import { CardCuentaPrincipal } from './CardCuentaPrincipal';
import { CardCreate } from './CardCreate';
import { CardDelete } from './CardDelete';
import { CardAddUser } from './CardAddUser';

import './Fundaciones.scss';
import { SECCIONES } from '../constantes';

export const Fundaciones = ({
    setdataMessage,
    setError,
    selectSection,
    selectedFundation,
    selectFundation }) => {

  const [q, setQ] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [isAddingUser, setAddingUser] = useState();
  const [fundaciones, setFundaciones] = useState([]);
  //A-const [isEditingCuentas, setEditingCuentas] = useState();
  const [isEditingFundation, setEditingFundation] = useState();
  const [isDeletingFundation, setDeletingFundation] = useState();
  const [isCreatingFundation, setCreatingFundation] = useState();
  const [cambiarContrasenia, setCambiarContrasenia] = useState();
  const [isMostrarCuenta, setMostrarCuenta] = useState();
  const [selectedCuenta, selectCuenta] = useState();

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

  const getCuenta = (fundacion) => {
   console.log(fundacion);
    getCuentaPrincipal(
      {
        fundacionId: fundacion.id,
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
      }
    )
      .then((data) => {
        console.log(data);
        selectCuenta(data);
        setMostrarCuenta(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };


  const createFundacion = (fundation) => {
    setLoading(true);
    create(fundation, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);
        getFundaciones(1);
        setdataMessage({
          title: 'Fundación',
          message: 'Fundación creada exitosamente',
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const deleteFundacion = (fundation) => {
    setLoading(true);

    deleteF(fundation, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getFundaciones(1);
        setLoading(false);
        setdataMessage({
          title: 'Fundación',
          message: 'Fundación eliminada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const updateFundacion = (fundation) => {
    setLoading(true);
    update(fundation, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getFundaciones(1);
        setLoading(false);
        setdataMessage({
          title: 'Fundación',
          message: 'Fundación actualizada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  /*A-const createCuenta = (cuenta) => {
    setLoading(true);
    createCta(cuenta, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        setLoading(false);
        getFundaciones(1);
        setEditingCuentas();
        setdataMessage({
          title: 'Cuenta',
          message: 'Cuenta creada exitosamente',
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
    updateCta(cuenta, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getFundaciones(1);
        setLoading(false);
        setEditingCuentas();
        setdataMessage({
          title: 'Cuenta',
          message: 'Cuenta actualizada exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };*/

  const addUser = (user, fundation) => {
    setLoading(true);
    register(
      {
        user,
        fundation,
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
      }
    )
      .then(() => {
        getFundaciones(1);
        setLoading(false);
        setdataMessage({
          title: 'Fundación',
          message: 'Usuario añadido exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  const updateUser = (user) => {
    setLoading(true);
    updateU(user, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        getFundaciones(1);
        setLoading(false);
        setdataMessage({
          title: 'Fundación',
          message: 'Usuario añadido exitosamente',
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };

  return (
    <div className="fund-admin-fundaciones">
      <div className="fund-title fund-flx fund-txt-32">
        Fundaciones
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
            <div className="fund-table-cell txt-12-white">ID</div>
            <div className="fund-table-cell txt-12-white">RUC</div>
            <div className="fund-table-cell txt-12-white">Nombre</div>
            <div className="fund-table-cell txt-12-white">Dirección</div>
            <div className="fund-table-cell txt-12-white">Teléfono</div>
            <div className="fund-table-cell txt-12-white">Creado</div>
            <div className="fund-table-cell txt-12-white">Activo</div>
            <div className="fund-table-cell txt-12-white">Cuenta</div>
            <div className="fund-table-cell txt-12-white">Acciones</div>
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
                    {fundacion.ruc}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.nombre}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.direccion}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {fundacion.telefono}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {moment(fundacion.createdAt).format('DD/MM/YYYY')}
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                    {fundacion.aprobado ? (
                      <i
                        className="fas fa-toggle-on primary fund-mr-8 fund-pointer"
                        onClick={() => {
                          fundacion.aprobado = false;
                          updateFundacion(fundacion);
                        }}
                      />
                    ) : (
                      <i
                        className="fad fa-toggle-off fund-mr-8 fund-pointer"
                        onClick={() => {
                          fundacion.aprobado = true;
                          updateFundacion(fundacion);
                        }}
                      />
                    )}
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                    <i
                      className="fas fa-money-check fund-pointer"
                      onClick={() => {
                        //A-setEditingCuentas(true);
                        getCuenta(fundacion);
                        selectFundation(fundacion);

                      }}
                    />
                  </div>
                  <div className="fund-table-cell fund-flx-c">
                  <i
                      className="fas fa-solid fa-sack-dollar fund-mr-8 fund-pointer"
                      onClick={() => {
                        selectSection(SECCIONES[3]);
                        return selectFundation(fundacion);
                      }}
                    />
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
      {(isEditingFundation || isCreatingFundation) && (
        <CardCreate
          onClose={() => {
            setEditingFundation();
            setCreatingFundation();
            selectFundation();
          }}
          selectedFundation={selectedFundation}
          updatefundation={updateFundacion}
          createfundation={createFundacion}
        />
      )}
     {isMostrarCuenta && (
        <CardCuentaPrincipal
          onClose={() => {
            setMostrarCuenta();
          }}
          selectedCuenta={selectedCuenta}
        />
      )}
      {/* {isEditingCuentas && selectedFundation && (
        <CardCuentas
          onClose={() => {
            setEditingCuentas();
            selectFundation();
          }}
          selectedFundation={selectedFundation}
          updateCuenta={updateCuenta}
          createCuenta={createCuenta}
        />
      )} */}
      {isDeletingFundation && selectedFundation && (
        <CardDelete
          onClose={() => {
            setDeletingFundation();
            selectFundation();
          }}
          selectedFundation={selectedFundation}
          deleteFundacion={deleteFundacion}
        />
      )}
      {isAddingUser && selectedFundation && (
        <CardAddUser
          onClose={() => {
            setAddingUser();
            selectFundation();
          }}
          selectedUser={selectedFundation.user}
          fundation={selectedFundation}
          createUser={addUser}
          updateUser={updateUser}
          setCambiarContrasenia={setCambiarContrasenia}
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
