const {connect, connection} = require('mongoose');

const connectionString
  = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/week-18-challenge-social-network';

connect(connectionString)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch(error => {
		console.error('Error connecting to MongoDB:', error);
	});

module.exports = connection;

