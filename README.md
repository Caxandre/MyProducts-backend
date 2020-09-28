# MyProducts-backend

Backend of the MyProducts application, that allows you to store information about your favorite products. Built with Node.Js, Typescritp, Typeorm and Postgres database.

## Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [SuperTest](https://github.com/visionmedia/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## Installation

The following steps will help install and run MyProducts-backend on your local computer. Make sure database instances are active:

1. git clone https://github.com/Caxandre/MyProducts-backend.git;

2. Install all project dependencies with *npm install* or *yarn install*;

3. Enter the database settings in the file *ormconfig.json*;

4. Create migrations with *npm typeorm migration:run* or *yarn typeorm migration:run*;

5. Assign a value to the APP_SECRET variable in the ENV file, which will be used by the authentication middleware (jsonwebtoken);

6. Start the development server with *npm dev:server* or *yarn dev:server*.

## Tests

Before running the tests, create a database with the name **"database_tests"** so that all tests can run correctly.

To run the tests use the command *yarn test*

## Contact

Carlos Perrout - [Github](https://github.com/Caxandre) - **carlosperrout@gmail.com.br**
