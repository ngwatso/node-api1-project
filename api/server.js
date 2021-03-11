// !! BUILD YOUR SERVER HERE

// ** Imports
const express = require('express');

// ** Express
const server = express();

// ** Middleware
server.use(express.json());

// ** Endpoints

// ?? POST ==> /api/users ==> create user

// ?? GET ==> /api/users ==> return array

// ?? GET ==> /api/users/:id ==> return user object

// ?? DELETE ==> /api/users/:id ==> remove user

// ?? PUT ==> /api/users/:id ==> update user

// !! EXPORT YOUR SERVER instead of {}
module.exports = server;
