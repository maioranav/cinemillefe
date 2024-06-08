# Cinemille Frontend

The goal is to create a web application for managing the movies of a multiplex cinema.\
The application should allow viewing the list of movies scheduled in a multiplex cinema,\
in order to organize a searchable history for the managers.

## RestAPI

The software is connected to a backend written in Java Spring Boot, which I also developed,\
available [here](https://github.com/maioranav/cinemille).

## Involved Stack

- Angular
- Typescript
- SASS

## Available scripts

The following commands are executable from the terminal:

### `npm run start`

Runs the application in development mode.\
Browse https://localhost:4200 to use it.

Any changes to the code are refreshed live.\
ESLint blocks and displays any errors in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Environment

You can configure environment variables from the environment.ts\
file located in the src/environments folder.\
You can also create an environment.prod.ts file to specify production variables.
