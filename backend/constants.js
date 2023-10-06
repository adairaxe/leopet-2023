require('dotenv').config();

module.exports = {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  MYSQL_HOSTNAME: process.env.MYSQL_HOSTNAME,
  MYSQL_ROOT_PORT: process.env.MYSQL_ROOT_PORT,
  STATUS_ANIMAL: {
    NO_APADRINADO: 'NO_APADRINADO',
    APADRINADO: 'APADRINADO',
  },
  ROL: {
    ADMIN: {
      ROL_ID: 1,
      ROL: 'ADMINISTRADOR',
    },
    ADMIN_FUND: {
      ROL_ID: 2,
      ROL: 'ADMINISTRADOR_FUNDACION',
    },
    DONADOR: {
      ROL_ID: 3,
      ROL: 'DONADOR',
    },
  },
};
