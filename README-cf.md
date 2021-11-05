
# Backend server example

This is an API with the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The PSQL database is accessed via node-postgres.


## Acknowledgements

 - Built from an example by Northcoders

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

(__UPDATE THIS SECTION__)Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Deployment

(__UPDATE THIS SECTION__)To deploy this project run 

```bash
  npm run deploy
```

