NC NEWS

## CREATING DATABASE AND SEEDING ##
- create tables; view them in psql for dev + test (/)
- complete seed function to pull in data (check for dev + test) (/)

TESTING
- No TDD during creation of dbs. Do visual checks on database. (/)
- Add TDD for checking data once in db. (x)

POINTS TO CHECK
- Can I update seed.js to use async / awaits rather than .then chain?
- I do not understand what the utils function is required for


## BUILDING A SIMPLE API END POINT AND ERROR HANDLING ##
- API welcome message returned. Build Routers into this from beginning (/)
- TDD for API welcome message (/)
- TDD for 404 Bad URL (/)

POINTS TO CHECK
- Can I build TDD for the 500 error handler? (/) - (No, it was discussed in lecture but it doesn't seem standard to test for the server dropping out / etc)

## GET /api/topics ##
- Build TDD for happy path (/)
- Is there a sad path for this? (/) - (No - no potential for mistaken client input)
- Build function (/)

## GET /api/articles/:article_id ##
- Build TDD for happy path (/)
- Build TDD for sad path (/)
- Build function (/)

## PATCH /api/articles/:article_id ##
- TDD for happy path (multiple examples) (/)
- Build function for happy path (/)
- TDD for sad path: (/)
-- bad parameter passed (/)
-- valid parameter but no db entry present (/)
-- bad body passed (inc if multiple keys) (/)
-- valid body passed but not value on object (/)
- Build function

## GET /api/articles ##
- TDD for returning the correct data (/)
- Build function (/)
- TDD for default sort order of date DESC (/)
- TDD for client input of sort query (/)
- Build function (/)
- TDD for changing order of default sort (created_at) (/)
- TDD for both sort_by and order (/)
- Build function (/)
- TDD for topic selection (/)
- Build function (/)
- Error Handle: validate the user input for sort_by and order (/)

## GET /api/articles/:article_id/comments ##
- TDD for requesting articleID and receiving array of comments  
- Build function

ERRORS
- ensure BAD article_IDs can't be passed in
- allow sql to deal with articl_id numbers that don't exist in db.


## FUTURE TASKS ##
- Can move the 'catch all bad path' controller into the error-handler controllers and take out of the app.js
- Any complicated model condition checks? Extract that into a utils function.
- Refactor for async / await.
- Refactor test file as different describe blocks per endpoint (rather than nesting).