const supertest = require('supertest');
const app = require('../../app');

const registerFundacion = async (fundacionData) => {
  return supertest(app)
    .post('/fundacion/register')
    .send(fundacionData);
};

const deleteFundacion = async (fundacionId) => {
  return supertest(app)
    .post('/fundacion/delete')
    .send({ fundacionId });
};




describe('Como fundación, quiero eliminar/actualizar los animales que se han registrado previamente en el sistema para poder actualizar el estado de los animales.', () => {

  it("Debería crear una fundación para eliminarla", async () => {
    const res = await registerFundacion({
      ruc: '1234567890119',
      nombre: 'XYZ',
      direccion: 'Calle principal, 123',
      telefono: '0999999999',
      logo: '',
    });

    const fundacionId = res.body.id;

    const res2 = await deleteFundacion(fundacionId);

    expect(res2.status).toBe(200);
  });

})

