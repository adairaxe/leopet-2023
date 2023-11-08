const supertest = require("supertest");
const app = require("../../app");
const db = require("../../DB");
const Fundacion = require("../../DB/fundacion");
const Animal = require("../../DB/animal");
const Usuario = require("../../DB/usuario");

describe("Como fundación quiero enviar una solicitud de registro", () => {
  const clasesEquivalencia = [
    {
      //Valido
      ruc: "1234567890111",
      nombre: "fundacion",
      direccion: "Calle principal, 123",
      telefono: "0999999999",
      logo: ""
    },
    {
      //Más de 13 caracteres en el ruc
      ruc: "12345678901145",
      nombre: "XYZk",
      direccion: "Calle principal, 123",
      telefono: "0999999999",
      logo: ""
    },
  ];

  it("Se crea una fundacion valida y una invalida", async () => {

    let testecase1 = clasesEquivalencia[0];
    const responseCase1 = await supertest(app)
      .post("/fundacion/register")
      .send(testecase1);
    expect(responseCase1.status).toBe(200);

    let stateFundacion = await Fundacion.findOne({
      where: { ruc: testecase1.ruc }
    });
    expect(stateFundacion.aprobado).toBe(true);


    const userFundacion = {
      cedula: '0958700048',
      nombres: 'fundacion1',
      apellidos: 'fundacion1',
      telefono: '0999999999',
      direccion: 'Calle principal, 123',
      email: 'fundacion1@gmail.com',
      password: 'fundacion1',
      role: 2, // Role de donador
      fundacionId: stateFundacion.id
    };
    const responseUser = await supertest(app)
      .post("/auth/register")
      .send(userFundacion)
    console.log(responseUser);
    expect(responseUser.status).toBe(200);


    let userInDB = await Usuario.findOne({
      where: { cedula: userFundacion.cedula }
    });
    console.log(userInDB.dataValues);
    

    const animalData = {
      nombre: "Max",
      especie: "Perro",
      raza: "Labrador",
      descripcion: "Max es un perro muy cariñoso y juguetón.",
      imagen: "https://example.com/max.jpg",
      galeria: [],
      peso: 20,
      sexo: true,
      enfermedades: "",
      esterilizacion: true,
      vacunacion: true,
      desparasitacion: true,
    };
    const responseAnimal = await supertest(app)
      .post("/animal/create",{User: userInDB.dataValues})
      .send(animalData)
    expect(responseAnimal.status).toBe(200);

    /* let testecase2 = clasesEquivalencia[1];
    const responseCase2 = await supertest(app)
      .post("/fundacion/register")
      .send(testecase2);
    expect(responseCase2.status).toBe(500); */

    /* const responseEliminar = await supertest(app)
      .post("/fundacion/delete")
      .send({ fundacionId : testecase1.ruc
      });
    expect(responseEliminar.status).toBe(200); */

    

    /* let deleteFoundation = Fundacion.destroy({
      where: {
        ruc: testecase1.ruc
      }
    }); */

  });
  
});