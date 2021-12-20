
# CF's news site API project

## Summary

//////This is an API with the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The PSQL database is accessed via node-postgres.

This is an API with the purpose of accessing application data programatically. This project builds a back-end service and demonstrates:
- Use of MVC architecture
- Integration of a PSQL database
- Test driven development and effective error handling
- Building a RESTful API
- Use of a node.js web server app

This has been written using:
- node.js
- Express (web server app framework)
- PSQL (database)
- node-pg (PSQL / node interaction)
- Jest & supertest for TDD
- Git for version control
- Heroku for hosting.


## Demo

Project hosted on Heroku: https://server-example-cgf.herokuapp.com/api/


## Features

Endpoints include:
- __GET /api/__ Welcome page with description of options (providing further information on the below endpoints).
- __GET /api/topics__ Provides the list of topics present on the news board.
- __GET /api/artices/:article_id__ Receive a specific article by requesting an article_id.
- __PATCH /api/articles/:article_id__ Allows the update of specific parameters for an existing article.
- __GET /api/articles__ Receive a list of all articles. Requests can be filtered by 'topic'. Requests can be sorted by article title, date created, and can be returned in ascending / descending order.
- __GET /api/articles/:article_id/comments__ Receive the list of comments for a particular article.
- __POST /api/articles/:article_id/comments__ Post a comment to an article. Must be a valid user (checked via username) before posting.
- __DELETE /api/comments/:comment_id__ Delete an existing comment.

Error handling is present to provide client feedback on incompatible requests


## Installation

- fork and clone this github repo
- install the following dependencies:
  -  "dotenv": "^10.0.0",
  -  "express": "^4.17.1",
  -  "pg": "^8.7.1",
  -  "pg-format": "^1.0.4"
      note: versions listed above were those used for the initial deploy.
- note: the following dev dependencies were used:
  -  "jest": "^27.3.1",
  -  "jest-sorted": "^1.0.12",
  -  "nodemon": "^2.0.14",
  -  "supertest": "^6.1.6"
- seeding the local database: npm run setup-dbs, npm run seed
- running in test env: npm run test
- running in dev env: npm run dev
- running in prod env: npm seed:prod, npm start
- this project was deployed on Node.js version 16.8.0 and psql 12.8
- the .env.test and .env.development files are not included in the git repo. These are required to deploy this project. To set them up, the following steps are required:
  - create these 2 files in the root drectory
  - define PGDATABASE (as noted in the setup.sql file), and PGPASSWORD (if required)



- clone this github repo into a directory of your choice. Do this by running the following command in your terminal:

```bash
git clone https://github.com/cgfennelly/nc-news-backend.git
```

- Open the repo folder in your IDE and run the following commands to install the dependencies and developer dependencies:

```bash
npm install
npm install --dev
```

- Set up the development and testing databases by running this command:

```bash
npm run setup-dbs
```

This will create the databases (both test and development versions) in psql.

- Next, create two `.env` environment files which will direct our databse connection code to connect to the correct database while testing or working with our development database.
   in the root directory of the repo, create the following two files:

- `.env.development`:
  edit the file to add a single line:

```env
PGDATABASE=nc_news
```

- `.env.test`:
  edit the file to add a single line:

```env
PGDATABASE=nc_news_test
```
[note: depending on your local machine set up, you may also need to add 'PGPASSWORD' to each .env file. This is the password to access psql.]

- Run the following command to seed data to these databases:

```bash
npm run seed
```

6. This completed the set up in the local environment. To run the test script, try the following command:

```bash
npm test app
```


## Dependency versions

This project was developed using the following dependency versions:

- Node: v16.8.0

- dependencies:

  -  "dotenv": "^10.0.0",
  -  "express": "^4.17.1",
  -  "pg": "^8.7.1",
  -  "pg-format": "^1.0.4"

- note: the following dev dependencies were used:
  -  "jest": "^27.3.1",
  -  "jest-sorted": "^1.0.12",
  -  "nodemon": "^2.0.14",
  -  "supertest": "^6.1.6"

## Acknowledgements

 - Project scope defined by Northcoders

## Authors

- [@chrisfennelly](https://www.github.com/cgfennelly)

