import request from 'supertest';
import { app } from '../../app';

it("returns a 201 on successful signup", async () => {
    return request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson@gmail.com",
        password: "password"
    })
    .expect(201);
});

it("returns a 400 for an invalid email", async () => {
    return request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson",
        password: "password"
    })
    .expect(400);
});

it("returns a 400 for an invalid password", async () => {
    return request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson",
        password: "e"
    })
    .expect(400);
});

it("returns a 400 for a missing email or password", async () => {
    await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson",
    })
    .expect(400);

    await request(app)
    .post('/api/user/signup')
    .send({
        password: "password"
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
    await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson@gmail.com",
        password: "password"
    })
    .expect(201);

    await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson@gmail.com",
        password: "password"
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson@gmail.com",
        password: "password"
    })
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});