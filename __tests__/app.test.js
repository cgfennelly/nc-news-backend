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
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Path not found');
            });
        });
    });
    describe('Endpoint GET /api/topics', () => {
        test('Status 200: topics returned in an array', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body }) => {
                const { topics } = body;
                expect(topics).toHaveLength(3);
                topics.forEach((element) => {
                    expect(element).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String),
                        })
                    );
                });
            });
        });
    });
    describe('Endpoint GET /api/articles/:article_id', () => {
        test('Status 200: individual article returned in array', () => {
            return request(app)
            .get('/api/articles/5')
            .expect(200)
            .then(({ body }) => {
                const { article } = body;

                expect(article).toHaveLength(1);
                expect(article[0]).toEqual(
                    expect.objectContaining({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        body: expect.any(String),
                        votes: expect.any(Number),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                    })
                );
            });
        });
        describe('Endpoint GET /api/articles/:article_id - Error Handling', () => {
            test('Bad article_id. Status 400: Bad parameter passed', () => {
                return request(app)
                .get('/api/articles/BAD_QUERY')
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe("Bad parameter passed");
                });
            })
            test('Valid article_id that doesnt exist in the database', () => {
                return request(app)
                .get('/api/articles/1234')
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('No content found');
                });
            });
        });
    });
});
