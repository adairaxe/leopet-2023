/* eslint-disable no-console */

const _ = require('lodash');
const { validateRequest } = require('../helpers');
const { validateAdminFund } = require('./helpers');

const Evidencia = require('../DB/evidencia');
/**
 * Funcion para crear la evidencia de una donacion por parte del administrador de fundacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.crearEvidencia = async (req, res) => {
  await validateRequest(req);
  try {
    const { User } = req;
    const { donacion, descripcion, galeria } = req.body;

    if (!(await validateAdminFund(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }
    const animal = await Evidencia.create({
      donacion_id: donacion,
      descripcion,
      galeria,
    });
    const response = {
      mensaje: 'Historia creado exitosamente.',
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
 * Funcion para actualizar la informacion de una evidencia por parte del administrador de fundacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updateEvidencia = async (req, res) => {
  await validateRequest(req);
  try {
    const { id } = req.params;
    const { User } = req;
    const { descripcion, galeria } = req.body;
    if (!(await validateAdminFund(User.id))) {
      return res
        .status(401)
        .send({ error: 'No esta autorizado para realizar esta operacion!' });
    }
    const update = {
      ...(!_.isEmpty(descripcion) ? { descripcion } : {}),
      ...(!_.isEmpty(galeria) ? { galeria } : {}),
      updatedAt: Date.now(),
    };
    const evidencia = await Evidencia.update(update, {
      where: { id },
    });

    const response = {
      mensaje: 'Informacion actualizada exitosamente.',
      result: evidencia,
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
