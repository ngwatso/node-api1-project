// !! BUILD YOUR SERVER HERE

// ** Imports
const express = require('express');
const User = require('./users/model');

// ** Express
const server = express();

// ** Middleware
server.use(express.json());

// ** Endpoints

// ?? GET ==> /api/users ==> return array
server.get('/api/users', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? GET ==> /api/users/:id ==> return user object
server.get('/api/users/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: 'bad id' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err });
	}
});

// ?? POST ==> /api/users ==> create user
server.post('/api/users', async (req, res) => {
	const user = req.body;

	if (!user.name || !user.bio) {
		res.status(400).json({ message: 'name and bio required' });
	} else {
		try {
			const newUser = await User.insert(user);
			res.status(200).json(newUser);
		} catch (err) {
			console.log(err);
			res.status(500).json({ error: err });
		}
	}
});

// ?? DELETE ==> /api/users/:id ==> remove user

// ?? PUT ==> /api/users/:id ==> update user

// !! EXPORT YOUR SERVER instead of {}
module.exports = server;
