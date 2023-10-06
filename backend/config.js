const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_ROOT_PASSWORD,
  MYSQL_HOSTNAME,
  MYSQL_ROOT_PORT,
} = require('./constants');

const configs = {
  integradoradb: {
    development: {
      username: MYSQL_USER,
      password: MYSQL_ROOT_PASSWORD,
      database: MYSQL_DATABASE,
      host: MYSQL_HOSTNAME,
      port: MYSQL_ROOT_PORT,
      dialect: 'mysql',
      benchmark: true,
      logging: false,
    },
    IsEnabled: true,
  },
};

module.exports = configs;
