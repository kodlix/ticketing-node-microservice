import request from 'supertest';
import { app } from '../../app';

it("fails when an email that does  not exists is supplied", async () => {
    return request(app)
    .post('/api/user/signin')
    .send({
        email: "chikajohnson@gmail.com",
        password: "password"
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
    await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson",
        password: "password"
    })
    .expect(201);

    await request(app)
    .post('/api/user/signin')
    .send({
        email: "chikajohnson",
        password: "abcdef"
    })
    .expect(400);
});


it("returns with a cookie after successful signin", async () => {
    await request(app)
    .post('/api/user/signup')
    .send({
        email: "chikajohnson",
        password: "password"
    })
    .expect(201);

    const response = await request(app)
    .post('/api/user/sigin')
    .send({
        email: "chikajohnson@gmail.com",
        password: "password"
    })
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});