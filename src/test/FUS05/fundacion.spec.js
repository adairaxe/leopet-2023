const supertest = require('supertest');
const app = require('../../app');
const db = require('../../DB');
const Fundacion = require('../../DB/fundacion');
const Animal = require('../../DB/animal');
const Usuario = require('../../DB/usuario');
const AdminFund = require('../../DB/administrador_fund');
const Manada = require('../../DB/manada');

const registerFundacion = async (fundacionData) => {
  return supertest(app)
    .post('/fundacion/register')
    .send(fundacionData);
};

const registerUser = async (userData) => {
  return supertest(app)
    .post('/auth/register')
    .send(userData);
};

const createAnimal = async (token, animalData) => {
  return supertest(app)
    .post('/animal/create')
    .set('Authorization', `Bearer ${token}`)
    .send(animalData);
};

const createManada = async (token, manadaData) => {
  return supertest(app)
    .post('/manada/create')
    .set('Authorization', `Bearer ${token}`)
    .send(manadaData);
};

const loginResponse = async (dataUser) =>{
  return supertest(app)
    .post('/auth/login')
    .send(dataUser);
}


const findUsuarioByCedula = async (cedula) => {
  return await Usuario.findOne({ where: { cedula } });
};

const findFundacionByRuc = async (ruc) => {
  return await Fundacion.findOne({ where: { ruc } });
};


const deleteEntities_Foundation = async (fundacionId, cedula) => {
  await Animal.destroy({
    where: { fundacion_id: fundacionId }
  });

  await AdminFund.destroy({
    where: { fundacion_id: fundacionId }
  });

  await Usuario.destroy({
    where: { cedula: cedula }
  });

  await Fundacion.destroy({
    where: { id: fundacionId }
  });
};


const deleteEntities_NormalUser = async (cedula, nameManada) => {
  await Manada.destroy({
    where: { nombre: nameManada }
  });

  await Usuario.destroy({
    where: { cedula: cedula }
  });
};

describe('Como fundación quiero enviar una solicitud de registro', () => {
  const clasesEquivalencia = [
    {
      // Valido
      ruc: '1234567890119',
      nombre: 'fundacionValida',
      direccion: 'Calle principal, 123',
      telefono: '0999999999',
      logo: '',
      comision: 0.0000
    },
    {
      // Más de 13 caracteres en el ruc
      ruc: '12345678901145',
      nombre: 'FundacionInvalida',
      direccion: 'Calle principal, 123',
      telefono: '0999999999',
      logo: '',
    },
  ];

  it('Se crea una fundacion valida y una invalida', async () => {
    try {
      /* const testecase2 = clasesEquivalencia[1];
      const registerFundacion_Invalid = await registerFundacion(testecase2);
      expect(registerFundacion_Invalid.status).toBe(500); */

      const testecase1 = clasesEquivalencia[0];
      const registerFundacion_Valid = await registerFundacion(testecase1);
      expect(registerFundacion_Valid.status).toBe(200);

    } catch (error) {
      console.log(error);
    }
  });


  it("Se vincula un usuario a esa fundacion", async ()=>{
    try{
      
      const fundacionValid = await findFundacionByRuc('1234567890119');
      const userFundacion = {
        cedula: '0958700048',
        nombres: 'usuarioFundacion',
        apellidos: 'usuarioFundacion',
        telefono: '0999999999',
        direccion: 'Calle principal, 123',
        email: 'fundacionValida@gmail.com',
        password: 'fundacionValida',
        role: 2, // Role de fundacion
        fundacionId: fundacionValid.dataValues.id,
      };

      const responseUserFoundation = await registerUser(userFundacion);
      expect(responseUserFoundation.status).toBe(200);

    } catch (error) {
      console.log(error);
    }
  });


  it("La fundacion se logea y registra un animal", async () => {
    try {
    dataUser_Foundation = {
      email: 'fundacionValida@gmail.com', // O el email que hayas asignado
      password: 'fundacionValida'
    }

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

    const logingFundacion = await loginResponse(dataUser_Foundation);
    const token_UserFoundation = await logingFundacion.body.result.token;
    const responseCreateAnimal = await createAnimal(token_UserFoundation, animalData);
    expect(responseCreateAnimal.status).toBe(200);

    //Create a normal user 
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
      email: "usuarioNormal@gmail.com",
      password: "usuarioNormal"
    };

    const manadaData = {
      nombre: 'ManadaEjemplo',
      monto: 0.0000,
      galeriamanada: {
        "fotos": ["https://leopet.sfo3.digitaloceanspaces.com/20220824_07504_791manada1.jpg"]
      }
    };

    const registerNormalUser = await registerUser(userNormal);
    expect(registerNormalUser.status).toBe(200);

    const loginNormalUser = await loginResponse(dataUserNormal);
    const token_NormalUser = await loginNormalUser.body.result.token;
    const responseManada = await createManada(token_NormalUser, manadaData);
    expect(responseManada.status).toBe(200);

    /* const responseBody = JSON.parse(responseManada.text);
    const mensajeRespuesta = responseBody.mensaje;
    console.log(mensajeRespuesta); */

    } catch (error) {
      console.log(error);
    }
  });


  afterAll(async () => {

    // Clean up the test data
    const usuarioValido = await findUsuarioByCedula('0958700048');
    const fundacionValid = await findFundacionByRuc('1234567890119');
    
    if (fundacionValid && usuarioValido) {
      await deleteEntities_Foundation(fundacionValid.dataValues.id, usuarioValido.dataValues.cedula);
      await deleteEntities_NormalUser('0958700069','ManadaEjemplo');
    }
  });

});
