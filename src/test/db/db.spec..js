/* eslint-disable */
const db = require('../../DB/index');

describe('Connection', () => {
  it('should connect to the database', async () => {
    try {
      await db.sequelize.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
});
