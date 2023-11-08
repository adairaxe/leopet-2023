const supertest = require("supertest");
const app = require("../../app");

describe("JWT", () => {
    it("Should validate the login of a user with yous credentials and JWT" , async () => {
            test_email = "donador@gmail.com";
            test_password = "1234";
            const response = await supertest(app)
                .post("/auth/login")
                .send({ email: test_email, password: test_password });
            expect(response.status).toBe(200);     
    })
});