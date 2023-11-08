/* eslint-disable import/no-dynamic-require */
const Sequelize = require('sequelize');
require('dotenv').config();

const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  },
);

db.sequelize = sequelize;

db.connect = async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

db.disconnect = () => {
  sequelize.close();
};

module.exports = db;
