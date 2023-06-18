const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/week-18-challenge-social-network')
	.then(() => {
		console.log('Connected to MongoDB');
		// Routes
		app.use('/api/users', require('./routes/user-routes'));
		app.use('/api/thoughts', require('./routes/thought-routes'));

		// Start the server
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch(error => {
		console.error('Error connecting to MongoDB:', error);
	});
	