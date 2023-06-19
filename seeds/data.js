const { MongoClient } = require('mongodb');

async function seedData() {
  const uri = 'mongodb://127.0.0.1/week-18-challenge-social-network'
    const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('week-18-challenge-social-network');
    const collection = database.collection('week-18-challenge-social-network');

    // Data to be entered
    const data = [
      { username: 'John', email: 25. 
      
      
    ];

    // Inserting the data into the collection
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);
  } finally {
    await client.close();
  }
}

seedData().catch(console.error);
