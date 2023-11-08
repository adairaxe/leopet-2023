const fs = require('fs');

const storage = require('../lib/Storage/S3');

/**
 * Funcion para subir material de tipo multimedia al bucket creado en Amazon S3
 * @param  {*} req
 * @param  {*} res
 * @return {Object} response
 */
exports.uploadFile = async (req, res) => {
  try {
    const { files } = req;
    const fotos = [];
    for (const file of files) {
      const { path: filePath, originalname: fileName } = file;
      // eslint-disable-next-line no-await-in-loop
      const location = await storage.updateFile(fileName, filePath, {
        //Bucket: 'proyecto.imagenes',
        Bucket: process.env.S3_BUCKET,
      });      
      fotos.push(location);
      fs.unlinkSync(filePath);
    }
    const response = {
      message: 'Imagen subida exitosamente',
      fotos,
    };
    return res.status(200).send(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { file } = req.body;
    const len=file.length;
    const lenhttps='https://';
    const inicio= (
      lenhttps.length+
      process.env.DIGITAL_BUCKET.length+
      process.env.DIGITAL_ENDPOINT.length);  
    const fileDelete=file.substring(inicio,len);    
      // eslint-disable-next-line no-await-in-loop
      await storage.deleteFile(fileDelete, {       
        Bucket: process.env.S3_BUCKET,
      });       
    
    const response = {
      message: 'Imagen eliminada exitosamente',      
    };
    return res.status(200).send(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('ERROR', error);
    const responseError = {
      message: 'Something bad happened!',
      error: error.stack,
    };
    return res.status(500).send(JSON.stringify(responseError));
  }
};

