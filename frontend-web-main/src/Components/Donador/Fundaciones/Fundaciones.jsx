import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardAnimal } from './../Animals/CardAnimal';
import { SECCIONES } from './../constantes';

import { CardCreateManada } from './../Manadas/CardCreateManada';
import { CardDeleteManada } from './../Manadas/CardDeleteManada';

import './Fundaciones.scss';

//Import imgPerro from './../../../Assets/icons/dog.png';
//Import imgGato from './../../../Assets/icons/cat.png';
//Import leohuella from './../../../Assets/icons/leohuella1.png';
import paw from './../../../Assets/icons/paw.png';
import leopetLogo from './../../../Assets/Img/leopetLogo.png';

export const Fundaciones = ({
  animals,
  fundaciones,
  loadFundaciones,
  deleteManada,
  updateManada,
  selectAnimal,
  selectSection,
  selectedManadaToAnimals,
  createSubscription,
  cancelSubscripcion,
  selectFundacion,
  loadAnimalsFundacion,
}) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isEditingManada, setEditingManada] = useState();
  const [isDeletingManada, setDeletingManada] = useState();
  const [selectedAnimal, selectAnimalToCard] = useState();

  const fetchMoreData = () => {
    loadFundaciones(page + 1, false, (more) => {
      setHasMore(more);
      setPage(page + (more ? 1 : 0));
    });
  };

  return (
    <div className="fund-don-animals-content px-8">
      {selectedManadaToAnimals && (
        <div className="fund-info-manada">
          <div className="fund-txt-24 fund-mb-16">
            {selectedManadaToAnimals.nombre}
            <div className="fund-txt-10">
              <b>Monto: $</b>
              {selectedManadaToAnimals.monto}
            </div>
          </div>
          <div className="fund-flx-c">
            <i
              className={
                'fas fa-trash-alt fund-mr-8 fund-pointer ' +
                (selectedManadaToAnimals.statusSubscription
                  ? ''
                  : 'fund-opaque')
              }
              disabled={!selectedManadaToAnimals.statusSubscription}
              onClick={() => setDeletingManada(true)}
            />
            <button
              disabled={!animals?.length}
              className="fund-btn"
              onClick={() =>
                selectedManadaToAnimals.statusSubscription
                  ? cancelSubscripcion(selectedManadaToAnimals.id)
                  : createSubscription(selectedManadaToAnimals.id)
              }
            >
              {selectedManadaToAnimals.statusSubscription
                ? 'Desactivar'
                : 'Donar'}
            </button>
          </div>
        </div>
      )}
      {!animals?.length ? (
        <div className="fund-empty fund-txt-12 fund-flx">
          <img
            className="fund-img-empty"
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
          />
          No hay Animales disponibles
        </div>
      ) : (
        <InfiniteScroll
          dataLength={animals?.length || 0}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="fund-loading-cards fund-flx-c fund-full">
              <i className="fad fa-spinner fund-spin" />
            </div>
          }
        >
          {fundaciones?.map((fundacion, idx) => (
            <div
              className="fund-animal fund-card fund-pointer"
              key={idx}
              onClick={() => {
                selectFundacion(fundacion);
                loadAnimalsFundacion(fundacion.id, 0, true);
                selectSection(SECCIONES[6]);
              }}
            >
              {/* <img
                className="fund-animal-foto"
                src={animal?.galeria?.fotos[0]}
              /> */}
              <div className="fund-fundacion">
                <img
                  className="fund-logo-foto"
                  src={fundacion.id == 3 ? leopetLogo : fundacion.logo}
                />
              </div>

              <div className="fund-animal-descripcion">
                <div className="fund-data-animal animal-row">
                  <div className="animal-column">
                    <img className="especie-icons " src={paw} />
                  </div>
                  <div className="fund-txt-12-green animal-column">
                    {fundacion.nombre}{' '}
                  </div>
                </div>
                <div className="animal-row">
                  <div className="fund-txt-6 animal-column">Teléfono: </div>
                  <div className="fund-txt-dato animal-column">
                    {fundacion.telefono}
                  </div>
                </div>
                <div className="animal-row">
                  <div className="fund-txt-6 animal-column">Email: </div>
                  <div className="fund-txt-dato animal-column">
                    {fundacion.user.email}
                  </div>
                </div>
                <div className="animal-column">
                  <div className="fund-txt-6 animal-column">Dirección: </div>
                  <div className="fund-txt-datofun animal-row">
                    {fundacion.direccion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      )}
      {selectedAnimal !== undefined && (
        <CardAnimal
          selectedAnimal={selectedAnimal}
          selectAnimal={selectAnimalToCard}
          selectAnimalToApadrinar={selectAnimal}
          selectSection={selectSection}
        />
      )}
      {isEditingManada && (
        <CardCreateManada
          onClose={() => setEditingManada()}
          selectedManada={selectedManadaToAnimals}
          updateManada={updateManada}
        />
      )}
      {isDeletingManada && (
        <CardDeleteManada
          onClose={() => setDeletingManada()}
          selectedManada={selectedManadaToAnimals}
          deleteManada={deleteManada}
        />
      )}
    </div>
  );
};
