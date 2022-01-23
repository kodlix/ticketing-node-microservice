import request from 'supertest';
import { app } from '../../app';

it("returns with a cookie after successful signin", async () => {
    await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson",
        password: "password"
    })
    .expect(201);

    const response = await request(app)
    .post('/api/user/signout')
    .send({})
    .expect(200);

    expect(response.get('Set-Cookie')[0]).toBeDefined();
});