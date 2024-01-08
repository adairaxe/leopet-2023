/* eslint-disable no-console */
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ROL } = require('../constants');
const { validateRequest } = require('../helpers');

const Usuario = require('../DB/usuario');
const AdminFund = require('../DB/administrador_fund');

/**
 * Funcion encargada del inicio de sesion de todos los usuarios: SuperAdmin, Administrador Plataforma,
 * Donador. Retorna un token que se utilizara en la llamada de todos los endpoints
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.login = async (req, res) => {
  await validateRequest(req);
  try {
    const { email, password } = req.body;
    const unAuthorizedResponse = 'Credenciales incorrectas.';

    const User = await Usuario.findOne({
      where: {
        email,
      },
      attributes: { exclude: ['password'] },
    });

    // User does not exists
    if (!User) {
      return res.status(401).send(unAuthorizedResponse);
    }

    // Get user password
    const Password = await Usuario.findOne({
      where: {
        id: User.id,
      },
    });

    // Verify password
    if (!bcrypt.compareSync(password, Password.password)) {
      return res.status(401).send(unAuthorizedResponse);
    }

    // Make JWT
    const expiresIn = 28800;
    const user = User.get({ plain: true });
    const token = jwt.sign(user, 'secret', {
      expiresIn,
    });

    let adminFund;
    if (_.isEqual(User.role, ROL.ADMIN_FUND.ROL_ID)) {
      adminFund = await AdminFund.findOne({
        where: { id: User.id },
      });
    }
    const result = {
      id: User.id,
      role: User.role,
      cedula: User.cedula,
      nombres: User.nombres,
      apellidos: User.apellidos,
      telefono: User.telefono,
      email: User.email,
      direccion: User.direccion,
      createdAt: User.createdAt,
      updatedAt: User.updatedAt,
      ...(_.isEqual(User.role, ROL.ADMIN_FUND.ROL_ID)
        ? { fundacionId: adminFund.fundacion_id }
        : {}),
      token,
    };

    return res.send({
      result,
      expiresIn,
      tokenType: 'Bearer',
    });
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
 * Funcion para registrar usuarios de tipo: Administrador de Fundacion y Donador, retorna
 * un token que se utilizara para llamada de los diferentes endpoints
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.register = async (req, res) => {
  await validateRequest(req);
  try {
    const {
      cedula,
      nombres,
      apellidos,
      telefono,
      email,
      direccion,
      password,
      role,
      fundacionId,
    } = req.body;

    const unAuthorizedResponse = 'Ya existe un usuario registrado con ese correo.';

    let User = await Usuario.findOne({
      where: {
        email,
      },
    });

    // Usuario existe
    if (User) {
      return res.status(401).send(unAuthorizedResponse);
    }

    if (cedula.length !== 10) {
      return res.status(500).send(JSON.stringify('revise su cedula'));
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    // Registrar donador o admin_funda
    User = await Usuario.create({
      cedula,
      nombres,
      apellidos,
      telefono,
      email,
      direccion,
      role,
      password: hash,
    });

    if (_.isEqual(role, ROL.ADMIN_FUND.ROL_ID)) {
      await AdminFund.create({
        id: User.id,
        fundacion_id: fundacionId,
      });
    }

    const user = {
      id: User.id,
      role: User.role,
    };

    // Make JWT
    const expiresIn = 28800;
    const token = jwt.sign(user, 'secret', {
      expiresIn,
    });

    const result = {
      id: User.id,
      role: User.role,
      cedula: User.cedula,
      nombres: User.nombres,
      apellidos: User.apellidos,
      telefono: User.telefono,
      direccion: User.direccion,
      email: User.email,
      createdAt: User.createdAt,
      updatedAt: User.updatedAt,
      ...(_.isEqual(role, ROL.ADMIN_FUND.ROL_ID) ? { fundacionId } : {}),
      token,
    };

    return res.send({
      result,
      expiresIn,
      tokenType: 'Bearer',
    });
  } catch (error) {
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};
