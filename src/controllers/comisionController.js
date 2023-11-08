/* eslint-disable no-console */

const { validateRequest } = require('../helpers');

const Comision = require('../DB/comision');

/**
 * Funcion para obtener la informacion de la cuenta bancaria registrada por una fundacion
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */

/**
 * Funcion para crear una cuenta bancaria de una fundacion en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.crearComision = async (req, res) => {
  console.log(req.body);
  await validateRequest(req);
  try {
    const {
      fundacionId, totalComision, totalPago,
    } = req.body;
    const cuenta = await Comision.create({
      fundacion_id: fundacionId,
      totalComision,
      totalPago,
      createdAt: Date.now(),
      visible: true,
    });

    const response = {
      mensaje: 'Comision Creada exitosamente.',
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
