
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";

const movieSchema = {
  id: String,
  ratings: [Number]
}

const movies = [
  { id: "god", ratings: [] },
  { id: "kung_fu_panda_4", ratings: [] },
  { id: "dune_part_2", ratings: [] },
  { id: "1917", ratings: [] },
  { id: "oppenheimer", ratings: [] },
  { id: "stranger_things", ratings: [] },
  { id: "game_of_thrones", ratings: [] },
  { id: "last_of_us", ratings: [] },
  { id: "breaking_bad", ratings: [] }
];

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db('movies');
    const collection = database.collection('movies');

    function submitRating(id, rating) {
      alert("Hello")
      if (rating !== null) {
        try {
          const result = updateDocument(id, rating);
          console.log("Document updated successfully", result);
          alert("Rating submitted: " + rating);
        } catch (err) {
          console.log("Error updating document: ", err);
          alert("Error submitting rating: " + err.message);
        }
      } else {
        alert("Please select a rating.");
      }
    }

    function updateDocument(id, rating) {
      console.log(id, rating);
      return new Promise((resolve, reject) => {
        collection.updateOne(
          { id: id },
          { $push: { ratings: parseInt(rating) } },
          { upsert: true },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
  module.exports = { submitRating: submitRating }
}
run().catch(console.dir);
