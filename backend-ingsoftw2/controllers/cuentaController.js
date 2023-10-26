/* eslint-disable no-console */

const _ = require('lodash');

const { validateRequest } = require('../helpers');

const CuentaBancaria = require("../DB/cuenta_bancaria");


/**
 * Funcion para obtener la informacion de la cuenta bancaria registrada por una fundacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getCuentaBancaria = async (req, res) => {
  await validateRequest(req);
  try {    
    const { id } = req.params;
    const result = await CuentaBancaria.findOne({
      where: {
        fundacion_id: id,
      },
    });
    const response = {
      result,
    };
    console.log(result);
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

exports.getCuentaBancariaPrincipal = async (req, res) => {
  await validateRequest(req);
  try {    
    const { id } = req.params;
    const result = await CuentaBancaria.findOne({
      where: {
        fundacion_id: id,
        principal:true,
      },
    });   
    console.log(result.dataValues);
    return res.send(result.dataValues);
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

exports.getAllCuentaBancaria = async (req, res) => {
  await validateRequest(req);
  try {    
    const { id } = req.params;
    const limit = parseInt(req.query.limit || '1', 10);
    const page = parseInt(req.query.page || '1', 10);
    let result = [];
    const cuentas = await CuentaBancaria.findAndCountAll({
      where: {
        fundacion_id: id,
      },
    });
    const { rows, count } = cuentas;
    result=rows;
    total = count;
    const totalPages = Math.ceil(count / limit);
    const response = {
      limit,
      page,
      totalPages,
      count,
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
 * Funcion para crear una cuenta bancaria de una fundacion en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.crearCuentaBancaria = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      banco, numero, tipo, nombre, fundacionId,
    } = req.body;
    const cuenta = await CuentaBancaria.create({
      banco,
      numero,
      tipo,
      nombre,
      fundacion_id: fundacionId,
    });

    const response = {
      mensaje: 'Cuenta bancaria creada exitosamente.',
      result: cuenta,
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
 * Funcion para actualizar la informacion de una cuenta bancaria asociada a una fundacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updateCuentaBancaria = async (req, res) => {
  await validateRequest(req);
  try {
    const { id } = req.params;
    const {
      banco, numero, tipo, nombre,
    } = req.body;
    const update = {
      ...(!_.isEmpty(banco) ? { banco } : {}),
      ...(!_.isEmpty(numero) ? { numero } : {}),
      ...(!_.isEmpty(tipo) ? { tipo } : {}),
      ...(!_.isEmpty(nombre) ? { nombre } : {}),
      updatedAt: Date.now(),
    };
    const cuenta = await CuentaBancaria.update(update, {
      where: { fundacion_id: id },
    });    

    const response = {
      mensaje: 'Cuenta bancaria actualizada exitosamente.',
      result: cuenta,
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

exports.updateCuentaBancariaIDCuenta = async (req, res) => {
  await validateRequest(req);
  try {
    const { cuenta_id } = req.params;
    const {
      banco, numero, tipo, nombre,
    } = req.body;
    const update = {
      ...(!_.isEmpty(banco) ? { banco } : {}),
      ...(!_.isEmpty(numero) ? { numero } : {}),
      ...(!_.isEmpty(tipo) ? { tipo } : {}),
      ...(!_.isEmpty(nombre) ? { nombre } : {}),
      updatedAt: Date.now(),
    };
    const cuenta = await CuentaBancaria.update(update, {
      where: { id: cuenta_id },
    });    

    const response = {
      mensaje: 'Cuenta bancaria actualizada exitosamente.',
      result: cuenta,
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


exports.updateCuentaPrincipal = async (req, res) => {
  await validateRequest(req);
  try {
    const { fundacion_id } = req.params;
    const {
      id,
    } = req.body;
    let update = {      
      principal: false,
      updatedAt: Date.now(),
    };
    
    let cuenta = await CuentaBancaria.update(update, {
      where: { fundacion_id: fundacion_id },
    });

    update.principal=true;

    cuenta = await CuentaBancaria.update(update, {
      where: { fundacion_id: fundacion_id , id:id},
    });


    const response = {
      mensaje: 'Cuenta bancaria actualizada exitosamente.',
      result: cuenta,
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

exports.deleteCuenta = async (req, res) => {
  await validateRequest(req);
  try {
    const { cuentaId } = req.params;
    
    let mensaje = 'Cuenta eliminado exitosamente';
    const cuenta = await CuentaBancaria.destroy({
      where: { id: cuentaId },
    });
    if (_.isEmpty(cuenta)) {
      mensaje = 'Actualizacion no encontrada';
    }
  
    const response = {
      mensaje,
      result: cuenta,
    };
    return res.send(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

