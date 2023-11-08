const fs = require('fs');
const AWS = require('aws-sdk');
// Nuevo endpoint para Digital Ocean
const spacesEndpoint = new AWS.Endpoint(process.env.DIGITAL_ENDPOINT);

const storage = new AWS.S3({
  accessKeyId: process.env.DIGITAL_ACCESS_KEY_ID, // Cambio de key por Digital
  secretAccessKey: process.env.DIGITAL_SECRET_ACCESS_KEY, // Cambio de key por Digital
  endpoint: spacesEndpoint, // Nuevo endpoint para Digital Ocean
});

const getBuckets = () => new Promise((resolve, reject) => {
  storage.listBuckets(async (err, data) => {
    if (!err) {
      return resolve(data);
    }
    return reject(err);
  });
});

const prefijo = () => {
  const d = new Date(new Date());
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  const h = new Date(new Date());
  let hora = `${h.getHours()}`;
  let min = `${h.getMinutes()}`;
  let seg = h.getSeconds();
  if (hora.length < 2) hora = `0${hora}`;
  if (min.length < 2) min = `0${min}`;
  if (seg.length < 2) seg = `0${seg}`;
  const prefijo = `${year.toString()
          + month.toString()
          + day.toString()
  }_${
    hora.toString()
  }${min.toString()
  }${seg.toString()}_${
    new Date().getMilliseconds().toString()}`;
  return prefijo;
};

const updateFile = (
  name,
  filePath,
  { Bucket = process.env.S3_BUCKET } = {},
) => new Promise((resolve, reject) => {
  const data = fs.readFileSync(filePath);
  const miprefijo = prefijo();
  const params = {
    Bucket,
    Key: miprefijo + name,
    Body: data,
    ACL: 'public-read',
  };
    // eslint-disable-next-line no-shadow
  storage.upload(params, async (err, data) => {
    if (!err) {
      // eslint-disable-next-line no-console
      console.log('====== URL ', data.Location);
      return resolve(data.Location);
    }
    return reject(err);
  });
});

const deleteFile = (
  name,
  { Bucket = process.env.S3_BUCKET } = {},
) => new Promise((resolve, reject) => {
  const params = {
    Bucket,
    Key: name,
  };
  // eslint-disable-next-line no-shadow
  storage.deleteObject(params, async (err, data) => {
    if (err) {
      return reject(err);
    }
  });
});

module.exports = {
  getBuckets,
  updateFile,
  deleteFile,
};
