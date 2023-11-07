const supertest = require("supertest");
const app = require("../../app");
const db = require("../../DB");
const Fundacion = require("../../DB/fundacion");
const Animal = require("../../DB/animal");
const { animal } = require("../../controllers/validations");

describe("Como fundación quiero enviar una solicitud de registro", () => {
  const clasesEquivalencia = [
    {
      //Valido
      ruc: "1234567890111",
      nombre: "XYZ",
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

    const animalData = {
      nombre: "Max",
      especie: "Perro",
      raza: "Labrador",
      descripcion: "Max es un perro muy cariñoso y juguetón. Le encanta jugar a la pelota y salir a pasear. Es un perro muy obediente y fácil de entrenar. Max está buscando un hogar lleno de amor y donde pueda jugar todo el día.",
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
      .post("/animal/create", function(req, res){ req = testecase1 })
      .send(animalData);
    console.log(responseAnimal);
    expect(responseAnimal.status).toBe(200);

    /* let deleteFoundation = Fundacion.destroy({
      where: {
        ruc: testecase1.ruc
      }
    }); */

  });

  it("Se registra un animal en la fundación creada" , async() => {
    
  })

  
});