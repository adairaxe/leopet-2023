const request = require("supertest");
const app = require("../../app");

const databaseName = process.env.MYSQL_DATABASE;
const configKey = databaseName;
const config = require('../config')[configKey][process.env.NODE_ENV];
const isDataBaseEnabled = require('../config').integradoradb.IsEnabled;

const sequelize = new Sequelize(config);

describe("Prueba de anima router" , () => {
    describe("POST /get/animals" , () =>{
        it("La ruta funciona" , async () => {
            const response = (await request(app).get("/get/animals")).send();
            expect(response.status).toBe(200);
            expect(response.headers["content-type"].toContain("json"));
        })
    })
})