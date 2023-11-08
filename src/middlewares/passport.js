const _ = require('lodash');
const jwt = require('jsonwebtoken');

const Usuario = require('../DB/usuario');
const AdminFund = require("../DB/administrador_fund");
const { ROL } = require('../constants');

const JWT_SECRET = 'secret';

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
    const decode = jwt.verify(token, JWT_SECRET);
    const User = await Usuario.findOne({
      where: {
        id: decode.id,
      },
    });
    const data = {
      id: User.id,
      role: User.role,
    };
    if (_.isEmpty(User)) {
      return res.status(404).send('No autorizado.');
    }
    if (_.isEqual(decode.role, ROL.ADMIN_FUND.ROL_ID)) {
      const admin = await AdminFund.findOne({
        where: {
          id: decode.id,
        },
      });
      data.fundacionId = admin.fundacion_id;
    }
    req.User = data;
    return next();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR', error);
    const responseError = {
      message: 'Token expirado',
      error: error.stack,
    };
    return res.status(401).send(JSON.stringify(responseError));
  }
};

module.exports = authenticateToken;
