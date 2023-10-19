require("dotenv").config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};


const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER, 
  process.env.MYSQL_ROOT_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);


if (process.env.MYSQL_ISENABLE) {
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
}


db.sequelize = sequelize;


db.connect = async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};


db.disconnect = () =>
  sequelize.close();



module.exports = db;
