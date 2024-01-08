/* eslint-disable no-await-in-loop, no-console */

const _ = require('lodash');
const Fundacion = require('../DB/fundacion');
const Animal = require('../DB/animal');
const ManadaAnimal = require('../DB/manada_animal');
const Manada = require('../DB/manada');
const CuentaBancaria = require('../DB/cuenta_bancaria');
const Donacion = require('../DB/donacion');
const Evidencia = require('../DB/evidencia');
const Usuario = require('../DB/usuario');

const { STATUS_ANIMAL, ROL } = require('../constants');

/**
 * Funcion para parsear la informacion, retorna un nuevo objeto
 * @param  {Object} animal
 * @param  {Object} fundacion
 * @param  {Object} historial
 * @return {Object} response
 */
exports.parseData = (animal, fundacion, historial = {}) => {
  const data = {
    id: _.get(animal, 'id'),
    nombre: _.get(animal, 'nombre'),
    status: _.get(animal, 'status'),
    especie: _.get(animal, 'especie'),
    raza: _.get(animal, 'raza'),
    descripcion: _.get(animal, 'descripcion'),
    edad: _.get(animal, 'edad'),
    sexo: _.get(animal, 'sexo'),
    peso: _.get(animal, 'peso'),
    enfermedades: _.get(animal, 'enfermedades'),
    esterilizacion: _.get(animal, 'esterilizacion'),
    vacunacion: _.get(animal, 'vacunacion'),
    desparasitacion: _.get(animal, 'desparasitacion'),
    fecha_rescate: _.get(animal, 'fecha_rescate'),
    fecha_registro: _.get(animal, 'fecha_registro'),
    imagen: _.get(animal, 'imagen'),
    galeria: _.get(animal, 'galeria'),
    fundacion_id: _.get(animal, 'fundacion_id'),
    fundacion: _.get(fundacion, 'nombre'),
    ...(!_.isEmpty(historial) ? { historial } : {}),
    createdAt: _.get(animal, 'createdAt'),
    updatedAt: _.get(animal, 'updatedAt'),
  };
  return data;
};

exports.parseDataActualizacion = (
  actualizacion,
  animal,
  fundacion = {},
) => {
  const data = {
    id: _.get(actualizacion, 'id'),
    fecha: _.get(actualizacion, 'fecha'),
    descripcion: _.get(actualizacion, 'descripcion'),
    estado_salud: _.get(actualizacion, 'estado_salud'),
    image: _.get(actualizacion, 'image'),
    calificacion: _.get(actualizacion, 'calificacion'),
    fundacion_id: _.get(actualizacion, 'fundacion_id'),
    fundacion: _.get(fundacion, 'nombre'),
    galeria: _.get(actualizacion, 'galeria'),
    animal: {
      id: _.get(animal, 'id'),
      nombre: _.get(animal, 'nombre'),
      status: _.get(animal, 'status'),
      especie: _.get(animal, 'especie'),
      raza: _.get(animal, 'raza'),
      descripcion: _.get(animal, 'descripcion'),
      imagen: _.get(animal, 'imagen'),
      galeria: _.get(animal, 'galeria'),
      fundacion_id: _.get(animal, 'fundacion_id'),
      edad: _.get(animal, 'edad'),
      sexo: _.get(animal, 'sexo'),
      peso: _.get(animal, 'peso'),
      enfermedades: _.get(animal, 'enfermedades'),
      esterilizacion: _.get(animal, 'esterilizacion'),
      vacunacion: _.get(animal, 'vacunacion'),
      desparasitacion: _.get(animal, 'desparasitacion'),
      fecha_rescate: _.get(animal, 'fecha_rescate'),
      fecha_registro: _.get(animal, 'fecha_registro'),
    },
  };
  return data;
};

