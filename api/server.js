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
		res.status(500).json({
			message: 'The users information could not be retrieved',
		});
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
			res.status(404).json({
				message: `The user with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'The user information could not be retrieved',
		});
	}
});

// ?? POST ==> /api/users ==> create user
server.post('/api/users', async (req, res) => {
	const user = req.body;

	if (!user.name || !user.bio) {
		res.status(400).json({
			message: 'Please provide name and bio for the user',
		});
	} else {
		try {
			const newUser = await User.insert(user);
			res.status(201).json(newUser);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message:
					'There was an error while saving the user to the database',
			});
		}
	}
});

// ?? DELETE ==> /api/users/:id ==> remove user
server.delete('/api/users/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.remove(id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({
				message: `The user with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'The user could not be removed' });
	}
});

// ?? PUT ==> /api/users/:id ==> update user
server.put('/api/users/:id', async (req, res) => {
	const { id } = req.params;
	const user = req.body;
	try {
		const updatedUser = await User.update(id, user);
		if (user) {
			res.status(200).json(updatedUser);
		} else if (!user.name || !user.bio) {
			res.status(400).json({
				message: 'Please provide name and bio for the user',
			});
		} else {
			res.status(404).json({
				message: `The user with the specified ID (${id}) does not exist`,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'The user information could not be modified',
		});
	}
});

// !! EXPORT YOUR SERVER instead of {}
module.exports = server;
