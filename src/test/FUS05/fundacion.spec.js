/* eslint-disable */
const supertest = require('supertest');
const app = require('../../app');
const db = require('../../DB');
const Fundacion = require('../../DB/fundacion');
const Animal = require('../../DB/animal');
const Usuario = require('../../DB/usuario');
const AdminFund = require('../../DB/administrador_fund');

describe('Como fundación quiero enviar una solicitud de registro', () => {
  const clasesEquivalencia = [
    {
      // Valido
      ruc: '1234567890119',
      nombre: 'fundacionBorrada',
      direccion: 'Calle principal, 123',
      telefono: '0999999999',
      logo: '',
    },
    {
      // Más de 13 caracteres en el ruc
      ruc: '12345678901145',
      nombre: 'XYZk',
      direccion: 'Calle principal, 123',
      telefono: '0999999999',
      logo: '',
    },
  ];

  it('Se crea una fundacion valida y una invalida', async () => {

    try{
      let testecase2 = clasesEquivalencia[1];
      const registerFundacion_Invalid = await supertest(app)
        .post("/fundacion/register")
        .send(testecase2);
      expect(registerFundacion_Invalid.status).toBe(500);

      const testecase1 = clasesEquivalencia[0];
      const registerFundacion_Valid = await supertest(app)
        .post('/fundacion/register')
        .send(testecase1);
      expect(registerFundacion_Valid.status).toBe(200);

      const fundacionValid = await Fundacion.findOne({
        where : { ruc : '1234567890119'}
      });

      const userFundacion = {
        cedula: '0958700048',
        nombres: 'usuarioRorrado',
        apellidos: 'usuarioRorrado',
        telefono: '0999999999',
        direccion: 'Calle principal, 123',
        email: 'fundacionBorrada@gmail.com',
        password: 'fundacionBorrada',
        role: 2, // Role de donador
        fundacionId: fundacionValid.dataValues.id,
      };
    
      const responseRegisterUser = await supertest(app)
        .post('/auth/register')
        .send(userFundacion);
      expect(responseRegisterUser.status).toBe(200);

      const usuarioValido = await Usuario.findOne({
        where : { cedula : '0958700048'}
      });


      const animalData = {
        nombre: 'Max',
        especie: 'Perro',
        raza: 'Labrador',
        descripcion: 'Max es un perro muy cariñoso y juguetón.',
        imagen: 'https://example.com/max.jpg',
        galeria: [],
        peso: 20,
        sexo: true,
        enfermedades: '',
        esterilizacion: true,
        vacunacion: true,
        desparasitacion: true,
      };

      const token = responseRegisterUser.body.result.token;
      console.log(token);
      const responseCreateAnimal = await supertest(app)
        .post('/animal/create')
        .set('Authorization', `Bearer ${token}`)
        .send(animalData);
      expect(responseCreateAnimal.status).toBe(200);

      let deleteRAnimal = await Animal.destroy({
        where: {  fundacion_id: fundacionValid.dataValues.id }
      });

      let deleteRelation = await AdminFund.destroy({
        where: {  fundacion_id: fundacionValid.dataValues.id }
      });

      let deleteUser = await Usuario.destroy({
        where: {  cedula: usuarioValido.dataValues.cedula  }
      });

      let deleteFoundation = await Fundacion.destroy({
        where: {  ruc: fundacionValid.dataValues.ruc  }
      });

    
    } catch(error) {
      console.log(error);


      let deleteRAnimal = await Animal.destroy({
        where: {  fundacion_id: fundacionValid.dataValues.id }
      });

      let deleteRelation = await AdminFund.destroy({
        where: {  fundacion_id: fundacionValid.dataValues.id }
      });
      let deleteUser = await Usuario.destroy({
        where: {  cedula: usuarioValido.dataValues.cedula  }
      });

      let deleteFoundation = await Fundacion.destroy({
        where: {  ruc: fundacionValid.dataValues.ruc  }
      });

    }
    
  });
});