exports.parseDataNotificacion = (
  notificacion,
  actualizacion,
  animal,
  fundacion = {},
) => {
  /* fundacion,  galeria  = {}) => { */
  const data = {
    id: _.get(notificacion, 'id'),
    leido: _.get(notificacion, 'leido'),
    calificacion: _.get(notificacion, 'calificacion'),
    actualizacion: {
      fecha: _.get(actualizacion, 'fecha'),
      descripcion: _.get(actualizacion, 'descripcion'),
      estado_salud: _.get(actualizacion, 'estado_salud'),
      image: _.get(actualizacion, 'image'),
      fundacion_id: _.get(actualizacion, 'fundacion_id'),
      fundacion: _.get(fundacion, 'nombre'),
      /* galeria: galeria.rows, */
      galeria: _.get(actualizacion, 'galeria'),
    },
    animal: {
      id: _.get(animal, 'id'),
      nombre: _.get(animal, 'nombre'),
      status: _.get(animal, 'status'),
      especie: _.get(animal, 'especie'),
      raza: _.get(animal, 'raza'),
      descripcion: _.get(animal, 'descripcion'),
      imagen: _.get(animal, 'imagen'),
      galeria: _.get(animal, 'galeria'),
      fundacion_id: _.get(animal, 'fundacion_id'),
      edad: _.get(animal, 'edad'),
      peso: _.get(animal, 'peso'),
      sexo: _.get(animal, 'sexo'),
      enfermedades: _.get(animal, 'enfermedades'),
      esterilizacion: _.get(animal, 'esterilizacion'),
      vacunacion: _.get(animal, 'vacunacion'),
      desparasitacion: _.get(animal, 'desparasitacion'),
      fecha_rescate: _.get(animal, 'fecha_rescate'),
      fecha_registro: _.get(animal, 'fecha_registro'),
    },
  };
  return data;
};

exports.parseDataPadrinosAnimal = (animal, manada, donador = {}) => {
  const data = {
    nombre: _.get(animal, 'nombre'),
    especie: _.get(animal, 'especie'),
    raza: _.get(animal, 'raza'),
    padrinoNombre: _.get(donador, 'nombres'),
    padrinoApellido: _.get(donador, 'apellidos'),
    manadaNombre: _.get(manada, 'nombre'),
    monto: _.get(manada, 'monto'),
  };
  return data;
};

exports.parseDataAnimalComision = (animal, manada, donador, notificacion = {}) => {
  const comision = 15;
  const montocomision = _.get(manada, 'monto') * (comision / 100);
  const subtotal = _.get(manada, 'monto') - (_.get(manada, 'monto') * (comision / 100));
  let calificacion = _.get(notificacion, 'calificacion');
  calificacion = calificacion == null ? 0 : calificacion;
  let total;
  if (calificacion >= 0 && calificacion < 1) {
    total = subtotal * 0;
  } else if (calificacion >= 1 && calificacion < 2) {
    total = subtotal / 1.25;
  } else if (calificacion >= 2 && calificacion < 3) {
    total = subtotal / 1.50;
  } else if (calificacion >= 3 && calificacion < 4) {
    total = subtotal / 1.75;
  } else if (calificacion >= 4 && calificacion <= 5) {
    total = subtotal;
  }
  const data = {
    nombre: _.get(animal, 'nombre'),
    especie: _.get(animal, 'especie'),
    raza: _.get(animal, 'raza'),
    padrinoNombre: _.get(donador, 'nombres'),
    padrinoApellido: _.get(donador, 'apellidos'),
    manadaNombre: _.get(manada, 'nombre'),
    monto: _.get(manada, 'monto'),
    montocomision,
    subtotal,
    calificacion,
    total,
    animalid: _.get(animal, 'id'),
    userid: _.get(donador, 'id'),
    manadaid: _.get(manada, 'id'),
    notificacionid: _.get(notificacion, 'id'),
  };
  return data;
};

/**
 * Funcion para validar que el usuario es SuperAdmin
 * @param  {Int} userId
 * @return {Boolean} response
 */
exports.validateSuperAdmin = async (userId) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
    });
    if (_.isEqual(usuario.role, ROL.ADMIN.ROL_ID)) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para validar que el usuario es Administrador de Fundacion
 * @param  {Int} userId
 * @return {Boolean} response
 */
exports.validateAdminFund = async (userId) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
    });

    if (_.isEqual(usuario.role, ROL.ADMIN_FUND.ROL_ID)) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para validar que el usuario es Donador
 * @param  {Int} userId
 * @return {Boolean} response
 */
exports.validateDonador = async (userId) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        id: userId,
      },
    });
    if (_.isEqual(usuario.role, ROL.DONADOR.ROL_ID)) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para validar que el Administrador de la Fundacion tiene permiso de actualizar la informacion
 * de un animal en especifico
 * @param  {Int} fundacionId
 * @param  {Int} animalId
 * @return {Boolean} response
 */
