const request = require('supertest');

const app = require('../app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');

beforeEach(() => seed(testData));
afterAll(() => db.end());

let patchBody = {};

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
        test('Status 200: topics returned to client (in array)', () => {
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
        test('Status 200: individual article returned to client (in array)', () => {
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
                        comment_count: expect.any(Number)
                    })
                );
            });
        });
        test('Checking the comment_count for a specific article_id', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({ body }) => {
                const { article } = body;
                expect(article).toHaveLength(1);
                expect(article[0]).toEqual(
                    expect.objectContaining({
                        article_id: 1,
                        comment_count: 11
                    })
                );
            });
        });
        describe('Endpoint GET /api/articles/:article_id - Error handling', () => {
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
    describe('Endpoint PATCH /api/articles/:article_id', () => {
        test('Status 200: updated article returned to client (in array)', () => {
            //Assertion1: update of votes for article 5 from 0 --> 9
            patchBody = {inc_votes: 9};
            return request(app)
            .patch('/api/articles/5')
            .send(patchBody)
            .expect(200)
            .then(({ body }) => {
                const { article } = body;
                expect(article).toHaveLength(1);
                expect(article[0]).toEqual(
                    expect.objectContaining({
                        article_id: 5,
                        votes: 9,
                        //update of votes
                    })
                );
            });    
        });
        test('Status 200: updated article returned to client (in array)', () => {
            //Assertion2: update of votes for article 5 from 0 --> -10
            const patchBody = {inc_votes: -10};
            return request(app)
            .patch('/api/articles/5')
            .send(patchBody)
            .expect(200)
            .then(({ body }) => {
                const { article } = body;
                expect(article).toHaveLength(1);
                expect(article[0]).toEqual(
                    expect.objectContaining({
                        article_id: 5,
                        votes: -10,
                        //update of votes
                    })
                );
            }); 
        });
        test('Status 200: updated article returned to client (in array)', () => {
            //Assertion3: update of votes for article 1 from 100 --> -200
            const patchBody = {inc_votes: -300};
            return request(app)
            .patch('/api/articles/1')
            .send(patchBody)
            .expect(200)
            .then(({ body }) => {
                const { article } = body;
                expect(article).toHaveLength(1);
                expect(article[0]).toEqual(
                    expect.objectContaining({
                        article_id: 1,
                        votes: -200,
                        //update of votes
                    })
                );
            });
        });
        describe('Endpoint PATCH /api/articles/:article_id - Error handling', () => {
            test('Bad article_id. Status 400: Bad parameter passed', () => {
                patchBody = {inc_votes: 9};
                return request(app)
                .patch('/api/articles/BAD_QUERY')
                .send(patchBody)
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe("Bad parameter passed");
                });
            });
            test('Valid article_id that doesnt exist in the database', () => {
                patchBody = {inc_votes: 9};
                return request(app)
                .patch('/api/articles/1234')
                .send(patchBody)
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe('No content found');
                });
            });
            test('Valid article_id but bad body passed', () => {
                patchBody = {inc_votes: "BAD_INPUT"};
                return request(app)
                .patch('/api/articles/5')
                .send(patchBody)
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe('Inputted data not formatted correctly');
                });
            });
            test('Valid article_id but empty body passed', () => {
                patchBody = {inc_votes: ''};
                return request(app)
                .patch('/api/articles/5')
                .send(patchBody)
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe('Inputted data not formatted correctly');
                });
            });
            test('Valid article_id and body, but client also trying to update other values', () => {
                patchBody = {inc_votes: 69, author: "ILLEGAL_INPUT"};
                return request(app)
                .patch('/api/articles/5')
                .send(patchBody)
                .expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe('Inputted data not formatted correctly');
                });
            });
        })
    })
    describe.only('Endpoint GET /api/articles', () => {
        test('A standard GET /api/articles request. Status 200: all articles returned', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
                const { articles } = body;
                articles.forEach((element) => {
                    expect(element).toEqual(
                        expect.objectContaining({
                            article_id: expect.any(Number),
                            title: expect.any(String),
                            votes: expect.any(Number),
                            topic: expect.any(String),
                            author: expect.any(String),
                            created_at: expect.any(String),
                            comment_count: expect.any(String)
                        })
                    );  
                });
                expect(articles).toHaveLength(12);
            });
        })
    })
});
