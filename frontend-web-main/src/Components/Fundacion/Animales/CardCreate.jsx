import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { uploadPhoto as upload  } from '../../../Service/Aminal';
import {
  deletePhoto } from '../../../Service/Actualizacion';
import './CardCreate.scss';
import { SEXO } from '../../Config';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

export const CardCreate = ({
  //A- setError,
  selectedAnimal,
  onClose,
  updateAnimal,
  createAnimal,
}) => {
  const [animal, setanimal] = useState(selectedAnimal || {});
   const [images, setImages] = useState([]);
  const [isUpdateimages, setUpdateimages] = useState();
  const [activeTab, setActiveTab] = useState('1');

  const cambiarTab = (numeroTab) => {
    if ( activeTab !== numeroTab ) {
      setActiveTab(numeroTab);
    }
  };

  const isInvalid = () => {
    return (
      !animal.nombre ||
      !animal.especie ||
      !animal.raza ||
      !animal.edad ||
      !animal.peso ||
      !animal.descripcion ||
      !animal.enfermedades
      //A- isUpdateimages
    );
  };

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
        if (!animal.galeria) {
          animal.galeria = {};
        }
        if (!animal.galeria.fotos) {
          animal.galeria.fotos = [];
        }
        animal.galeria.fotos = [...animal.galeria.fotos, ...data];
        setanimal({
          ...animal,
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
      <div className="fund-don-dialog-content fund-card fund-create-animal">
        <div className="fund-txt-24 fund-mb-16">
          {selectedAnimal ? 'Editar' : 'Crear'} Animal
        </div>
        <Nav tabs>
          <NavItem>
            <NavLink
            className={ activeTab == '1' ? 'activeTab baseTab' : 'baseTab'}
            onClick={ () =>
              cambiarTab('1') }>
                Información
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={ activeTab == '2' ? 'activeTab baseTab' : 'baseTab'}
            onClick={ () =>
              cambiarTab('2') }>
                Historia y Salud
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={ activeTab == '3' ? 'activeTab baseTab' : 'baseTab'}
            onClick={ () =>
              cambiarTab('3') }>
                Galeria
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent className='contenidoTab' activeTab={activeTab}>
          <TabPane tabId='1'>
            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Nombre</span>
              <input
                value={animal.nombre || ''}
                type="text"
                maxLength={20}
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    nombre: e.target.value,
                  });
                }}
              />
            </div>
            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Especie</span>
              <input
                value={animal.especie || ''}
                type="text"
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    especie: e.target.value,
                  });
                }}
              />

            </div>
            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Raza</span>
              <input
                value={animal.raza || ''}
                type="text"
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    raza: e.target.value,
                  });
                }}
              />
            </div>

            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Sexo</span>
              <select
                value={animal.sexo?'MACHO':'HEMBRA'}
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    sexo: ((e.target.value=='MACHO')?true:false),
                  });
                }}
              >
                {SEXO.map((sexo, idx) => {
                  return (
                    <option key={idx} value={sexo}>
                      {sexo}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Edad</span>
              <input
                value={animal.edad || ''}
                type="number"
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    edad: e.target.value,
                  });
                }}
              />
            </div>
          </TabPane>
          <TabPane tabId='2'>
            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Peso</span>
              <input
                value={animal.peso || ''}
                type="number"
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    peso: e.target.value,
                  });
                }}
              />
            </div>
            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Descripción</span>
              <input
                value={animal.descripcion || ''}
                type="text"
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    descripcion: e.target.value,
                  });
                }}
              />
            </div>
            <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Enfermedades</span>
              <input
                value={animal.enfermedades || ''}
                type="text"
                onChange={(e) => {
                  setanimal({
                    ...animal,
                    enfermedades: e.target.value,
                  });
                }}
              />
            </div>
            <div className="fund-form-field-row">
              <span className="fund-txt-14 titulo-negrita">Esterilización</span>
              {animal.esterilizacion ? (
                      <i
                        className="fas fa-toggle-on primary fund-mr-8 fund-pointer"
                        onClick={() => {
                          setanimal({
                            ...animal,
                            esterilizacion: !animal.esterilizacion,
                          });
                        }}
                      />
                    ) : (
                      <i
                        className="fad fa-toggle-off fund-mr-8 fund-pointer"
                        onClick={() => {
                          setanimal({
                            ...animal,
                            esterilizacion: !animal.esterilizacion,
                          });
                        }}
                      />
                    )}
            </div>
            <div className="fund-form-field-row">
              <span className="fund-txt-14 titulo-negrita">Vacunación</span>
              {animal.vacunacion ? (
                      <i
                        className="fas fa-toggle-on primary fund-mr-8 fund-pointer"
                        onClick={() => {
                          setanimal({
                            ...animal,
                            vacunacion: !animal.vacunacion,
                          });
                        }}
                      />
                    ) : (
                      <i
                        className="fad fa-toggle-off fund-mr-8 fund-pointer"
                        onClick={() => {
                          setanimal({
                            ...animal,
                            vacunacion: !animal.vacunacion,
                          });
                        }}
                      />
                    )}
            </div>
            <div className="fund-form-field-row">
              <span className="fund-txt-14 titulo-negrita">Desparasitación</span>
              {animal.desparasitacion ? (
                      <i
                        className="fas fa-toggle-on primary fund-mr-8 fund-pointer"
                        onClick={() => {
                          setanimal({
                            ...animal,
                            desparasitacion: !animal.desparasitacion,
                          });
                        }}
                      />
                    ) : (
                      <i
                        className="fad fa-toggle-off fund-mr-8 fund-pointer"
                        onClick={() => {
                          setanimal({
                            ...animal,
                            desparasitacion: !animal.desparasitacion,
                          });
                        }}
                      />
                    )}
            </div>
          </TabPane>
          <TabPane tabId='3'>
              <div className="fund-form-field">
              <span className="fund-txt-14 titulo-negrita">Fotos</span>
              <div className="fund-gallery">
                {animal?.galeria?.fotos?.map((foto, idx) => {
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
                          animal.galeria.fotos = animal.galeria.fotos.filter(
                            (f, i) =>
                               i !== idx
                          );
                          deleteImage(foto);
                          setanimal({
                            ...animal,
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
          </TabPane>

        </TabContent>

        <div className="form-buttons-2option">
        <div>
        <button
            className="fund-btn"
            disabled={isInvalid()}
            onClick={() => {
              if (animal.id) {
                updateAnimal(animal);
              } else {
                createAnimal(animal);
              }
              onClose();
            }}
          >
            {animal.id ? 'Guadar' : 'Crear'}
          </button>
          </div>
          <div className='form-buttons-2option-cancelar'>
          <button className="fund-btn"
            onClick={() =>
              onClose()}>
            Cancelar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
