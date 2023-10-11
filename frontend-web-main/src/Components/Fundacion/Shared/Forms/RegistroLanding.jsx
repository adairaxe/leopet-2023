import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './RegistroLanding.scss';
import { registerFundacion as register } from '../../../../Service/Fundaciones';
import { GLOBALCONFIG } from '../../../Config';

const RegistroLanding = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  const registerFundation = (fundation) => {
    register(fundation, {
      apiUrl:
        window.userSigned?.apiUrl ||
        GLOBALCONFIG.EndpointBackHost + ':' + GLOBALCONFIG.EndpointBackPort,
    })
      .then(() => {
        console.log('Ok');
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  return (
    <>
      <div className="contenedor my-8">
        <Formik
          initialValues={{
            nombre: '',
            correo: '',
            ruc: '',
            direccion: '',
            telefono: '',
          }}
          validate={(valores) => {
            let errores = {};

            // Validacion nombre
            if (!valores.nombre) {
              errores.nombre = 'Por favor ingresa un nombre';
            }

            // Validacion correo
            if (!valores.ruc) {
              errores.ruc = 'Por favor ingresar el RUC';
            } else if (!/^[0-9]{13,14}$/.test(valores.ruc)) {
              errores.ruc =
                'El ruc solo puede contener números y 13 o 14 números.';
            }

            // Valacion direccion
            if (!valores.direccion) {
              errores.direccion = 'Por favor ingresar la Dirección.';
            }

            // Validacion telefono
            if (!valores.telefono) {
              errores.telefono = 'Por favor ingresar el Teléfono';
            } else if (!/^[0-9]{7,10}$/.test(valores.telefono)) {
              errores.telefono = 'Formato incorrecto del Teléfono';
            }

            return errores;
          }}
          onSubmit={(valores, { resetForm }) => {
            registerFundation({
              ruc: valores.ruc,
              nombre: valores.nombre,
              direccion: valores.direccion,
              telefono: valores.telefono,
            });
            resetForm();
            cambiarFormularioEnviado(true);
            setTimeout(() => cambiarFormularioEnviado(false), 5000);
          }}
        >
          {({ errors }) => (
            <Form className="formulario">
              <div>
                <label htmlFor="ruc">RUC</label>
                <Field
                  type="text"
                  id="ruc"
                  name="ruc"
                  placeholder="1723456789101"
                />
                <ErrorMessage
                  name="ruc"
                  component={() => <div className="error">{errors.ruc}</div>}
                />
              </div>
              <div>
                <label htmlFor="nombre">Nombre</label>
                <Field
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Animal Project Ec"
                />
                <ErrorMessage
                  name="nombre"
                  component={() => <div className="error">{errors.nombre}</div>}
                />
              </div>

              <div>
                <label htmlFor="direccion">Dirección</label>
                <Field
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="José de Antepara 1306 y Aguirre, Guayaquil, GUAYAS"
                />
                <ErrorMessage
                  name="direccion"
                  component={() => (
                    <div className="error">{errors.direccion}</div>
                  )}
                />
              </div>
              <div>
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="3166192"
                />
                <ErrorMessage
                  name="telefono"
                  component={() => (
                    <div className="error">{errors.telefono}</div>
                  )}
                />
              </div>

              <button type="submit">Enviar</button>
              {formularioEnviado && (
                <p className="exito">Formulario enviado con exito!</p>
              )}
            </Form>
          )}

          {/* {( {values, errors, touched,
          handleSubmit, handleChange, handleBlur} ) => (
            <form className="formulario" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="John Doe"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.nombre && errors.nombre &&
                <div className="error">{errors.nombre}</div>}
              </div>
              <div>
                <label htmlFor="correo">Correo</label>
                <input
                  type="text"
                  id="correo"
                  name="correo"
                  placeholder="correo@correo.com"
                  value={values.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.correo && errors.correo &&
                <div className="error">{errors.correo}</div>}
              </div>
              <button type="submit">Enviar</button>
              {formularioEnviado &&
              <p className="exito">Formulario enviado con exito!</p>}
            </form>
          )} */}
        </Formik>
      </div>
    </>
  );
};

export default RegistroLanding;
