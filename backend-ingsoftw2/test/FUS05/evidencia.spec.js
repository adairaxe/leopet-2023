const supertest = require("supertest");
const app = require("../../app");

describe("Como fundación quiero ", () => {
    it("The fundation should send a notification to donor" , async () => {
        // Create the fundation
        const response = await supertest(app)
        .post("/fundacion/create")
        .send({
            ruc: "1234567891011",
            nombre: "XYZ",
            direccion: "duran 123",
            telefono: "0989998043"
            });
        expect(response.status).toBe(200);
        const fundacion = await response.body;
        console.log(fundacion);
    })
});