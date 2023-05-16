# Getting Started with tepache-backend-framework

This project is an GraphQL API that follows all the best practices in DDD built with the following stack:
* [ApolloServer](https://www.apollographql.com/docs/apollo-server/).
* [Nexus](https://nexusjs.org/).
* [Prisma](https://www.prisma.io/).
* [Jest](https://jestjs.io/)
* [GCP Node Libraries](https://cloud.google.com/nodejs/docs/reference).

To start working with this project you must run the following scripts in this exact order:
PS: Ask to the dev team to provide you the environment variables
1. `npm i`
2. `npm run generate`
3. `npm run dev`

## Available Scripts

In the project directory, you can run:

### `npm run generate`

Generates all the necessary files to work with prisma and nexus

### `npm run dev`

Start the service in development mode

### `npm run introspect`

Pull the last changes from the database to prisma

### `npm run sync`

Push the last changes from prisma to the database

### `npm run studio`

Start the sandbox to interact with the database using prisma

### `npm run test`

Run all the writen tests from the test folder

### `npm run build`

Compiles the typescript code to javascript in order to create an environment ready to production

### `npm start`

Start the ready to production environment

## Learn More

To learn more about Domain Driven Design, check out the fantastic [DDD Post form @jonathanloscalzo](https://medium.com/@jonathanloscalzo/domain-driven-design-principios-beneficios-y-elementos-primera-parte-aad90f30aa35).
