const supertest = require("supertest");
const app = require("../../app");
const Fundacion = require("../../DB/fundacion");
const Animal = require("../../DB/animal");



describe("Como fundación quiero registrar nuevos animales en el sistema", () => {
  it("Primero se debe crear el animal", async () => {
    const newAnimal = {
      nombre: "Pancho",
      especie: "Gato",
      raza: "Birmano",
      descripcion: "Pancho es un gato muy activo y cazador. Le gusta comer bastante.",
      imagen: "https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2021-02/CAT%20BREED%20Hero%20Mobile_0038_Birman.jpg?itok=4N5_yZCi",
      galeria: [],
      peso: 20,
      sexo: true,
      enfermedades: "",
      esterilizacion: true,
      vacunacion: true,
      desparasitacion: true,
    };

    const usuario = {
      ruc: "1234567890111",
      nombre: "XYZ",
      direccion: "Calle principal, 123",
      telefono: "0999999999",
      logo: ""
    };


    const res = await supertest(app)
    .post('/animal/create', function(req, res){ req = usuario })
    .send(newAnimal);
    expect(res.status).toBe(201); // Debería devolver un código de respuesta 201 (Created).
    expect(res.body).toHaveProperty('id'); // Verificar si el cuerpo de la respuesta contiene un ID.
    expect(res.body.nombre).toBe('Pancho'); // Verificar si el nombre del animal coincide.


  });


});  
