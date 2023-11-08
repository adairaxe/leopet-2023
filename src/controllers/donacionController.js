/* eslint-disable no-await-in-loop, no-console */

const _ = require('lodash');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

const { getEvidencia } = require('./helpers');
const { validateRequest } = require('../helpers');
const { createPlanManada } = require('./helpersPayPal');

const Animal = require('../DB/animal');
const Manada = require('../DB/manada');
const Donacion = require('../DB/donacion');
const Usuario = require('../DB/usuario');

/**
 * Funcion para obtener todas las donaciones
 * @param  {*} req
 * @param  {*} res
 * @return  {Object} response
 */
exports.getDonaciones = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { q } = req.query;
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '1', 10);
    const query = {
      include: [
        {
          model: Animal,
          required: true,
          where: {
            fundacion_id: User.fundacionId,
            ...(!_.isEmpty(q) ? { nombre: { [Op.regexp]: q } } : {}),
          },
        },
        {
          model: Usuario,
          required: true,
        },
      ],
      offset: (page - 1) * limit,
      limit,
    };
    const responseBody = await Donacion.findAndCountAll(query);
    const { rows, count } = responseBody;
    const totalPages = Math.ceil(count / limit);
    const result = [];
    for (const row of rows) {
      const id = _.get(row, 'id');
      const evidencia = await getEvidencia(id);
      const data = {
        id,
        donador: `${_.get(row, 'Usuario.apellidos')} ${_.get(
          row,
          'Usuario.nombres',
        )}`,
        animal: _.get(row, 'Animal.nombre'),
        dinero: _.get(row, 'monto'),
        status: _.get(row, 'aprobado'),
        fecha: dayjs(_.get(row, 'createdAt')).format('DD/MM/YYYY HH:mm:ss'),
        evidencia,
      };
      result.push(data);
    }
    const response = {
      limit,
      page,
      totalPages,
      total: count,
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
 * Funcion para obtener el dinero disponible de una fundacion
 * @param  {*} req
 * @param  {*} res
 * @return  {Object} response
 */
exports.getDineroDisponible = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const query = {
      where: {
        pagado: false,
        aprobado: true,
      },
      include: [
        {
          model: Animal,
          required: true,
          where: {
            fundacion_id: User.fundacionId,
          },
        },
      ],
    };
    const responseBody = await Donacion.findAndCountAll(query);
    const { rows } = responseBody;
    let monto = 0;
    for (const row of rows) {
      const total = _.toNumber(_.get(row, 'monto', 0));
      monto += total;
    }

    const response = {
      result: monto,
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
 * Funcion para crear una donacion en la BD
 * @param  {*} req
 * @param  {*} res
 * @return  {Object} response
 */
exports.crearDonacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { manadaId } = req.body;
    const manada = await Manada.findOne({
      where: {
        id: manadaId,
      },
      include: [
        {
          model: Usuario,
          required: true,
        },
      ],
    });

    if (_.isEmpty(_.get(manada, 'productId'))) {
      throw new Error('ERROR - No existe una un producto asociado a la manada');
    }
    const data = {
      id: _.get(manada, 'id'),
      nombre: _.get(manada, 'nombre'),
      monto: _.get(manada, 'monto'),
      productId: _.get(manada, 'productId'),
      nombres: _.get(manada, 'Usuario.nombres'),
      apellidos: _.get(manada, 'Usuario.apellidos'),
      email: _.get(manada, 'Usuario.email'),
    };
    const link = await createPlanManada(data);
    const response = {
      message: 'Donacion realizada exitosamente',
      result: link,
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
 * Funcion para aprobar las evidencias de una donacion por parte del donador
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.aprobarDonacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { id, aprobado } = req.body;
    const update = {
      aprobado,
      updatedAt: Date.now(),
    };
    const donacionInfo = await Donacion.update(update, {
      where: { id },
    });

    const response = {
      result: donacionInfo,
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
 * Funcion que actualiza el campo pagado en la tabla donacion, para verificar las donaciones que han
 * sido pagadas por parte del administrador de la plataforma
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.pagarDonacion = async (req, res) => {
  await validateRequest(req);
  try {
    const { id, status } = req.body;
    const update = {
      pagado: _.isEqual(_.toLower(status), 'success'),
      updatedAt: Date.now(),
    };
    const donacionInfo = await Donacion.update(update, {
      where: { id },
    });

    const response = {
      result: donacionInfo,
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
