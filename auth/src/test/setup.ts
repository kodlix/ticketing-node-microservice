import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
    var signin: () => Promise<string[]>;
  }

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "secret-key";
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        //useNewUrlParser: true,
        // useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async() => {
    const email = "chikajohnson@gmail.com";
    const password = "password";

    const response = await request(app)
    .post('/api/user/signup')
    .send({
        email,
        password
    })
    .expect(201);

    const cookie = response.get('Set-Cookie');
    return cookie;
}