const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');

const uri = "mongodb://localhost:27017/movies"; // Corrected URI for local MongoDB connection

const app = express();
app.use(bodyParser.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB and handle connection errors
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db('movies');
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process if connection fails
  }
}

app.post('/submitRating', async (req, res) => {
  const { id, rating } = req.body;

  if (!id || rating === undefined) {
    return res.status(400).json({ error: 'Missing id or rating' });
  }

  const db = await connectToDB();
  const collection = db.collection('movies');

  try {
    // Convert rating to a number and check if it's valid
    const numericRating = Number(rating);
    if (isNaN(numericRating)) {
      return res.status(400).json({ error: 'Invalid rating value' });
    }

    // Update the database
    const result = await collection.updateOne(
      { id },
      { $push: { ratings: numericRating } },
      { upsert: true }
    );

    res.json({ success: true, result });
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).json({ error: err.message });
  }
});

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log("Received SIGINT, shutting down server...");
  await client.close(); // Close MongoDB client
  process.exit(0);
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
