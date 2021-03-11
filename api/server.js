// !! BUILD YOUR SERVER HERE

// ** Imports
const express = require('express');
const Users = require('./users/model');

// ** Express
const server = express();

// ** Middleware
server.use(express.json());

// ** Endpoints

// ?? GET ==> /api/users ==> return array
server.get('/api/users', async (req, res) => {
	try {
		const users = await Users.find();
		res.json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? GET ==> /api/users/:id ==> return user object

// ?? POST ==> /api/users ==> create user

// ?? DELETE ==> /api/users/:id ==> remove user

// ?? PUT ==> /api/users/:id ==> update user

// !! EXPORT YOUR SERVER instead of {}
module.exports = server;
