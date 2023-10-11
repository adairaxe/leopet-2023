import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import ImageUploading from 'react-images-uploading';
import { uploadPhoto as upload } from '../../../Service/Aminal';
import { deletePhoto } from '../../../Service/Actualizacion';

export const CardCreateManada = ({
  selectedManada,
  onClose,
  createManada,
  updateManada,
}) => {
  const [manada, setManada] = useState(selectedManada || {});
  const [images, setImages] = useState([]);
  const [isUpdateimages, setUpdateimages] = useState();

  const isInvalid = () => {
    return (
      !manada.nombre ||
      !(manada.nombre.length > 2) ||
      !manada.monto ||
      !(manada.monto > 4)
    );
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
        if (!manada.galeriamanada) {
          manada.galeriamanada = {};
        }
        if (!manada.galeriamanada.fotos) {
          manada.galeriamanada.fotos = [];
        }
        manada.galeriamanada.fotos = [...manada.galeriamanada.fotos, ...data];
        setManada({
          ...manada,
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

  const deleteImage = (imagen) => {
    console.log(imagen);
    deletePhoto(imagen, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div className="fund-don-dialog">
      <div className="fund-don-dialog-content fund-card">
        <div className="fund-txt-24 fund-mb-16">
          {manada.id ? 'Actualizar Manada' : 'Crear manada'}
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12 titulo-negrita">Nombre</span>
          <div className="seccion-detalle-row">
            <div className="icono-seccion-column">
              <FontAwesomeIcon icon={faPaw} color="#028596" />
            </div>
            <input
              value={manada.nombre || ''}
              type="text"
              maxLength={10}
              placeholder="Ingrese el nombre de la manada"
              onChange={(e) => {
                setManada({
                  ...manada,
                  nombre: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-12 titulo-negrita">Monto</span>
          <div className="seccion-detalle-row">
            <div className="icono-seccion-column">
              <FontAwesomeIcon icon={faMoneyBill} color="#028596" />
            </div>
            <input
              value={manada.monto || ''}
              type="number"
              placeholder="Ingrese el monto"
              onChange={(e) => {
                setManada({
                  ...manada,
                  monto: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Fotos</span>
          <div className="fund-gallery">
            {manada?.galeriamanada?.fotos?.map((foto, idx) => {
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
                      manada.galeriamanada.fotos =
                        manada.galeriamanada.fotos.filter((f, i) =>
                        i !== idx);
                      deleteImage(foto);
                      setManada({
                        ...manada,
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

        <div className="fund-form-buttons-row">
          <button className="fund-btn" onClick={() =>
          onClose()}>
            Cancelar
          </button>
          <button
            className="fund-btn"
            disabled={isInvalid()}
            onClick={() => {
              if (manada.id) {
                updateManada({
                  id: manada.id,
                  monto: manada.monto,
                  nombre: manada.nombre,
                  galeriamanada: manada.galeriamanada,
                });
              } else {
                createManada(manada);
              }
              onClose();
            }}
          >
            {manada.id ? 'Guadar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
};
