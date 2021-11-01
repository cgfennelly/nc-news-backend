const request = require('supertest');

const app = require('../app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('Server tests', () => {
    describe('Simple endpoint', () => {
        test('client input of "/api" responds with 200 and welcome message', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then(({ body }) => {
                expect(body.msg).toBe('Welcome to the API homepage');
            });
        });
    });
    describe('Generalised error handlers', () => {
        test('Status 404: Bad URL', () => {
            return request(app)
            .get('/api/BAD_PATH')
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
        });
    })
});
