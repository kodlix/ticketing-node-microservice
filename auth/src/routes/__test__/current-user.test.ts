import request from 'supertest';
import { app } from '../../app';

it("returns the deatil of the current user.", async () => {  
    const cookie = await global.signin();
    const response = await request(app)
    .get('/api/user/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

    expect(response.body?.currentUser?.email).toEqual('chikajohnson@gmail.com');
});