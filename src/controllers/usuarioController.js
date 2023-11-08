/* eslint-disable no-console */
const _ = require('lodash');
const bcrypt = require('bcrypt');

const { validateRequest } = require('../helpers');

const Usuario = require('../DB/usuario');

/**
 * Funcion para obtener la informacion de los usuarios: SuperAdmin, Admin de Fundacion y Donador
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.getInfo = async (req, res) => {
  await validateRequest(req);
  try {
    const { id } = req.params;
    let UserInfo = await Usuario.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (_.isEmpty(UserInfo)) {
      UserInfo = [];
    }
    const response = {
      result: UserInfo,
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
 * Funcion para actualizar la informacion de los usuarios: SuperAdmin, Admin de Fundacion y Donador
 * en la BD
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updateInfo = async (req, res) => {
  await validateRequest(req);
  try {
    const { id } = req.params;
    const {
      cedula, nombres, apellidos, direccion, telefono,
    } = req.body;
    const update = {
      ...(!_.isEmpty(cedula) ? { cedula } : {}),
      ...(!_.isEmpty(nombres) ? { nombres } : {}),
      ...(!_.isEmpty(apellidos) ? { apellidos } : {}),
      ...(!_.isEmpty(telefono) ? { telefono } : {}),
      ...(!_.isEmpty(direccion) ? { direccion } : {}),
      updatedAt: Date.now(),
    };
    const UserInfo = await Usuario.update(update, {
      where: { id },
    });

    const response = {
      result: UserInfo,
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
 * Funcion para actualizar la contrasena de los usuarios: SuperAdmin, Admin de Fundacion y Donador
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.updatePassword = async (req, res) => {
  await validateRequest(req);
  try {
    const { id, password, newPassword } = req.body;

    const oldPassword = await Usuario.findOne({
      where: {
        id,
      },
    });

    if (!bcrypt.compareSync(password, oldPassword.password)) {
      return res.status(400).send({ error: 'Credenciales incorrectas' });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(newPassword, salt);

    const update = {
      password: hash,
      updatedAt: Date.now(),
    };
    const UserInfo = await Usuario.update(update, {
      where: { id },
    });
    const response = {
      message: 'Correo actualizado',
      result: UserInfo,
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