exports.validateUpdateAnimal = async (fundacionId, animalId) => {
  try {
    const animal = await Animal.findOne({
      where: {
        id: animalId,
        fundacion_id: fundacionId,
      },
    });

    if (_.isEmpty(animal)) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para validar que un animal ya esta registrado a una manada
 * @param  {Int} manadaId
 * @param  {Int} animalId
 * @return {Boolean} response
 */
exports.validateAnimalManada = async (manadaId, animalId) => {
  try {
    const animal = await ManadaAnimal.findOne({
      where: {
        manada_id: manadaId,
        animal_id: animalId,
      },
    });

    if (_.isEmpty(animal)) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para obtener la informacion de una fundacion
 * @param  {Int} fundacionId
 * @return {Object} response
 */
exports.getFundacionInfo = async (fundacionId) => {
  const fundacion = await Fundacion.findOne({
    where: {
      id: fundacionId,
    },
  });
  return fundacion;
};

/**
 * Funcion para obtener la informacion de una cuenta bancaria asociada a una fundacion
 * @param  {Int} fundacionId
 * @return {Object} response
 */
exports.getCuentaBancaria = async (fundacionId) => {
  const cuentaBancaria = await CuentaBancaria.findOne({
    where: {
      fundacion_id: fundacionId,
    },
  });
  if (_.isEmpty(cuentaBancaria)) {
    return {};
  }
  return cuentaBancaria;
};

/**
 * Funcion para obtener el historial de donaciones de una animal en especifico
 * @param  {Int} donadorId
 * @param  {Int} animalId
 * @return {Object} response
 */
exports.getHistorialAnimal = async (donadorId, animalId) => {
  try {
    const historial = await Donacion.findAll({
      where: {
        donador_id: donadorId,
        animal_id: animalId,
      },
      order: [['id', 'DESC']],
      limit: 10,
      raw: true,
    });
    const evidencias = [];
    if (_.isNull(historial)) {
      return evidencias;
    }
    for (const evidencia of historial) {
      const evidenciaAnimal = await Evidencia.findOne({
        where: {
          donacion_id: evidencia.id,
        },
      });
      evidencia.evidencia = !_.isEmpty(evidenciaAnimal) ? evidenciaAnimal : {};
      evidencias.push(evidencia);
    }
    return evidencias;
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    throw new Error(JSON.stringify(responseError));
  }
};

/**
 * Funcion para validar que una manada pertenece a un Donador
 * @param  {Int} manadaId
 * @param  {Int} userId
 * @return {Boolean} response
 */
exports.validateManada = async (manadaId, userId) => {
  try {
    const data = await Manada.findOne({
      where: {
        id: manadaId,
        userId,
      },
    });
    if (_.isEmpty(data)) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para validar que el RUC o documento de identificacion de una Fundacion
 * no este repetido en la BD
 * @param  {String} ruc
 * @return {Boolean} response
 */
exports.validateFundacion = async (ruc) => {
  try {
    const data = await Fundacion.findOne({
      where: {
        ruc,
      },
    });
    if (_.isEmpty(data)) {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

exports.validateFundacionRegister = async (ruc) => {
  try {
    if (ruc.length !== 13) {
      return false;
    }
    const ultimosTresDigitos = ruc.slice(-3);
    if (ultimosTresDigitos !== '001') {
      return false;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para actualizar el estado de una animal cuando es apadrinado,
 * el estado se cambia de "NO APADRINADO" a "APADRINADO"
 * @param  {Int} animalId
 */
exports.changeStatus = async (animalId) => {
  try {
    const animal = await Animal.findOne({ where: { id: animalId } });
    if (_.isEqual(animal.status, STATUS_ANIMAL.NO_APADRINADO)) {
      const update = {
        status: STATUS_ANIMAL.APADRINADO,
      };
      await Animal.update(update, {
        where: { id: animalId },
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Funcion para obtener las evidencias relacionadas a una donacion
 * @param  {int} donacionId
 * @return {Object} response
 */
exports.getEvidencia = async (donacionId) => {
  try {
    let evidencia = await Evidencia.findOne({
      where: { donacion_id: donacionId },
    });
    if (_.isEmpty(evidencia)) {
      evidencia = {};
    }
    return evidencia;
  } catch (error) {
    throw new Error(error);
  }
};
