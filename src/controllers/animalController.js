/* eslint-disable no-await-in-loop, no-console, prefer-const, camelcase, eqeqeq */
const _ = require('lodash');
const { Op } = require('sequelize');

const { validateRequest } = require('../helpers');
const { STATUS_ANIMAL } = require('../constants');
const {
  getFundacionInfo,
  getHistorialAnimal,
  parseData,
  validateAdminFund,
  validateUpdateAnimal,
} = require('./helpers');

const Animal = require('../DB/animal');
const ManadaAnimal = require('../DB/manada_animal');
const Manada = require('../DB/manada');

/**
 * Funcion para crear un animal en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */

// DESCOMENTAR
exports.createAnimal = async (req, res) => {
  // await validateRequest(req);
  try {
    const { User } = req;
    const {
      nombre, especie, raza, descripcion, imagen, galeria,
      sexo,
      peso,
      enfermedades,
      esterilizacion,
      vacunacion,
      desparasitacion,
    } = req.body;

    /* if (!(await validateAdminFund(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    } */
    const animal = await Animal.create({
      nombre,
      status: STATUS_ANIMAL.NO_APADRINADO,
      especie,
      raza,
      descripcion,
      imagen: '',
      galeria,
      // fundacion_id: User.fundacionId,
      fundacion_id: User.id,
      visible: true,
      sexo,
      peso,
      enfermedades,
      esterilizacion,
      vacunacion,
      desparasitacion,
    });
    const response = {
      mensaje: 'Animal creado exitosamente.',
      result: animal,
    };
    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

/**
 * Funcion para actualizar la informacion de un animal en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updateAnimal = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { animalId } = req.params;
    const {
      nombre, especie, raza, descripcion, galeria,
      sexo,
      edad,
      peso,
      enfermedades,
      esterilizacion,
      vacunacion,
      desparasitacion,
    } = req.body;
    const response = {
      result: [],
    };
    if (
      (await validateAdminFund(User.id))
      && (await validateUpdateAnimal(User.fundacionId, animalId))
    ) {
      const update = {
        ...(!_.isEmpty(nombre) ? { nombre } : {}),
        ...(!_.isEmpty(especie) ? { especie } : {}),
        ...(!_.isEmpty(raza) ? { raza } : {}),
        ...(!_.isEmpty(descripcion) ? { descripcion } : {}),
        ...(!_.isEmpty(galeria) ? { galeria } : {}),
        sexo,
        edad,
        peso,
        enfermedades,
        esterilizacion,
        vacunacion,
        desparasitacion,
        updatedAt: Date.now(),
      };
      const animal = await Animal.update(update, {
        where: { id: animalId, fundacion_id: User.fundacionId },
      });
      response.mensaje = 'Informacion del animal actualizada.';
      response.result = animal;
    }
    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

/**
 * Funcion para obtener la informacion de todos los animales, filtrado con o sin referencia de
 * la manada, la respuesta la retorna de forma paginada
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getAllAnimals = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { especie = {}, manada = {} } = req.body;
    const { q } = req.query;
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '1', 10);
    let total;
    let query = {};
    let responseBody;
    const result = [];
    if (!_.isNumber(manada)) {
      query = {
        where: {
          ...(!_.isEmpty(especie) ? { especie } : {}),
          ...(!_.isEmpty(q) ? { nombre: { [Op.regexp]: q } } : {}),
          visible: true,
        },
        order: [['id', 'DESC']],
        offset: (page - 1) * limit,
        limit,
      };
      responseBody = await Animal.findAndCountAll(query);
      const { rows, count } = responseBody;
      total = count;
      for (const animals of rows) {
        const fundacionId = _.get(animals, 'fundacion_id');
        const fundacion = await getFundacionInfo(fundacionId);
        const data = parseData(animals, fundacion);
        result.push(data);
      }
    } else {
      query = {
        where: {
          id: manada,
        },
      };
      const responseManada = await Manada.findOne(query);
      if (
        !_.isEmpty(responseManada)
        && _.isEqual(responseManada.userId, User.id)
      ) {
        query = {
          where: {
            manada_id: manada,
          },
        };
        responseBody = await ManadaAnimal.findAndCountAll(query);
        const { rows, count } = responseBody;
        total = count;
        for (const animal of rows) {
          query = {
            where: {
              id: animal.animal_id,
            },
          };
          const animals = await Animal.findOne(query);
          const fundacionId = _.get(animals, 'fundacion_id');

          const fundacion = await getFundacionInfo(fundacionId);
          let historial = await getHistorialAnimal(User.id, animals.id);
          if (_.isNull(historial)) {
            historial = {};
          }
          const data = parseData(animals, fundacion, historial);
          result.push(data);
        }
      } else {
        total = 0;
      }
    }
    const totalPages = Math.ceil(total / limit);
    const response = {
      limit,
      page,
      totalPages,
      total,
      result,
    };
    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

exports.getAllAnimalsApp = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { tipoAnimal = {} } = req.body;
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '1', 10);
    let total;
    let query = {};
    let responseBody;
    const result = [];
    if (!_.isNull(tipoAnimal)) {
      if (tipoAnimal == 'TODOS') {
        query = {
          where: {
            visible: true,
          },
          order: [['id', 'DESC']],
          offset: (page - 1) * limit,
          limit,
        };
      } else {
        query = {
          where: {
            especie: tipoAnimal,
            visible: true,
          },
          order: [['id', 'DESC']],
          offset: (page - 1) * limit,
          limit,
        };
      }
    }

    responseBody = await Animal.findAndCountAll(query);
    const { rows, count } = responseBody;
    total = count;
    for (const animals of rows) {
      const fundacionId = _.get(animals, 'fundacion_id');
      const fundacion = await getFundacionInfo(fundacionId);
      const data = parseData(animals, fundacion);
      result.push(data);
    }

    const totalPages = Math.ceil(total / limit);
    const response = {
      limit,
      page,
      totalPages,
      total,
      result,
    };

    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

exports.getAllAnimalsFundacionApp = async (req, res) => {
  await validateRequest(req);
  try {
    const { id_fundacion = {} } = req.body;
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '1', 10);
    let total;
    let query = {};
    let responseBody;
    const result = [];
    if (!_.isNull(id_fundacion)) {
      query = {
        where: {
          fundacion_id: id_fundacion,
          visible: true,
        },
        order: [['id', 'DESC']],
        offset: (page - 1) * limit,
        limit,
      };
    }

    responseBody = await Animal.findAndCountAll(query);
    const { rows, count } = responseBody;
    total = count;
    for (const animals of rows) {
      const fundacionId = _.get(animals, 'fundacion_id');
      const fundacion = await getFundacionInfo(fundacionId);
      const data = parseData(animals, fundacion);
      result.push(data);
    }

    const totalPages = Math.ceil(total / limit);
    const response = {
      limit,
      page,
      totalPages,
      total,
      result,
    };

    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

/**
 * Funcion para obtener todas las especies de los animales registrados en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getEspecies = async (req, res) => {
  try {
    const responseBody = await Animal.findAll({
      where: { visible: true },
      attributes: ['especie'],
      group: ['especie'],
    });
    const result = [];
    for (const especie of responseBody) {
      result.push(_.get(especie, 'especie'));
    }
    const response = {
      result,
    };

    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

/**
 * Funcion para obtener la informacion de un solo animal
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getAnimal = async (req, res) => {
  await validateRequest(req);
  try {
    const { animalId } = req.params;
    let result = [];
    const response = {
      result,
    };

    const responseBody = await Animal.findOne({
      where: { id: animalId, visible: true },
    });

    if (_.isEmpty(responseBody)) {
      return res.send(response);
    }
    result = responseBody;
    response.result = result;
    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

/**
 * Funcion para buscar un animal filtrado por el nombre del mismo
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.searchAnimal = async (req, res) => {
  await validateRequest(req);
  try {
    const { q } = req.query;
    let result = [];
    const response = {
      result,
    };
    const responseBody = await Animal.findAll({
      where: { nombre: { [Op.regexp]: `${q}` }, visible: true },
    });

    if (_.isEmpty(responseBody)) {
      return res.send(response);
    }
    result = responseBody;
    response.result = result;
    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

/**
 * Funcion para eliminar un animal, se realiza un borrado logico, cambiando el estado
 * del campo visible
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.deleteAnimal = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { animalId } = req.params;

    if (!(await validateAdminFund(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }

    let mensaje = 'Animal eliminado exitosamente';
    const animal = await Animal.findOne({
      where: { id: animalId, visible: true },
    });
    if (_.isEmpty(animal)) {
      mensaje = 'Animal no encontrado';
    }

    const update = {
      visible: false,
      updatedAt: Date.now(),
    };
    await Animal.update(update, {
      where: { id: animalId, fundacion_id: User.fundacionId },
    });
    const response = {
      mensaje,
      result: animal,
    };
    return res.send(response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};
