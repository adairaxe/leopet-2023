/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db = {};
const databaseName = process.env.MYSQL_DATABASE;
const configKey = databaseName;
const config = require('../config')[configKey][process.env.NODE_ENV];
const isDataBaseEnabled = require('../config').integradoradb.IsEnabled;

const sequelize = new Sequelize(config);

if (isDataBaseEnabled) {
  fs.readdirSync(__dirname)
    .filter((file) =>
      (
        file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
      ))
    .forEach((file) => {
      // eslint-disable-next-line global-require
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes,
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Load scopes
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].loadScopes) {
      db[modelName].loadScopes(db);
    }
  });

  db.sequelize = sequelize;

  db.connect = async () => {
    try {
      await sequelize.sync();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Unable to connect to the database:', err);
    }
  };

  db.disconnect = () =>
    sequelize.close();
}
module.exports = db;
