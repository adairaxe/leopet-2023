const app = require('./app');

const { PORT } = process.env;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Server is running OK');
});
