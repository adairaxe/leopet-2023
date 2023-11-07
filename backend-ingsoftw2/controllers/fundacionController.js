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

const Usuario = require("../DB/usuario");
const Fundacion = require("../DB/fundacion");
const Animal = require("../DB/animal");
const ManadaAnimal = require("../DB/manada_animal");
const Manada = require("../DB/manada");
const Notificacion = require("../DB/notificacion");
const AdminFund = require("../DB/administrador_fund");

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
    const fundacion = await Fundacion.create({
      ruc,
      nombre,
      direccion,
      telefono,
      aprobado: true,
      comision,
      logo: ""
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
    const fundacion = await Fundacion.create({
      ruc,
      nombre,
      direccion,
      telefono,
      //aprobado: false,
      aprobado: true,
      comision,
      logo: ""
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
    const fundacion = await Fundacion.update(update, {
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

    const fundaciones = await Fundacion.findAndCountAll(query);
    const { count, rows } = fundaciones;
    for (const fundacion of rows) {
      const adminFun = await AdminFund.findOne({
        where: { fundacion_id: fundacion.id },
      });
      const cuentaBancaria = await getCuentaBancaria(fundacion.id);
      fundacion.cuentaBancaria = cuentaBancaria;
      if (_.isEmpty(adminFun)) {
        fundacion.user = {};
      } else {
        const admin = await Usuario.findOne({ where: { id: adminFun.id } });
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
    const animales = await Animal.findAndCountAll(query);
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
    const animales = await Animal.findAndCountAll(query);
    const { count } = animales;    
    for (const animal of  animales.rows) {
      const animalId = _.get(animal, "id");
      const manadasAnimal = await ManadaAnimal.findAndCountAll({
        where: {
          animal_id: animalId,
        },
      });      
      for (const manadaAnimal of manadasAnimal.rows){
        const manadaId = _.get(manadaAnimal, "manada_id");
        const manada = await Manada.findOne({
          where: {
            id: manadaId,
          },
        });
        const donadorId = _.get(manada, "userId");
        const donador = await Usuario.findOne({
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
    const animales = await Animal.findAndCountAll(query);
    const { count } = animales;    
    for (const animal of  animales.rows) {
      const animalId = _.get(animal, "id");
      const manadasAnimal = await ManadaAnimal.findAndCountAll({
        where: {
          animal_id: animalId,
        },
      });      
      for (const manadaAnimal of manadasAnimal.rows){
        const manadaId = _.get(manadaAnimal, "manada_id");
        const manada = await Manada.findOne({
          where: {
            id: manadaId,
          },
        });
        const donadorId = _.get(manada, "userId");
        const donador = await Usuario.findOne({
          where: {
            id: donadorId,
          },
        });

        const notificacion = await Notificacion.findOne({ 
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
  try {
    const { fundacionId } = req.body;
    const estate_update = {
      aprobado: false,
      updatedAt: Date.now(),
    };
    const fundacion_response = await Fundacion.update(estate_update, {
      where: { ruc: fundacionId },
    });

    return res.send(fundacion_response);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};
