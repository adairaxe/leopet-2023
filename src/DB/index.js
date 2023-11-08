/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();
const basename = path.basename(__filename);
const db = {};

const isDataBaseEnabled = require('../config').integradoradb.IsEnabled;

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER, 
  process.env.MYSQL_ROOT_PASSWORD,
  {
  host: 'localhost',
  dialect: 'mysql'
});

db.sequelize = sequelize;

db.connect = async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

db.disconnect = () => {
  sequelize.close();
}


module.exports = db;
