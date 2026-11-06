
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");

        const db = client.db("AnimeVerseDB");
        const animes = db.collection("nodeAnimes");
        await animes.insertOne({
            title: "Jujutsu Kaisen",
            genre: "Action",
            rating: 8.8
        });
        console.log("Anime inserted successfully");

     
        const records = await animes.find({}).toArray();
        console.log("Anime Records:", records);

  
        const update = await animes.updateOne(
            { title: "Jujutsu Kaisen" },
            { $set: { rating: 9.0 } }
        );
        console.log("Updated records:", update.modifiedCount);

      
        const del = await animes.deleteOne({
            title: "Jujutsu Kaisen"
        });
        console.log("Deleted records:", del.deletedCount);

    } catch (error) {
        console.log("Database error:", error.message);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

main();
