import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

import { uploadPhoto as upload } from '../../../Service/Aminal';

export const CardHistoria = ({
  setError,
  selectedDonacion,
  onClose,
  updateEvidencia,
  createEvidencia,
}) => {
  const [evidencia, setEvidencia] = useState(selectedDonacion.evidencia || {});
  const [images, setImages] = useState([]);
  const [isUpdateimages, setUpdateimages] = useState();

  const isInvalid = () => {
    return !evidencia.descripcion || isUpdateimages;
  };
  const uploadImage = (newImages) => {
    setUpdateimages(true);
    console.log(newImages);
    setImages(newImages);
    upload(
      {
        files: newImages.map((i) =>
i.file),
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
      }
    )
      .then((data) => {
        if (!evidencia.galeria) {
          evidencia.galeria = {};
        }
        if (!evidencia.galeria.fotos) {
          evidencia.galeria.fotos = [];
        }
        evidencia.galeria.fotos = [...evidencia.galeria.fotos, ...data];
        setEvidencia({
          ...evidencia,
        });
        setImages();
        setUpdateimages(false);
      })
      .catch((err) => {
        console.log(err);
        setUpdateimages(false);
        setImages();
        setError(err.message);
      });
  };

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card fund-create-evidencia">
        <div className="fund-txt-24 fund-mb-16">
          {selectedDonacion ? 'Editar' : 'Crear'} historia
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12">Descripción</span>
          <input
            value={evidencia.descripcion || ''}
            type="text"
            onChange={(e) => {
              setEvidencia({
                ...evidencia,
                descripcion: e.target.value,
              });
            }}
          />
        </div>

        <div className="fund-form-field">
          <span className="fund-txt-12">Fotos</span>
          <div className="fund-gallery">
            {evidencia?.galeria?.fotos?.map((foto, idx) => {
              return (
                <div
                  className="fund-gallery-photo"
                  key={idx}
                  style={{
                    backgroundImage: `url("${foto}")`,
                  }}
                >
                  <i
                    className="fad fa-trash primary fund-pointer"
                    onClick={() => {
                      evidencia.galeria.fotos = evidencia.galeria.fotos.filter(
                        (f, i) =>
i !== idx
                      );
                      setEvidencia({
                        ...evidencia,
                      });
                    }}
                  />
                </div>
              );
            })}
            {images?.map((foto, idx) => {
              return (
                <div
                  className="fund-gallery-photo uploading fund-flx-c"
                  key={idx}
                  style={{
                    backgroundImage: `url("${foto.data_url}")`,
                  }}
                >
                  <i className="fad fa-spinner fund-spin" />
                </div>
              );
            })}
            <ImageUploading
              multiple
              value={images}
              onChange={uploadImage}
              maxNumber={5}
              dataURLKey="data_url"
            >
              {({ onImageUpload, isDragging, dragProps }) =>
(
                <div
                  className={
                    'fund-upload-photos fund-pointer' +
                    (isUpdateimages ? ' fund-opaque' : '')
                  }
                  style={
                    isDragging
                      ? { border: '1px dashed var(--primary-color)' }
                      : undefined
                  }
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  <i
                    className={'fas fa-plus' + (isDragging ? ' primary' : '')}
                  />
                  <span
                    className="fund-txt-10"
                    style={
                      isDragging ? { color: 'var(--primary-color)' } : undefined
                    }
                  >
                    Click o arrastre
                  </span>
                </div>
              )}
            </ImageUploading>
          </div>
        </div>
        <div className="fund-form-buttons">
          <button className="fund-btn-secundary" onClick={() =>
onClose()}>
            Cancelar
          </button>
          <button
            className="fund-btn"
            disabled={isInvalid()}
            onClick={() => {
              if (evidencia.id) {
                updateEvidencia(evidencia);
              } else {
                createEvidencia({
                  ...evidencia,
                  donacion: selectedDonacion.id,
                });
              }
              onClose();
            }}
          >
            {evidencia.id ? 'Guadar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
};
