/* eslint-disable */
const supertest = require('supertest');
const app = require('../../app');
const db = require('../../DB');
const Fundacion = require('../../DB/fundacion');
const Animal = require('../../DB/animal');
const Usuario = require('../../DB/usuario');
const AdminFund = require('../../DB/administrador_fund');
const Manada = require('../../DB/manada');
// updates animal information when all required fields are provided

const loginResponse = async (dataUser) => {
  return supertest(app)
    .post('/auth/login')
    .send(dataUser);
}

const updateAnimal = async (token, animalID, animalData) => {
  return supertest(app)
    .put(`/update/${animalID}`)
    .set('Authorization', `Bearer ${token}`)
    .send(animalData);
};

const animalID = 15;

const animal = {
  nombre: 'Cookie',
  especie: 'Perro',
  raza: 'Mestizo',
  descripcion: 'Fue abandonado por su antigua familia, vagaba por las calles estaba lleno de parasitos',
  galeria: [],
  sexo: true,
  edad: 4,
  peso: 21,
  enfermedades: '',
  esterilizacion: true,
  vacunacion: true,
  desparasitacion: true,

}

const dataUser_Foundation = {
  email: 'refugiohuellitas@gmail.com', //email y contraseña de Ricardo Silva (Refugio Huellitas)
  password: '1234'
}

describe('Actualización de animales al sistema', () => {

  it('should update animal information when all required fields are provided', async () => {

    const logingFundacion = await loginResponse(dataUser_Foundation);
    const token_UserFoundation = await logingFundacion.body.result.token;
    const responseUpdateAnimal = await updateAnimal(token_UserFoundation, animalID, animal);
    expect(responseUpdateAnimal.status).toBe(200);


  });

});

