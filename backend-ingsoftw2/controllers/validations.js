const { body, param } = require('express-validator');

/* Validaciones para Animales */
module.exports.allAnimals = [
  body('especie')
    .optional()
    .isString()
    .withMessage('La especie debe ser de tipo String'),
];

module.exports.animal = [
  param('animalId')
    .exists()
    .isInt()
    .withMessage('Es necesario el campo animalId'),
];

module.exports.createAnimal = [
  body('nombre')
    .optional()
    .isString()
    .withMessage('El campo nombre debe ser de tipo String'),
  body('especie')
    .optional()
    .isString()
    .withMessage('El campo especie debe ser de tipo String'),
  body('raza')
    .optional()
    .isString()
    .withMessage('El campo raza debe ser de tipo String'),
  body('descripcion')
    .optional()
    .isString()
    .withMessage('El campo descripcion debe ser de tipo String'),
];

/* Validaciones para Usuarios */
module.exports.login = [
  body('email')
    .exists()
    .isString()
    .withMessage('Es necesario email'),
  body('password')
    .exists()
    .isString()
    .withMessage('Es necesario contrasena'),
];

/* Validaciones para cuentasBancarias */
module.exports.cuentaInfo = [
  param('id')
    .exists()
    .isInt()
    .withMessage('Es necesario el campo id'),
];

module.exports.createUpdateCuentaBancaria = [
  body('banco')
    .optional()
    .isString()
    .withMessage('El campo banco debe ser de tipo String'),
  body('numero')
    .optional()
    .isString()
    .withMessage('El campo numero debe ser de tipo String'),
  body('tipo')
    .optional()
    .isString()
    .withMessage('El campo tipo debe ser de tipo String'),
  body('nombre')
    .optional()
    .isString()
    .withMessage('El campo nombre debe ser de tipo String'),
];
