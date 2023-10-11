import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CardAnimal } from './CardAnimal';
import { CardTarjeta } from './cardTarjeta';
import { CardPayPal } from './CardPayPal';

import { SECCIONES } from './../constantes';

import { CardCreateManada } from './../Manadas/CardCreateManada';
import { CardDeleteManada } from './../Manadas/CardDeleteManada';

import './Animals.scss';

import imgPerro from './../../../Assets/icons/dog.png';
import imgGato from './../../../Assets/icons/cat.png';
import leohuella from './../../../Assets/icons/leohuella1.png';
import animalPlaceholder from './../../../Assets/img/manada3.jpeg';

import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';

import Context from '../../../Context';

export const Animals = ({
  animals,
  loadAnimals,
  deleteManada,
  updateManada,
  selectAnimal,
  selectSection,
  selectedManadaToAnimals,
  selectAnimalToHistory,
}) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isEditingManada, setEditingManada] = useState();
  const [isDeletingManada, setDeletingManada] = useState();
  const [selectedAnimal, selectAnimalToCard] = useState();
  const [suscripcion, selectcardsuscripcion] = useState();
  const [tarjeta, selectcardtarjeta] = useState();
  const [PayPal, selectcardPaypal] = useState();

  const { setClientData } = useContext(Context);

  const { nombres, apellidos, email, telefono } = window.userSigned;

  const CLIENT_DATA = {
    totalAmount: Number(selectedManadaToAnimals?.monto),
    clientName: nombres + ' ' + apellidos,
    clientEmail: email,
    clientNumber: telefono,
  };

  const goToPaganini = () => {
    setClientData(CLIENT_DATA);
  };

  const fetchMoreData = () => {
    loadAnimals(page + 1, false, (more) => {
      setHasMore(more);
      setPage(page + (more ? 1 : 0));
    });
  };

  return (
    <div className="fund-don-animals-content px-10">
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
            <Link to="/payment">
              <button className="fund-btn" onClick={goToPaganini}>
                Activar donación
              </button>
            </Link>
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
          {animals?.map((animal, idx) => (
            <div
              className="fund-animal fund-card fund-pointer"
              key={idx}
              onClick={() => {
                selectSection(SECCIONES[5]);
                return selectAnimalToHistory(animal);
              }}
            >
              <div className="fund-animal">
                <img className="fund-animal-foto" src={animalPlaceholder} />
                {animal.fundacion_id == 3 && (
                  <div className="fun-leopet">
                    <img className="img-huella" src={leohuella} />
                  </div>
                )}
              </div>

              <div className="fund-animal-descripcion">
                <div className="fund-data-animal animal-row">
                  <div className="animal-column">
                    <img
                      className="especie-icons "
                      src={animal.especie == 'Perro' ? imgPerro : imgGato}
                    />
                  </div>
                  <div className="fund-txt-12-green animal-column">
                    {animal.nombre}{' '}
                  </div>
                </div>
                <div className="animal-row">
                  <div className="fund-txt-6 animal-column">Especie: </div>
                  <div className="fund-txt-dato animal-column">
                    {animal.especie}
                  </div>
                </div>
                <div className="animal-row">
                  <div className="fund-txt-6 animal-column">Raza: </div>
                  <div className="fund-txt-dato animal-column">
                    {animal.raza}
                  </div>
                </div>
                <div className="animal-column">
                  <div className="fund-txt-6 animal-column">Fundación: </div>
                  <div className="fund-txt-datofun animal-row">
                    {animal.fundacion}
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

      {suscripcion && (
        <div className="fund-don-dialog">
          <div className="fund-don-dialog-content fund-card">
            <div className="fund-don-dialog-close">
              <i
                className="far fa-times-circle fund-pointer"
                onClick={() => {
                  selectSection(SECCIONES[1]);
                }}
              />
            </div>
            <div className="fund-txt-24 ">Suscripción</div>
            <div className="fund-txt-14 fund-mt-16">
              Seleccione la forma de pago:
            </div>

            <div className="fund-form-buttons">
              <button
                className="fund-btn tarjeta-btn"
                onClick={() => {
                  selectcardtarjeta(true);
                }}
              >
                Tarjeta de crédito o débito
              </button>

              <button
                className="fund-btn pay-btn"
                onClick={() => selectcardPaypal(true)}
              >
                PayPal
              </button>
            </div>
          </div>
        </div>
      )}
      {PayPal && (
        <CardPayPal
          onClose={() => selectcardPaypal()}
          selectedManada={selectedManadaToAnimals}
          deleteManada={deleteManada}
        />
      )}
      {tarjeta && (
        <CardTarjeta
          onClose={() => selectcardtarjeta()}
          selectedManada={selectedManadaToAnimals}
          deleteManada={deleteManada}
        />
      )}
    </div>
  );
};
