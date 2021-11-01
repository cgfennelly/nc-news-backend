const format = require('pg-format');
const db = require('../connection.js');

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // topics, users, articles, comments
  return db.query('DROP TABLE IF EXISTS comments;')
  .then(() => {
    return db.query('DROP TABLE IF EXISTS articles;')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS users;')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS topics;')
  })
  .then(() => {
    return db.query(`
    CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY,
      description TEXT
    );`);
  })
  .then(() => {
    return db.query(`
    CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      avatar_url VARCHAR,
      name VARCHAR
    );`);
  })
  .then(() => {
    return db.query(`
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR,
      body TEXT,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
  })
  .then(() => {
    return db.query(`
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body TEXT
    );`);
  })
  .then(() => {
    // 2. insert data
    const queryStr = format(
      `INSERT INTO topics (
        slug,
        description
      )
      VALUES %L RETURNING *;`,
      topicData.map((item) => [item.slug, item.description])
    );
    return db.query(queryStr);
  })
  .then(() => {
    const queryStr = format(
      `INSERT INTO users (
        username,
        avatar_url,
        name
      )
      VALUES %L RETURNING *;`,
      userData.map((item) => [item.username, item.avatar_url, item.name])
    );
    return db.query(queryStr);
  })
  .then(() => {
    const queryStr = format(
      `INSERT INTO articles (
        title,
        body,
        votes,
        topic,
        author,
        created_at
      )
      VALUES %L RETURNING * ;`,
      articleData.map((item) => [item.title, item.body, item.votes, item.topic, item.author, item.created_at])
    );
    return db.query(queryStr);
  })
  .then(() => {
    const queryStr = format(
      `INSERT INTO comments (
        author,
        article_id,
        votes,
        created_at,
        body
      )
      VALUES %L RETURNING * ;`,
      commentData.map((item) => [item.author, item.article_id, item.votes, item.created_at, item.body])
    );
    return db.query(queryStr);
  });  
};

module.exports = seed;
