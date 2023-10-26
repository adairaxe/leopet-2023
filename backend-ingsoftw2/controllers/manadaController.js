/* eslint-disable no-await-in-loop, no-console */
const _ = require('lodash');
const { Op } = require('sequelize');

const { validateRequest } = require('../helpers');
const { createProductManada } = require('./helpersPayPal');

const {
  getHistorialAnimal,
  validateManada,
  validateAnimalManada,
} = require('./helpers');

const db = require('../DB/index');

const NUMERO_MAXIMO_FOTOS = 4;

/**
 * Funcion para crear una manada en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.createManada = async (req, res) => {
  await validateRequest(req);
  const { User } = req;

  try {
    const { nombre, monto ,galeriamanada} = req.body;

    const manada = await db.Manada.create({
      nombre,
      monto,
      userId: User.id,
      status: 1,
      galeriamanada
    });
    const data = {
      id: _.get(manada, 'id'),
      nombre,
    };
    await createProductManada(data);

    const response = {
      mensaje: 'Manada creada exitosamente',
      manada,
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
 * Funcion para agregar animales a una manada previamente registrada en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.addAnimals = async (req, res) => {
  await validateRequest(req);
  const { User } = req;

  try {
    const { manada, manadaId } = req.body;
    const animals = _.get(manada, 'animalId');

    if (!(await validateManada(manadaId, User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }

    const query = {
      manada_id: manadaId,
      userId: User.id,
    };
    const responses = [];
    for (const animal of animals) {
      query.animal_id = animal;
      let data = 'Este animal ya se encuentra agregado a la manada';
      if (await validateAnimalManada(manadaId, animal)) {
        data = await db.ManadaAnimal.create(query);
      }
      responses.push(data);
    }
    const response = {
      mensaje: 'Animales agregados exitosamente a la manada',
      data: responses,
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
 * Funcion para obtener la informacion de las manadas asociadas a un Donador
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getManadas = async (req, res) => {
  // FIX NUMERO DE FOTOS
  await validateRequest(req);
  try {
    const { User } = req;
    const { q } = req.query;
    const limit = parseInt(req.query.limit || '1', 10);
    const page = parseInt(req.query.page || '1', 10);
    const query = {
      where: {
        userId: User.id,
        status: true,
        ...(!_.isEmpty(q) ? { nombre: { [Op.regexp]: q } } : {}),
      },
      order: [['id', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    };
    const responseBody = await db.Manada.findAndCountAll(query);
    const { count } = responseBody;
    const totalPages = Math.ceil(count / limit);
    const manadas = responseBody.rows;
    const responses = [];
    for (const manada of manadas) {
      const data = {};
      const manadaId = _.get(manada, 'id');
      data.id = manadaId;
      data.nombre = _.get(manada, 'nombre');
      data.monto = _.get(manada, 'monto');
      data.galeriamanada = _.get(manada, 'galeriamanada');
      data.statusSubscription = _.get(manada, 'statusSubscription', false);
      const animals = await db.ManadaAnimal.findAndCountAll({
        where: {
          manada_id: manadaId,
        },
      });
      data.apadrinados = animals.count;
      const animalData = animals.rows;
      const fotos = [];
      for (const animal of animalData) {
        const animalData1 = await db.Animal.findOne({
          where: {
            id: animal.animal_id,
            visible: true,
          },
        });
        const firstPhoto = _.first(_.get(animalData1, 'galeria.fotos'));
        if (_.size(fotos) <= NUMERO_MAXIMO_FOTOS) {
          fotos.push(firstPhoto);
        }
      }
      if (_.isEqual(_.size(fotos), 3)) {
        fotos.pop();
      }
      data.galeria = fotos;
      responses.push(data);
    }
    const response = {
      limit,
      page,
      totalPages,
      count,
      result: responses,
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
 * Funcion para obtener todos los animales asociados a una manada en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getAnimalManadas = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { manadaId } = req.params;
    let query = {
      where: {
        manada_id: manadaId,
      },
    };
    const responseBody = await db.ManadaAnimal.findAll(query);
    const result = [];
    for (const animal of responseBody) {
      query = {
        where: {
          id: animal.animal_id,
          visible: true,
        },
      };
      const animals = await db.Animal.findOne(query);
      const fundacionId = _.get(animals, 'fundacion_id');
      const fundacion = await db.Fundacion.findOne({
        where: {
          id: fundacionId,
          aprobado: true,
        },
      });
      const historial = await getHistorialAnimal(User.id, animals.id);
      const data = {
        id: _.get(animals, 'id'),
        nombre: _.get(animals, 'nombre'),
        status: _.get(animals, 'status'),
        especie: _.get(animals, 'especie'),
        raza: _.get(animals, 'raza'),
        descripcion: _.get(animals, 'descripcion'),
        galeria: _.get(animals, 'galeria'),
        fundacion_id: _.get(animals, 'fundacion_id'),
        fundacion: _.get(fundacion, 'nombre'),
        historial,
        createdAt: _.get(animals, 'createdAt'),
        updatedAt: _.get(animals, 'updatedAt'),
      };
      result.push(data);
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
 * Funcion para filtrar Manadas a traves de un parametro de busqueda
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.searchManada = async (req, res) => {
  try {
    const { q } = req.query;
    let result = [];
    const response = {
      result,
    };
    const responseBody = await db.Manada.findAll({
      where: { nombre: { [Op.regexp]: `${q}` } },
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
 * Funcion para eliminar un animal asociado a una manada
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.deleteAnimalManada = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { manadaId, animalId } = req.body;
    const validationManada = await validateManada(manadaId, User.id);

    if (!validationManada) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }
    await db.ManadaAnimal.destroy({
      where: { manada_id: manadaId, animal_id: animalId },
    });
    const response = { result: 'Animal eliminado de la manada' };
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
 * Funcion para eliminar una manada, se realiza un borrado logico cambiando el estado del campo
 * status a false
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.deleteManada = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { id } = req.body;
    const validationManada = await validateManada(id, User.id);

    if (!validationManada) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }
    const update = {
      status: false,
      updatedAt: Date.now(),
    };
    await db.Manada.update(update, {
      where: { id },
    });
    const response = { result: 'Manada eliminada exitosamente' };
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
 * Funcion para actualizar la informacion de una manada en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updateInfoManada = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { id, nombre, monto,galeriamanada } = req.body;
    const validationManada = await validateManada(id, User.id);
    const response = {
      result: 'No tiene credenciales',
    };
    if (validationManada) {
      const update = {
        ...(!_.isEmpty(nombre) ? { nombre } : {}),
        ...(!_.isEmpty(monto) ? { monto } : {}),
        ...(!_.isEmpty(galeriamanada) ? { galeriamanada } : {}),
        updatedAt: Date.now(),
      };
      await db.Manada.update(update, {
        where: { id },
      });
      response.result = 'Informacion actualizada';
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
