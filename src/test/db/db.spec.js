/* eslint-disable */
const db = require('../../DB/index');

describe('Connection', () => {
  it('should connect to the database', async () => {
    try {
      await db.sequelize.authenticate();
      console.log('Connection has been established successfully to', db.sequelize.getDatabaseName());
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
});
