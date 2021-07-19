const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const dbCon = require('../db');

describe('REGISTER: POST - /user/register', () => {
    before(done => {
        dbCon.connect()
            .then(() => done())
            .catch(err => done(err));
    })

    after(done => {
        dbCon.disconnect()
            .then(() => done())
            .catch(err => done(err));
    })

    it('should register new user', async () => {
        const response = await request(app).post('/user/register')
            .send({
                username: "testusername",
                firstname: "testfirstname",
                lastname: "testlastname",
                email: "test.user@test.com",
                password: "test123"
            })

            expect(response.body).to.contain.property('message');
            expect(response.body.message).to.equal('A verification email has been sent to your registered email.');
    })

    it('should throw an error on registing a new user without passing all arguments', async () => {
        const response = await request(app).post('/user/register')
            .send({
                username: "testusername",
                firstname: "testfirstname",
                lastname: "testlastname",
                email: "test.user@test.com"
            })

            expect(response.body.message).to.equal('Please supply all fields - [username, firstname, lastname, email, password].');
    })
})


describe('LOGIN: POST - /user/login', () => {
    before(done => {
        dbCon.connect()
            .then(() => done())
            .catch(err => done(err));
    })

    after(done => {
        dbCon.disconnect()
            .then(() => done())
            .catch(err => done(err));
    })

    it('should authenticate the user and send back response object', async () => {
        const response = await request(app).post('/user/login')
            .send({
                username: "testusername",
                password: "test123"
            })

            expect(response.body).to.contain.property('token');
            expect(response.body).to.contain.property('user');
            expect(response.body.user.username).to.equal('testusername');
            expect(response.body.user.email).to.equal('test.user@test.com');
    })

    it('should say "Cannot find the user" upon passing invalid username', async () => {
        const response = await request(app).post('/user/login')
            .send({
                username: "someotheruser",
                password: "test123"
            })

            expect(response.body).to.contain.property('message');
            expect(response.body.message).to.equal('Cannot find the user');
    })

    it('should say "Password is wrong!" upon passing invalid password', async () => {
        const response = await request(app).post('/user/login')
            .send({
                username: "testusername",
                password: "randompassword"
            })

            expect(response.body).to.contain.property('message');
            expect(response.body.message).to.equal('Password is wrong!');
    })
})