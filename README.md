
# Backend server example

This is an API with the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The PSQL database is accessed via node-postgres.


## Acknowledgements

 - Project scope defined by Northcoders

## Authors

- [@chrisfennelly](https://www.github.com/cgfennelly)


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