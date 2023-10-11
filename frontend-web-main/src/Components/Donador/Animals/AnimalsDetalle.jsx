import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faBriefcaseMedical,
} from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';

import { SECCIONES } from './../constantes';
import { CardFromDeleteManada } from './../Manadas/CardDeleteFromManada';

import placeholderFoto from '../../../Assets/Img/manada3.jpeg';

import './AnimalsDetalle.scss';

export const AnimalsDetalle = ({
  selectSection,
  selectAnimal,
  selectedManadaToAnimals,
  selectAnimalToHistory,
  selectedAnimalToHistory: selectedAnimal,
  approveDonation,
  deleteFromManada,
  isSelectedManada,
}) => {
  const [isDeleting, setDeleting] = useState();
  const [selectedHistorial, selectHistorial] = useState();

  const formatearFecha = () => {
    let date = new Date(selectedAnimal.createdAt);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fecha_final;
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    fecha_final = `${day}-${month}-${year}`;
    return fecha_final;
  };

  return (
    <div className="fund-don-animals-historial">
      {console.log(selectedAnimal)}
      <div className="fund-historial-title">
        <div className="fund-return fund-flx">
          <i
            className="fas fa-arrow-alt-circle-left fund-mr-8 fund-pointer"
            onClick={() => {
              selectAnimalToHistory();
              selectSection(SECCIONES[0]);
            }}
          />
          <div className="fund-txt-24 fund-mb-16">
            <div className="titulo-vista">Detalle de Animal</div>
          </div>
        </div>
        {isSelectedManada && (
          <i
            className="fas fa-trash-alt fund-pointer"
            onClick={() => setDeleting(true)}
          />
        )}

        {/* <div className='icono-manada'>
          <FontAwesomeIcon icon={faTimes}
            onClick={() => setDeleting(true)}
          />
        </div> */}
      </div>
      <div className="contenedor-animal-detalle">
        <div className="animal-txt-green fund-txt-24">
          {selectedAnimal.nombre}
        </div>
        <div className="">
          <img
            className="d-block w-80 rounded-xl drop-shadow-xl"
            src={placeholderFoto}
            alt="First slide"
          />
        </div>
        <div className="fund-form-buttons">
          <button
            className="fund-btn"
            onClick={() => {
              //Alert('hola');
              selectAnimal(selectedAnimal);
              selectSection(SECCIONES[1]);
            }}
          >
            Apadrinar
          </button>
        </div>
        <div className="">
          <div className="flex gap-1 flex-wrap w-90 items-center">
            <div className="detalle-column">
              <div className="seccion-detalle-row w-60">
                <div className="icono-seccion">
                  <FontAwesomeIcon icon={faClipboard} />
                </div>
                <div className="etiqueta-txt-14 animal-txt-green">
                  Información
                </div>
              </div>
              <div className="info-detalle-column fund-shadow detalle-animal-info w-60">
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Especie:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.especie}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Edad:</div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.edad} años
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Sexo:</div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.sexo ? 'Macho' : 'Hembra'}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Raza:</div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.raza}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Fundación:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.fundacion}
                  </div>
                </div>
              </div>
            </div>

            <div className="detalle-column">
              <div className="seccion-detalle-row w-60">
                <div className="icono-seccion">
                  <FontAwesomeIcon icon={faBriefcaseMedical} />
                </div>
                <div className="etiqueta-txt-14 animal-txt-green ">Salud</div>
              </div>
              <div className="info-detalle-column fund-shadow detalle-animal-info w-60">
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">Peso:</div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.peso} Kg
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Esterilización:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.esterilizacion ? 'Si' : 'No'}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Vacunación:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.vacunacion ? 'Si' : 'No'}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Desparasitación:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.desparasitacion ? 'Si' : 'No'}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Enfermedades:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.enfermedades}
                  </div>
                </div>
              </div>
            </div>

            <div className="detalle-column">
              <div className="seccion-detalle-row">
                <div className="icono-seccion">
                  <FontAwesomeIcon icon={faClipboard} />
                </div>
                <div className="etiqueta-txt-14 animal-txt-green ">
                  Historia
                </div>
              </div>
              <div className="info-detalle-column fund-shadow detalle-animal-info ">
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Fecha rescate:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {formatearFecha()}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Fecha registro:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {formatearFecha()}
                  </div>
                </div>
                <div className="animal-detalle-row">
                  <div className="etiqueta-txt-14 etiqueta-column">
                    Descripción:
                  </div>
                  <div className="dato-txt-14 dato-column">
                    {selectedAnimal.descripcion}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fund-donaciones fund-mt-16">
        {selectedAnimal?.historial?.length > 1 && (
          <div
            className="fund-linea-vertical"
            style={{
              height: 39 * selectedAnimal?.historial?.length,
            }}
          />
        )}
        {selectedAnimal?.historial?.map((historia, idx) => {
          if (!historia?.evidencia?.id) {
            return;
          }
          return (
            <div key={idx}>
              <div className="fund-historial-history fund-card">
                <div className="fund-flx-c">
                  <i className="fas fa-circle primary fund-mr-8 " />
                  <div>
                    <div className="fund-txt-12">
                      {historia.evidencia.descripcion}
                    </div>
                    <div className="fund-txt-8">
                      {moment(historia.createdAt).format('DD/MM/YYYY')}
                    </div>
                  </div>
                </div>
                <div className="fund-flx">
                  <i
                    className="fas fa-photo-video fund-pointer fund-mr-8"
                    onClick={() => selectHistorial(historia)}
                  ></i>
                  <i
                    className={
                      'fas fa-check-circle fund-pointer' +
                      (historia.aprobado ? ' primary' : '')
                    }
                    onClick={() => {
                      if (historia.aprobado) {
                        return;
                      }
                      approveDonation(
                        historia?.evidencia?.donacion_id,
                        !historia.aprobado
                      );
                    }}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {isDeleting && (
        <CardFromDeleteManada
          selectedAnimal={selectedAnimal}
          selectedManada={selectedManadaToAnimals}
          onClose={() => setDeleting()}
          deleteFromManada={deleteFromManada}
        />
      )}
      {selectedHistorial?.evidencia?.fotos?.fotos && (
        <div className="fund-don-dialog">
          <div className="fund-don-dialog-content fund-card">
            <ImageGallery
              showBullets={true}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              items={selectedHistorial?.evidencia?.fotos?.fotos?.map((f) => {
                return {
                  original: f,
                  thumbnail: f,
                };
              })}
            />
            <div className="fund-form-buttons">
              <button
                className="fund-btn-secundary"
                onClick={() => selectHistorial()}
              >
                Cancelar
              </button>
              {!selectedHistorial.aprobado && (
                <button
                  className="fund-btn"
                  onClick={() =>
                    approveDonation(
                      selectedHistorial?.evidencia?.donacion_id,
                      !selectedHistorial.aprobado
                    )
                  }
                >
                  Aprobar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
