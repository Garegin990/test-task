import request from "supertest";
import * as app from "../../index";

export default async function () {
    const response = await request(app).post("/api/user/sign-in").send({
        email: 'tester@gmail.com',
        password: '123456'
        });
        return response.body.token;
}