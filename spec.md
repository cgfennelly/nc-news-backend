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

## GET api/topics ##
- Build TDD for happy path (/)
- Is there a sad path for this? (/) - (No - no potential for mistaken client input)
- Build function (/)

## GET api/articles/:article_id ##
- Build TDD for happy path (/)
- Build TDD for sad path (/)
- Build function


## FUTURE TASKS ##
- Can move the 'catch all bad path' controller into the error-handler controllers and take out of the app.js
- Any complicated model condition checks? Extract that into a utils function.
- Refactor for async / await.
- Refactor test file as different describe blocks per endpoint (rather than nesting).