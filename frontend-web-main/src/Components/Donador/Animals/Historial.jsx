import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';

import { SECCIONES } from './../constantes';
import { CardFromDeleteManada } from './../Manadas/CardDeleteFromManada';

import './Historial.scss';

export const Historial = ({
  selectSection,
  selectedManadaToAnimals,
  selectAnimalToHistory,
  selectedAnimalToHistory: selectedAnimal,
  approveDonation,
  deleteFromManada,
}) => {
  const [isDeleting, setDeleting] = useState();
  const [selectedHistorial, selectHistorial] = useState();

  return (
    <div className="fund-don-animals-historial">
      <div className="fund-historial-title">
        <div className="fund-return fund-flx">
          <i
            className="fas fa-arrow-alt-circle-left fund-mr-8 fund-pointer"
            onClick={() => {
              selectAnimalToHistory();
              selectSection(SECCIONES[1]);
            }}
          />
          <div className="fund-txt-24 fund-mb-16">Historial</div>
        </div>
        <i
          className="fas fa-trash-alt fund-pointer"
          onClick={() => 
setDeleting(true)}
        />
      </div>
      <div className="fund-flx">
        <img
          className="fund-animal-foto fund-shadow-1"
          src={selectedAnimal?.galeria?.fotos[0]}
        />
        <div className="fund-ml-16">
          <b className="fund-txt-16">{selectedAnimal.nombre}</b>
          <div>
            <div className="fund-txt-14">{selectedAnimal.especie}</div>
            <div className="fund-txt-6">Especie</div>
          </div>
          <div>
            <div className="fund-txt-14">{selectedAnimal.raza}</div>
            <div className="fund-txt-6">Raza</div>
          </div>
          <div>
            <div className="fund-txt-14">{selectedAnimal.fundacion}</div>
            <div className="fund-txt-6">Fundación</div>
          </div>
        </div>
      </div>
      <div className="fund-mt-16">
        <div className="fund-txt-14">{selectedAnimal.descripcion}</div>
        <div className="fund-txt-6">Descripción</div>
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
                    onClick={() => 
selectHistorial(historia)}
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
          onClose={() => 
setDeleting()}
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
                onClick={() => 
selectHistorial()}
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
