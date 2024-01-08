/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const Manada = require('../../DB/manada');
const Usuario = require('../../DB/usuario');

const registerUser = async (userData) => supertest(app)
  .post('/auth/register')
  .send(userData);

const deleteUser = async (cedula) => {
  await Usuario.destroy({
    where: { cedula },
  });
};

const createManada = async (token, manadaData) => supertest(app)
  .post('/manada/create')
  .set('Authorization', `Bearer ${token}`)
  .send(manadaData);

const deleteManada = async (nameManada) => {
  await Manada.destroy({
    where: { nombre: nameManada },
  });
};

const loginResponse = async (dataUser) => supertest(app)
  .post('/auth/login')
  .send(dataUser);

describe('Pruebas para la Fundación Peludos sin Hogar', () => {
  const userNormal = {
    cedula: '0958700069',
    nombres: 'usuarioNormal',
    apellidos: 'usuarioNormal',
    telefono: '0999999999',
    direccion: 'Calle principal, 123',
    email: 'usuarioNormal@gmail.com',
    password: 'usuarioNormal',
    role: 3, // Role de donador
  };

  const dataUserNormal = {
    email: 'usuarioNormal@gmail.com',
    password: 'usuarioNormal',
  };

  const manadaData = {
    nombre: 'ManadaEjemplo',
    monto: 0.0,
    galeriamanada: {
      fotos: [
        'https://leopet.sfo3.digitaloceanspaces.com/20220824_07504_791manada1.jpg',
      ],
    },
  };

  it('Test 1: Usuario registrado', async () => {
    const registerNormalUser = await registerUser(userNormal);
    console.log(registerNormalUser.body)
    expect(registerNormalUser.status).toBe(200);
  });

  it('Test 2: Logeo del usuario registrado', async () => {
    const loginNormalUser = await loginResponse(dataUserNormal);
    expect(loginNormalUser.status).toBe(200);

    const tokenNormalUser = await loginNormalUser.body.result.token;
    const responseManada = await createManada(tokenNormalUser, manadaData);
    expect(responseManada.status).toBe(200);
  });

  afterAll(async () => {
    try {
      await deleteManada('ManadaEjemplo');
      await deleteUser('0958700069');
    } catch (error) {
      console.error('Error en afterAll:', error);
    }
  });
});
