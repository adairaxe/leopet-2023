import React, { useState, useEffect } from 'react';
import BarraDeTitulo from './Shared/BarraDeTitulo/BarraDeTitulo';
import BarraInferior from './Shared/BarraInferior/BarraInferior';
import Apadrinando from './Shared/Apadrinando/Apadrinando';
//Import NavBarDonador from './Shared/Navbars/NavBarDonador';

import Especies from './Shared/Especies/Especies';
import { SECCIONES } from './constantes';
import { getSpecies, getAnimals, getManadas, getAnimalsFundacionApp } from './../../Service/Aminal';
import { getFundaciones2 } from './../../Service/Fundaciones';
import { updateUser } from './../../Service/User';
import {
  apadrinar,
  subscribir,
  createManada,
  cancelSubscripcion,
  updateManada as update,
  deleteManada as deleteM,
  deleteFromManada as deleteFrom,
  approveDonation as approveD,
  deleteAllAnimalManada,
} from './../../Service/Manada';

import { getNotificaciones, 
  updateNotificacion as updateNotificacionService
} from './../../Service/Notificaciones';

import './Index.scss';
import { CardMessage } from './Shared/CardMessage';
import { Subscripcion } from './Shared/Subscripcion';

export const Donador = ({ history }) => {
  const [selectedSection, selectSection] = useState(SECCIONES[0]);
  const [selectedSpecie, selectSpecie] = useState();
  const [animals, setAnimals] = useState();
  const [selectedAnimal, selectAnimal] = useState();
  const [selectedAnimalToHistory, selectAnimalToHistory] = useState();
  const [manadas, setManadas] = useState();
  const [notificaciones, setNotificaciones] = useState();
  const [selectedNotificacion, selectNotificacion] = useState();
  const [totalNotificacionesNoleidas, 
    setTotalNotificacionesNoleidas] = useState();
  
  const [selectedManada, selectManada] = useState();
  const [selectedManadaToAnimals, selectManadaToAnimals] = useState();
  const [q, setQ] = useState();
  const [link, setLink] = useState();
  const [species, setSpecies] = useState([]);
  const [isLoading, setLoading] = useState();
  const [error, setError] = useState();
  const [dataMessage, setdataMessage] = useState();
  const [fundaciones, setFundaciones] = useState();
  const [selectedFundacion, selectFundacion] = useState();
  const [isSelectedManada, isSelectManada] = useState(false);  

  useEffect(() => {
    window.userSigned = JSON.parse(localStorage.session);
    if (selectedSection.id === 0) {
      loadSpecies();
    } else if (selectedSection.id === 1) {
      loadManadas(0, true);
    }
    loadNotificaciones();
  }, []);

  useEffect(() => {
    loadAnimals(0, true);
    loadNotificaciones();
  }, [selectedManadaToAnimals]);

  useEffect(() => {
    if (selectedSection.id === 0 && !selectedManadaToAnimals) {
      loadSpecies();
    } else if (selectedSection.id === 1) {
      loadManadas(0, true);
    }
    loadNotificaciones();
  }, [selectedSection]);

  useEffect(() => {
    loadAnimals(0, true);
    loadNotificaciones();
  }, [selectedSpecie, species]);

  useEffect(() => {
    if (q?.length > 3 || q?.length === 0 || !q) {
      if (selectedSection.id === 0) {
        loadSpecies();
      } else if (selectedSection.id === 1) {
        loadManadas(0, true);
      }
    }
    loadNotificaciones();
  }, [q]);

  useEffect(() => {
    loadFundaciones(0, true);    
    loadNotificaciones();
  }, []);

  const reiniciar = () => {
    selectManada();
    selectAnimal();
    selectManadaToAnimals();
    selectAnimalToHistory();
    selectNotificacion();
  };

  const loadSpecies = () => {
    setLoading(true);
    return getSpecies({
      apiUrl: window.userSigned.apiUrl,
      token: window.userSigned.token,
    })
      .then((sps) => {
        setSpecies(sps);
        selectSpecie(sps?.length ? sps[0] : undefined);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const loadAnimals = (page, reset, cb) => {
    if (reset) {
      setLoading(true);
    }
    return getAnimals(
      {
        q,
        page,
        limit: 20,
        selectedSpecie,
        manada: selectedManadaToAnimals?.id,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then((data) => {
        setAnimals(reset ? data : [...animals, ...data]);
        if (reset) {
          setLoading(false);
        }
        if (cb) {
          cb(data.length != 0);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const loadAnimalsFundacion = (id_fundacion, page, reset, cb) => {    
    if (reset) {
      setLoading(true);
    }
    return getAnimalsFundacionApp(
      {
        q,
        page,
        limit: 20,
        id_fundacion: id_fundacion,  
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then((data) => {
        setAnimals(reset ? data : [...animals, ...data]);
        if (reset) {
          setLoading(false);
        }
        if (cb) {
          cb(data.length != 0);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const loadManadas = (page, reset, cb) => {
    if (reset) {
      setLoading(true);
    }
    return getManadas(
      {
        q,
        page,
        limit: 20,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then((data) => {
        setManadas(reset ? data : [...manadas, ...data]);
        if (reset) {
          setLoading(false);
        }
        if (cb) {
          cb(data.length != 0);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };


  const loadFundaciones = (page, reset, cb) => {       
    if (reset) {
      setLoading(true);
    }
    return getFundaciones2(
      {
        q,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then((data) => {
        setFundaciones(reset ? data : [...fundaciones, ...data]);
        if (reset) {
          setLoading(false);
        }
        if (cb) {
          cb(data.length != 0);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const createNewManada = (manada) => {
    setLoading(true);
    return createManada(manada, {
      apiUrl: window.userSigned.apiUrl,
      token: window.userSigned.token,
    })
      .then(() => {
        setLoading(false);
        loadManadas(0, true);
        setdataMessage({
          title: 'Manada',
          message: 'Manada creada exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const updateManada = (manada) => {
    setLoading(true);
    return update(manada, {
      apiUrl: window.userSigned.apiUrl,
      token: window.userSigned.token,
    })
      .then(() => {
        setLoading(false);
        selectManadaToAnimals();
        selectSection(SECCIONES[1]);
        loadManadas(0, true);
        setdataMessage({
          title: 'Manada',
          message: 'Manada actualizada exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const deleteManada = (manada) => {
    setLoading(true);
    return deleteM(manada, {
      apiUrl: window.userSigned.apiUrl,
      token: window.userSigned.token,
    })
      .then(() => {
        setLoading(false);
        selectSection(SECCIONES[1]);
        loadManadas(0, true);
        selectManadaToAnimals();
        setdataMessage({
          title: 'Manada',
          message: 'Manada eliminada exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  
  const deleteManada2 = (manada) => {
    setLoading(true);
    return deleteAllAnimalManada(manada, {
      apiUrl: window.userSigned.apiUrl,
      token: window.userSigned.token,
    })
      .then(() => {
        setLoading(false);
        selectSection(SECCIONES[1]);
        loadManadas(0, true);
        selectManadaToAnimals();
        setdataMessage({
          title: 'Manada',
          message: 'Manada eliminada exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const deleteFromManada = (animalId, manadaId) => {
    setLoading(true);
    return deleteFrom(
      {
        animalId,
        manadaId,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then(() => {
        setLoading(false);
        reiniciar();
        selectSection(SECCIONES[1]);
        loadManadas(0, true);
        setdataMessage({
          title: 'Manada',
          message: 'Animal removido exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const approveDonation = (donationId, approved) => {
    setLoading(true);
    return approveD(
      {
        donationId,
        approved,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then(() => {
        setLoading(false);
        selectSection(SECCIONES[1]);
        loadManadas(0, true);
        selectManadaToAnimals();
        setdataMessage({
          title: 'Apadrinado',
          message: approved
            ? 'Donación aprobada exitosamente'
            : 'Donación desaprobada exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const editUser = (user) => {
    setLoading(true);
    return updateUser(user, {
      apiUrl: window.userSigned.apiUrl,
      token: window.userSigned.token,
    })
      .then(() => {
        setLoading(false);
        console.log('user:', user);
        localStorage.setItem('session', JSON.stringify(user));
        window.userSigned = user;
        setdataMessage({
          title: 'Usuario',
          message: 'Usuario actualizado exitosamente',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const logout = () => {
    history.push('/logout');
  };

  const addManada = (manadaId) => {
    setLoading(true);
    return apadrinar(
      {
        manadaId,
        animalId: selectedAnimal.id,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then(() => {
        setLoading(false);
        selectAnimal();
        selectSection(SECCIONES[0]);
        loadManadas(0, true);
        setdataMessage({
          title: 'Apadrinar',
          message: 'Se ha añadido correctamente a la manada',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const createSubscription = (manadaId) => {
    setLoading(true);
    return subscribir(
      {
        manadaId,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then((l) => {
        setLoading(false);
        setLink(l);
        console.log('link', link);
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const cancel = (manadaId) => {
    setLoading(true);
    return cancelSubscripcion(
      {
        manadaId,
      },
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then(() => {
        setLoading(false);
        selectManadaToAnimals();
        selectSection(SECCIONES[1]);
        loadManadas(0, true);
        setdataMessage({
          title: 'Manada',
          message: 'Se ha desactivado correctamente la manada',
        });
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const loadNotificaciones = ( ) => {   
    return getNotificaciones(      
      {
        apiUrl: window.userSigned.apiUrl,
        token: window.userSigned.token,
      }
    )
      .then((data) => {
        setNotificaciones(data.notificaciones); 
        const result =data.notificaciones.filter( notificacion => 
          notificacion.leido==false
          );
          console.log(notificaciones);          
          setTotalNotificacionesNoleidas(result.length);          
      })
      .catch((err) => {
        console.log(err);
        setError(err?.message || 'Server Error');
        setLoading(false);
      });
  };

  const updateNotificacion = (actualizacion) => {      
    updateNotificacionService(actualizacion, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then(() => {
        loadNotificaciones();
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || 'Error del servidor');
      });
  };  


  let Component = selectedSection.component;
  let isVisibleSpecies =
    selectedSection.isVisibleSpecies &&
    !selectedAnimal &&
    !selectedManadaToAnimals;

  return (
    <>
      {<BarraInferior
          selectedSection={selectedSection}
          selectSection={selectSection}
          reiniciar={reiniciar}
          isSelectManada={isSelectManada}          
          totalNotificacionesNoleidas={totalNotificacionesNoleidas}
          notificaciones={notificaciones}          
          selectNotificacion= {selectNotificacion}
          loadNotificaciones= {loadNotificaciones}
          updateNotificacion={updateNotificacion}
        />}       
       
       
      <div className="fund-donador">
      {isVisibleSpecies &&(
       <div className="barra-titulo-especie">
       
          {isVisibleSpecies && (
            <Especies
              selectedSpecie={selectedSpecie}
              selectSpecie={selectSpecie}
              species={species}
            />
          )}
           <BarraDeTitulo selectedSection={selectedSection} q={q} setQ={setQ} />

       </div>
        )}
        {!!selectedAnimal && (
          <Apadrinando
            selectedAnimal={selectedAnimal}
            selectAnimal={selectAnimal}
          />
        )}
        {isLoading && (
          <div className="fund-loading">
            <i className="fad fa-spinner fund-spin" />
          </div>
        )}
        {error && (
          <div className="fund-error fund-txt-12 fund-flx">
            <i className="fas fa-exclamation-triangle" />
            {error}
            <button
              className="fund-btn fund-mt-16"
              onClick={() => 
window.location.replace('')}
            >
              Recargar
            </button>
          </div>
        )}
         
        {!isLoading && !error && (
          <Component
            q={q}
            logout={logout}
            animals={animals}
            manadas={manadas}
            fundaciones={fundaciones}
            notificaciones={notificaciones}
            editUser={editUser}
            addManada={addManada}
            loadAnimals={loadAnimals}
            loadManadas={loadManadas}
            loadFundaciones={loadFundaciones}
            loadNotificaciones={loadNotificaciones}
            deleteManada={deleteManada}
            deleteManada2={deleteManada2}
            updateManada={updateManada}
            selectAnimal={selectAnimal}
            selectFundacion={selectFundacion}
            selectedFundacion={selectedFundacion}
            selectManada={selectManada}            
            selectSection={selectSection}
            selectedNotificacion={selectedNotificacion}
            selectNotificacion={selectNotificacion}
            updateNotificacion={updateNotificacion}
            selectedManada={selectedManada}
            selectedAnimal={selectedAnimal}
            selectedUser={window.userSigned}            
            approveDonation={approveDonation}
            createNewManada={createNewManada}
            deleteFromManada={deleteFromManada}
            createSubscription={createSubscription}
            cancelSubscripcion={cancel}
            selectManadaToAnimals={selectManadaToAnimals}
            selectAnimalToHistory={selectAnimalToHistory}
            selectedManadaToAnimals={selectedManadaToAnimals}
            selectedAnimalToHistory={selectedAnimalToHistory}
            isSelectedManada={isSelectedManada}
            isSelectManada={isSelectManada}
            loadAnimalsFundacion={loadAnimalsFundacion}            
          />
        )}          
        
         
        {dataMessage && (
          <CardMessage
            message={dataMessage.message}
            title={dataMessage.title}
            onClose={() => 
setdataMessage()}
          />
        )}
        {link !== undefined && (
          <Subscripcion link={link} onClose={() => 
setLink()} />
        )}
      </div>
    </>
  );
};