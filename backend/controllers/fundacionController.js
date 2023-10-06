/* eslint-disable no-await-in-loop, no-console */

const _ = require('lodash');
const { Op } = require('sequelize');

const { validateRequest } = require('../helpers');
const {
  getCuentaBancaria,
  validateAdminFund,
  validateFundacion,
  validateSuperAdmin,
  parseDataPadrinosAnimal,
  parseDataAnimalComision,
} = require("./helpers");
//} = require('./helpers');

const db = require('../DB/index');

/**
 * Funcion para crear una fundacion por parte del administrador de la plataforma en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.createFundacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const {
      ruc, nombre, direccion, telefono,comision
    } = req.body;

    if (!(await validateSuperAdmin(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }
    if (await validateFundacion(ruc)) {
      return res.status(400).send({
        error: 'Ya se encuentra registrada una fundacion con ese RUC',
      });
    }
    const fundacion = await db.Fundacion.create({
      ruc,
      nombre,
      direccion,
      telefono,
      aprobado: true,
      comision,
      //logo: "a logo"
    });
    const response = {
      mensaje: 'Fundacion registrada exitosamente.',
      result: fundacion,
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
 * Funcion para enviar una fundacion por desde el Landing Page de la plataforma en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.registerFundacion = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      ruc, nombre, direccion, telefono,comision
    } = req.body;
    if (await validateFundacion(ruc)) {
      return res.status(400).send({
        error: 'La Fundación ya ha registrado una solicitud',
      });
    }
    const fundacion = await db.Fundacion.create({
      ruc,
      nombre,
      direccion,
      telefono,
      aprobado: false,
      comision,
    });
    const response = {
      mensaje: 'La solicitud de registro ha sido enviada.',
      result: fundacion,
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
 * Funcion para actualizar la informacion de una fundacion por parte del administrador de la plataforma
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updateInfoFundacion = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      id, ruc, nombre, direccion, telefono, aprobado,comision
    } = req.body;
    const update = {
      ...(!_.isEmpty(ruc) ? { ruc } : {}),
      ...(!_.isEmpty(nombre) ? { nombre } : {}),
      ...(!_.isEmpty(direccion) ? { direccion } : {}),
      ...(!_.isEmpty(telefono) ? { telefono } : {}),
      ...(_.isBoolean(aprobado) ? { aprobado } : {}),
      ...(!_.isEmpty(comision) ? { comision } : {}),
      updatedAt: Date.now(),
    };
    const fundacion = await db.Fundacion.update(update, {
      where: { id },
    });

    const response = {
      mensaje: 'Informacion actualizada exitosamente.',
      result: fundacion,
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
 * Funcion para obtener la informacion de todas las fundaciones registradas en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getFundaciones = async (req, res) => {
  await validateRequest(req);
  try {
    const { q } = req.query;
    const limit = parseInt(req.query.limit || '1', 10);
    const page = parseInt(req.query.page || '1', 10);
    const query = {
      where: {
        ...(!_.isEmpty(q) ? { nombre: { [Op.regexp]: q } } : {}),
      },
      offset: (page - 1) * limit,
      limit,
      raw: true,
    };

    const fundaciones = await db.Fundacion.findAndCountAll(query);
    const { count, rows } = fundaciones;
    for (const fundacion of rows) {
      const adminFun = await db.AdminFund.findOne({
        where: { fundacion_id: fundacion.id },
      });
      const cuentaBancaria = await getCuentaBancaria(fundacion.id);
      fundacion.cuentaBancaria = cuentaBancaria;
      if (_.isEmpty(adminFun)) {
        fundacion.user = {};
      } else {
        const admin = await db.Usuario.findOne({ where: { id: adminFun.id } });
        fundacion.user = !_.isEmpty(admin) ? admin : {};
      }
    }
    const totalPages = Math.ceil(count / limit);
    const response = {
      limit,
      page,
      totalPages,
      count,
      result: fundaciones.rows,
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
 * Funcion para obtener todos los animales asociados a una fundacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getAnimalFundaciones = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { q } = req.query;
    const limit = parseInt(req.query.limit || '1', 10);
    const page = parseInt(req.query.page || '1', 10);

    if (!(await validateAdminFund(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }

    const query = {
      where: {
        fundacion_id: User.fundacionId,
        ...(!_.isEmpty(q) ? { nombre: { [Op.regexp]: q } } : {}),
        visible: true,
      },
      offset: (page - 1) * limit,
      limit,
    };
    const animales = await db.Animal.findAndCountAll(query);
    const { count } = animales;
    const totalPages = Math.ceil(count / limit);
    const response = {
      limit,
      page,
      totalPages,
      count,
      result: animales.rows,
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

exports.getAnimalPadrinosFundacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { q } = req.query;
    const { fundacionId } = req.params;
    const limit = parseInt(req.query.limit || "1", 10);
    const page = parseInt(req.query.page || "1", 10);
    const result = [];    
    const query = {
      where: {
        fundacion_id: fundacionId,  
        visible: true,      
      },
      /*offset: (page - 1) * limit,
      limit,*/
    };
    const animales = await db.Animal.findAndCountAll(query);
    const { count } = animales;    
    for (const animal of  animales.rows) {
      const animalId = _.get(animal, "id");
      const manadasAnimal = await db.ManadaAnimal.findAndCountAll({
        where: {
          animal_id: animalId,
        },
      });      
      for (const manadaAnimal of manadasAnimal.rows){
        const manadaId = _.get(manadaAnimal, "manada_id");
        const manada = await db.Manada.findOne({
          where: {
            id: manadaId,
          },
        });
        const donadorId = _.get(manada, "userId");
        const donador = await db.Usuario.findOne({
          where: {
            id: donadorId,
          },
        });
        const data =parseDataPadrinosAnimal(animal,manada,donador);        
        result.push(data);
      }      
    }
    const totalPages = Math.ceil(count / limit);
    const response = {
      limit,
      page,
      totalPages,
      count,
      result: result,
    };
    return res.send(response);
  } catch (error) {
    console.log("ERROR", error);
    const responseError = {
      message: "Something bad happened!",
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

exports.getAnimalPadrinosCalificacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { q } = req.query;
    const { fundacionId } = req.params;
    const limit = parseInt(req.query.limit || "1", 10);
    const page = parseInt(req.query.page || "1", 10);
    const result = [];    
    const query = {
      where: {
        fundacion_id: fundacionId,  
        visible: true,      
      },
      /*offset: (page - 1) * limit,
      limit,*/
    };
    const animales = await db.Animal.findAndCountAll(query);
    const { count } = animales;    
    for (const animal of  animales.rows) {
      const animalId = _.get(animal, "id");
      const manadasAnimal = await db.ManadaAnimal.findAndCountAll({
        where: {
          animal_id: animalId,
        },
      });      
      for (const manadaAnimal of manadasAnimal.rows){
        const manadaId = _.get(manadaAnimal, "manada_id");
        const manada = await db.Manada.findOne({
          where: {
            id: manadaId,
          },
        });
        const donadorId = _.get(manada, "userId");
        const donador = await db.Usuario.findOne({
          where: {
            id: donadorId,
          },
        });

        const notificacion = await db.Notificacion.findOne({ 
          limit: 1 ,
          where: {
            usuario_id: donadorId,
            fundacion_id: fundacionId,
            animal_id: animalId,
          },
          order: [['id', 'DESC']],
        });
        const data =parseDataAnimalComision(animal,manada,donador,notificacion);        
        result.push(data);
      }      
    }
    const totalPages = Math.ceil(count / limit);
    const response = {
      limit,
      page,
      totalPages,
      count,
      result: result,
    };
    return res.send(response);
  } catch (error) {
    console.log("ERROR", error);
    const responseError = {
      message: "Something bad happened!",
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};


/**
 * Funcion para eliminar una fundacion, se realiza un borrado logico, cambiando el estado
 * del campo aprobado
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.deleteFundacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { fundacionId } = req.body;
    const update = {
      aprobado: false,
      updatedAt: Date.now(),
    };
    const fundacion = await db.Fundacion.update(update, {
      where: { id: fundacionId, aprobado: true },
    });

    const response = {
      mensaje: 'Fundacion eliminada.',
      result: fundacion,
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
