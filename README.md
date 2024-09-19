# RecursiveTechnicalTest
This is a technical test to assess technical skills.
## Install
- Deploy from github
- npm i
## Operation
For the technical test to work as described in its description you can run: 
- npm start

You can also get a js distribution with:
- npm run prod

For demonstration purposes and to make it look more dynamic we have enabled an http server that can be called from a browser and putting any category after localhost:3000/ will return the requested output. You can activate it with: 
- npm run server

To run the tests you can use: 
- npm test

## Technologies used

A node project has been set up with typescript and nodemon for live operation.

Jest has been used for testing purpose.

## Future improvements.

Allow that if the call method is post the categories can be passed in the body instead of using the default ones.

Add a service to retrieve the categories in order to make it easier to retrieve them from a database.

Create a frontend project that consumes the API and improves the presentation that is being given.

