/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../../app');
const Usuario = require('../../DB/usuario');
const AdminFund = require('../../DB/administrador_fund');
const Fundacion = require('../../DB/fundacion');

const registerFundacion = async (fundacionData) => supertest(app)
  .post('/fundacion/register')
  .send(fundacionData);

const registerUser = async (userData) => supertest(app)
  .post('/auth/register')
  .send(userData);

const findFundacionByRuc = async (ruc) => Fundacion.findOne({ where: { ruc } });

const deleteFoundation = async (fundacionId) => {
  await Fundacion.destroy({
    where: { id: fundacionId },
  });
};

const deleteAdminFoundation = async (fundacionId) => {
  await AdminFund.destroy({
    where: { fundacion_id: fundacionId },
  });
};

const deleteUser = async (cedula) => {
  await Usuario.destroy({
    where: { cedula },
  });
};

describe('Pruebas para la Fundación Peludos sin Hogar', () => {
  const fundacionTest = [
    {
      ruc: '23823',
      nombre: 'Fundación Peludos sin Hogar',
      direccion: 'Avenida Primavera #456',
      telefono: '0912345678',
      logo: '',
      comision: 180.0,
      expectedMessage: 'Error',
    },
    {
      ruc: '3023834732472232',
      nombre: 'Unidos por los Cuatro Patas',
      direccion: 'Paseo del Sol #789',
      telefono: '0923456789',
      comision: -150.3,
      expectedMessage: 'Error',
    },
    {
      ruc: '3234221423001',
      nombre: 'Refugio Amor Animal',
      direccion: 'Carrera Luna #101',
      telefono: '0934567890',
      comision: 50.0,
      expectedMessage: 'Registro exitoso',
    },
    {
      ruc: 'prueba',
      nombre: 'Huellas de Esperanza',
      direccion: 'Camino Estrella #234',
      telefono: '0945678901',
      comision: 235.2,
      expectedMessage: 'Error',
    },
  ];

  it('Test 2: Fundación Peludos sin Hogar - Debería generar un error al registrar la fundación', async () => {
    const testecase1 = fundacionTest[0];
    const registerFundacionValid = await registerFundacion(testecase1);
    expect(registerFundacionValid.status).toBe(500);
  });

  it('Test 2: Unidos por los Cuatro Patas - Debería generar un error al registrar la fundación', async () => {
    const testecase2 = fundacionTest[1];
    const registerFundacionError = await registerFundacion(testecase2);
    expect(registerFundacionError.status).toBe(500);
  });

  it('Test 3: Refugio Amor Animal - Debería registrar la fundación correctamente', async () => {
    const testecase3 = fundacionTest[2];
    const registerFundacionValid = await registerFundacion(testecase3);
    expect(registerFundacionValid.status).toBe(200);
  });

  it('Test 4: Huellas de Esperanza - Debería generar un error al registrar la fundación', async () => {
    const testecase4 = fundacionTest[3];
    const registerFundacionError = await registerFundacion(testecase4);
    expect(registerFundacionError.status).toBe(500);
  });

  it('Test 5: Registrar usuario a fundacion', async () => {
    const idFoundationUser = await findFundacionByRuc(fundacionTest[2].ruc);

    const userFundacion = {
      cedula: '0958700048',
      nombres: 'usuarioFundacion',
      apellidos: 'usuarioFundacion',
      telefono: '0999999999',
      direccion: 'Calle principal, 123',
      email: 'fundacionValida@gmail.com',
      password: 'fundacionValida',
      role: 2, // Role de fundacion
      fundacionId: idFoundationUser.dataValues.id,
      expectedMessage: 'Valido',
    };
    const responseUserFoundation = await registerUser(userFundacion);
    expect(responseUserFoundation.status).toBe(200);
  });

  afterAll(async () => {
    try {
      const indicesRegistroExitoso = fundacionTest
        .map((testecase, index) => (testecase.expectedMessage === 'Registro exitoso' ? index : null))
        .filter((index) => index !== null);

      if (indicesRegistroExitoso.length > 0) {
        const fundacionesAprobadas = await Promise.all(
          indicesRegistroExitoso.map(async (index) => {
            const testecase = fundacionTest[index];
            const idFoundation = await findFundacionByRuc(testecase.ruc);
            await deleteAdminFoundation(idFoundation.dataValues.id);
            await deleteUser('0958700048');
            await deleteFoundation(idFoundation.dataValues.id);
          }),
        );
      }
    } catch (error) {
      console.error('Error en afterAll:', error);
    }
  });
});
