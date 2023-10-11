import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardApadrinar } from './CardApadrinar';
import { CardCreateManada } from './CardCreateManada';
import { CardDeleteManada } from './../Manadas/CardDeleteManada';
import { CardDeleteManada2 } from './../Manadas/CardDeleteManada2';
import { SECCIONES } from './../constantes';
import imanada from './../../../Assets/icons/pawfill.png';
import imanada3 from './../../../Assets/Img/manada3.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import './Manadas.scss';

export const Manadas = ({
  manadas,
  addManada,
  deleteManada,
  deleteManada2,
  updateManada,
  loadManadas,
  selectSection,
  selectedAnimal,
  createNewManada,
  selectManadaToAnimals,
}) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedManada, selectManada] = useState();
  const [isCreatingManada, setCreatingManada] = useState();
  const [isDeletingManada, setDeletingManada] = useState();
  const [isDeletingManada2, setDeletingManada2] = useState();
  const [isShowingCardApadrinar, showCardApadrinar] = useState();

  const fetchMoreData = () => {
    loadManadas(page + 1, page == 1, (more) => {
      setHasMore(more);
      setPage(page + (more ? 1 : 0));
    });
  };

  return (
    <div className="fund-don-manadas-content">
      <div className="fund-manadas-title fund-txt-24 fund-mb-16">
        {selectedAnimal ? 'Elige una manada' : 'Tus manadas'}
      </div>

      {!manadas?.length ? (
        <div className="fund-empty fund-txt-12 fund-flx">
          {/* <img
            className="fund-img-empty"
            src="https://www.lagacetadesalamanca.es/binrepository/768x576/0c144/768d432/none/25207907/KBEE/fotonoticia-20160404180800-16041658459-640_1-1658138_20200416161235.jpg"
          /> */}
          No hay manadas disponibles
          <div className="fund-manada-icons fund-card fund-pointer">
            <i
              className="fas fa-plus-circle fund-pointer"
              onClick={() => setCreatingManada(true)}
            />
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={manadas?.length || 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="fund-loading-cards fund-flx-c fund-full">
              <i className="fad fa-spinner fund-spin" />
            </div>
          }
        >
          <div className="fund-manada-icons fund-card fund-pointer">
            <i
              className="fas fa-plus-circle fund-pointer"
              onClick={() => setCreatingManada(true)}
            />
          </div>

          {manadas?.map((manada, idx) => (
            <div className="fund-manada fund-card fund-pointer" key={idx}>
              <div className="fund-editar-manada">
                {/*  <i className="fas fa-edit fund-mr-8 fund-pointer"/> */}
                <div className="icono-manada">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    onClick={() => {
                      selectManada(manada);
                      setCreatingManada(true);
                      //Alert('edit');
                    }}
                  />
                </div>
                <div className="icono-manada">
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => {
                      selectManada(manada);
                      setDeletingManada2(true);
                    }}
                  />
                </div>
                {/*  <i className="far fa-times fund-pointer "
                  onClick={() => setDeletingManada(true)}
                /> */}
              </div>
              <div className="fund-flx">
                <div
                  className="fund-animal-foto fund-flx-column "
                  onClick={() => {
                    if (selectedAnimal) {
                      showCardApadrinar(true);
                      return selectManada(manada);
                    }
                    //IsSelectManada(true);
                    selectManadaToAnimals(manada);
                    selectSection(SECCIONES[0]);
                  }}
                >
                  {manada.galeriamanada == null ? (
                    <img className="" src={imanada3} />
                  ) : (
                    <img className="" src={manada.galeriamanada.fotos[0]} />
                  )}
                </div>

                <div className="fund-ml-16 fund-flx-column fund-manada-descripcion">
                  <div className="fund-data-animal animal-row">
                    <div className="manada-column">
                      <img src={imanada} />
                    </div>
                    <div className="fund-txt-12-green manada-row">
                      {manada.nombre}{' '}
                    </div>
                  </div>
                  <div className="fund-data-manada manada-row">
                    <div className="fund-txt-6 manada-column">Monto: </div>
                    <div className="fund-txt-datofun manada-column">
                      {manada.monto}
                    </div>
                  </div>
                  <div className="fund-data-manada manada-row">
                    <div className="fund-txt-6 manada-column">Animales: </div>
                    <div className="fund-txt-datofun manada-column">
                      {manada.apadrinados}
                    </div>
                  </div>
                  <div className="fund-data-manada manada-row">
                    <div className="fund-txt-6 manada-column">
                      Suscripción:{' '}
                    </div>
                    <div className="fund-txt-datofun manada-column">
                      {' '}
                      $ {manada.monto * manada.apadrinados}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}
      {isShowingCardApadrinar && (
        <CardApadrinar
          showCardApadrinar={showCardApadrinar}
          selectedManada={selectedManada}
          selectedAnimal={selectedAnimal}
          onClick={() => {
            addManada(selectedManada.id);
            showCardApadrinar();
          }}
        />
      )}
      {isCreatingManada && (
        <CardCreateManada
          selectedManada={selectedManada}
          createManada={createNewManada}
          updateManada={updateManada}
          onClose={setCreatingManada}
        />
      )}
      {isDeletingManada && (
        <CardDeleteManada
          onClose={() => setDeletingManada()}
          selectedManada={selectedManadaToAnimals}
          deleteManada={deleteManada}
        />
      )}

      {isDeletingManada2 && (
        <CardDeleteManada2
          onClose={() => setDeletingManada2()}
          selectedManada={selectedManada}
          deleteManada2={deleteManada2}
        />
      )}
    </div>
  );
};
