/* eslint-disable */
const supertest = require('supertest');
const app = require('../../app');

const createAnimal = async (token, animalData) => {
  return supertest(app)
    .post('/animal/create')
    .set('Authorization', `Bearer ${token}`)
    .send(animalData);
};

const loginResponse = async (dataUser) => {
  return supertest(app)
    .post('/auth/login')
    .send(dataUser);
}

describe('Registro de nuevos animales al sistema', () => {
  const newAnimal = {
    nombre: 'Noi',
    especie: 'Gato',
    raza: 'Birmano',
    descripcion: 'Noi es un gato muy activo y cazador. Le gusta comer bastante.',
    imagen: 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2021-02/CAT%20BREED%20Hero%20Mobile_0038_Birman.jpg?itok=4N5_yZCi',
    galeria: [],
    peso: 20,
    sexo: true,
    enfermedades: '',
    esterilizacion: true,
    vacunacion: true,
    desparasitacion: true,
  };
  
  
  it("se recibe una respuesta 401 ya que no se ha iniciado sesión como miembro de una fundación", async () => {    
      const responseCreateAnimal = await createAnimal(newAnimal);
      expect(responseCreateAnimal.statusCode).toBe(401);
  });

  it("Se recibe una respuesta 200 ya que se ha iniciado sesión como miembro de una fundación para luego crear un animal", async () => {    
      dataUser_Foundation = {
        email: 'refugiohuellitas@gmail.com', //email y contraseña de Ricardo Silva (Refugio Huellitas)
        password: '1234'
      }

      const logingFundacion = await loginResponse(dataUser_Foundation);
      const token_UserFoundation = await logingFundacion.body.result.token;
      const responseCreateAnimal = await createAnimal(token_UserFoundation, newAnimal);
      expect(responseCreateAnimal.status).toBe(200);
  });

});

