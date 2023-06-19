const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const User = require('./models');
const Thought = require('./models');

async function seedData() {
  const uri = 'mongodb://127.0.0.1/week-18-challenge-social-network'
    const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('week-18-challenge-social-network');


    // Data to be entered for users
    const usersCollection = database.collection('users');
    const userData = [
      { username: 'BigBird', email: 'bigbird@sesamestreet.com', thoughts: [], friends: [] },
      { username: 'Grover', email: 'grover@sesamestreet.com', thoughts: [], friends: [] },
      { username: 'Elmo', email: 'elmo@sesamestreet.com', thoughts: [], friends: [] },
      { username: 'CookieMonster', email: 'cookies@sesamestreet.com', thoughts: [], friends: [] },
    ];
    const usersResult = await usersCollection.insertMany(userData);
    console.log(`${usersResult.insertedCount} documents inserted into 'users' collection.`);


  } 
  finally {
    await client.close();
  }
}

seedData().catch(console.error);
