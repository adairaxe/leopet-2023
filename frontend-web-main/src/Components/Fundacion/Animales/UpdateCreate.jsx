import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { uploadPhoto as upload,
           deletePhoto } from '../../../Service/Actualizacion';
import './UpdateCreate.scss';

export const UpdateCreate = ({
  selectedAnimal,
  selectedActualizacion,
  updateActualizacion,
  createActualizacion,
  onClose,
}) => {

  const [actualizacion, setActualizacion] =
  useState(selectedActualizacion || {});
  const [images, setImages] = useState([]);
  const [isUpdateimages, setUpdateimages] = useState();
  //A-const [animal, setanimal] = useState({});

  const isInvalid = () => {
    return (
      !actualizacion.descripcion ||
      !(actualizacion.descripcion.length>2) ||
      !actualizacion.estado_salud ||
      !(actualizacion.estado_salud.length>2)
    );
  };

  /*A- const handleFileChange = (e) => {
    const file=e.target.files[0];
      if ( file != null ) {
      const img = {
        preview: URL.createObjectURL(file),
        data: file,
      };
      setImages([...images, img]);
    }
  };

  const eliminarImagen = (imagen) => {
    var newArray = images.filter((item) =>
        item.data.name !== imagen.data.name);
    setImages(newArray);
  }; */

  const deleteImage = (imagen) => {
    console.log(imagen);
     deletePhoto(
      imagen,
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
      }
    )
      .then((data) => {
        console.log( data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  const uploadImage = (newImages) => {
    setUpdateimages(true);

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
        if (!actualizacion.galeria) {
          actualizacion.galeria = {};
        }
        if (!actualizacion.galeria.fotos) {
          actualizacion.galeria.fotos = [];
        }
        actualizacion.galeria.fotos =
        [...actualizacion.galeria.fotos, ...data];
        setActualizacion({
          ...actualizacion,
        });
        console.log('Inicia');
        console.log(actualizacion);
        console.log('Fin');
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
      <div className="fund-don-dialog-content fund-card fund-create-animal">
        <div className="fund-txt-24 fund-mb-16">
        {selectedActualizacion ? 'Editar' : 'Crear'} Actualización de {selectedAnimal.nombre }
        </div>

        <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Descripcion</span>
          <input
            value={actualizacion.descripcion || ''}
            type="text"
            onChange={(e) => {
              setActualizacion({
                ...actualizacion,
                descripcion: e.target.value,
              });
            }}
          />
        </div>

        <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Estado de Salud</span>
          <input
            value={actualizacion.estado_salud ||''}
            type="text"
            onChange={(e) => {
              setActualizacion({
                ...actualizacion,
                estado_salud: e.target.value,
              });
            }}
          />
        </div>

        {/* <div className="fund-form-field" >
          <span className="fund-txt-12">Foto</span>
          {images?.map((imagen, idx) => {
             console.log(imagen);
              return (
                <div key={idx} className="fund-table-row">
                  <div className="fund-table-cell fund-txt-12"
                   onClick={() => {
                    eliminarImagen(imagen)  ;
                  }} >
                   <img src={imagen.preview} width='100' height='100'/>
                   </div>
                </div>
              );
            })}


          <input type='file' name='file' onChange={handleFileChange}>
          </input>
        </div> */}
         <div className="fund-form-field">
          <span className="fund-txt-14 titulo-negrita">Fotos</span>
          <div className="fund-gallery">
            {actualizacion?.galeria?.fotos?.map((foto, idx) => {
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
                      actualizacion.galeria.fotos =
                        actualizacion.galeria.fotos.filter(
                        (f, i) =>
                        i !== idx );
                      deleteImage(foto);
                      setActualizacion({
                        ...actualizacion,
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

        <div className="form-buttons-2option">
        <div>

          <button
            className="fund-btn"
            disabled={isInvalid()}
            onClick={() => {
              if (actualizacion.id) {
                updateActualizacion(actualizacion);
              } else {
                createActualizacion(actualizacion);
              }
              onClose();
            }}
          >
         {actualizacion.id ? 'Guadar' : 'Crear'}
          </button>
          </div>
          <div className='form-buttons-2option-cancelar'>
          <button className="fund-btn" onClick={() =>
              onClose()}>
            Cancelar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
