/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const Animal = require('../../DB/animal');
const Usuario = require('../../DB/usuario');

const loginResponse = async (dataUser) => supertest(app)
  .post('/auth/login')
  .send(dataUser);

const registerAnimal = async (token, animal) => supertest(app)
  .post('/animal/create')
  .set('Authorization', `Bearer ${token}`)
  .send(animal);

const deleteAnimal = async (nombreAnimal) => {
  await Animal.destroy({
    where: { nombre: nombreAnimal },
  });
};

describe('Pruebas para la Fundación Peludos sin Hogar', () => {
  const userFoundation = {
    email: 'fundacion@gmail.com',
    password: 'fundacion',
  };

  const animalFoundation = {
    nombre: 'Exodo',
    especie: 'Perro',
    raza: 'Labrador Retriever',
    descripcion: 'Exodo es un perro muy cariñoso.',
    galeria: ' ',
    sexo: true,
    peso: 20.5,
    enfermedades: 'Ninguna',
    esterilizacion: false,
    vacunacion: true,
    desparasitacion: true,
  };

  it('Test 2: Logeo del usuario registrado', async () => {
    const loginNormalUser = await loginResponse(userFoundation);
    expect(loginNormalUser.status).toBe(200);

    const tokenNormalUser = await loginNormalUser.body.result.token;
    const responseManada = await registerAnimal(tokenNormalUser, animalFoundation);
    expect(responseManada.status).toBe(200);
  });

  afterAll(async () => {
    try {
      await deleteAnimal('Exodo');
    } catch (error) {
      console.error('Error en afterAll:', error);
    }
  });
});
