# Lantronix Backend Assessment - by Mahesh Bahadur

This is a Node project which have two functionalities:
1. Register
2. Login

## Setup

Run `npm install` command to install the dependencies to run this application.
```
npm install
```

## Project Description

This application contains 8 js files:
1. server.js - Main file that will bootstrap, makes the server listen on port 3000 (default port).
2. app.js - This exposes two apis:
    * /user/register - which executes registerUser() method of userRepo.
    * /user/login - which executes authenticateUser() method of userRepo.
3. schema/user.js - It contains the user schema and returns a User model.
4. repo/user.js - It contains the implementation logic of registerUser and authenticateUser.
5. db/index.js - It establishes the connection with MongoDB "userprofiledb" database.
6. test/user.js - It contains the test cases which tests /user/register and /user/login apis.
7. send-email.js - This is responsible for triggering email to the addressee upon successful user registration. This throws an exception if valid emailID's not supplied in USER, PASS, FROM and TO fields from .env file.
8. .env - It contains the environment variables used by send-email.js file

## Running unit tests

Run `npm run test` to execute the unit tests.


## Other details
*   Used `bcrypt` package to encrypt/decrypt user password.
*   Used `nodemailer` package to trigger email.
*   Used `morgan` package for logging http requests.
*   Used `mocha` test framework to run unit test cases.
*   Used `dotenv` package for supplying env variables to the application.
