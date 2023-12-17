/* eslint-disable indent */
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

// Configuración de AWS S3
const s3 = new aws.S3({
  accessKeyId: 'TU_ACCESS_KEY_ID',
  secretAccessKey: 'TU_SECRET_ACCESS_KEY',
  region: 'TU_REGION', // Ejemplo: 'us-east-1'
});

// Configuración de multer y multer-s3 para la carga de imágenes
const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'TU_NOMBRE_DE_BUCKET',
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `images/${uuidv4()}-${file.originalname}`);
    },
  }),
});

// Función para cargar la imagen en S3
const uploadImageToS3 = async (photoAnimal) => new Promise((resolve, reject) => {
      upload.single('photoAnimal')(null, null, async (err) => {
        if (err) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Error al cargar la imagen a S3');
        } else {
          // La imagen se cargó con éxito, y el enlace se obtiene de la propiedad 'location'
          resolve(photoAnimal.location);
        }
      });
});

exports.preProcessDataAnimal = async (req, res) => {
    try {
      const { photoAnimal } = req.body;
      // Verifica si se proporcionó una imagen
      if (!photoAnimal) {
        return res.status(400).json({ mensaje: 'Debe proporcionar una imagen.' });
      }
      const imagenUrl = await uploadImageToS3(photoAnimal);
      return res.json({ mensaje: 'Datos de la mascota procesados con éxito', imagenUrl });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ mensaje: 'Error al procesar los datos de la mascota' });
    }
};
