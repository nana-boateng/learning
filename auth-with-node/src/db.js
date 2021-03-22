import mongo from "mongodb";

// why not just destructure MongoClient from mongo?
// because it inexplicably throws an error
const { MongoClient } = mongo;

const url = process.env.MONGO_URL;

export const client = new MongoClient(url, { useNewUrlParser: true });

export async function connectDb() {
  try {
    await client.connect();

    // confirms connection
    await client.db("admin").command({ ping: 1 });
    // we can trust this console log to only run
    // after the above code because of the await
    console.log("🗄️ DB connected");
  } catch (e) {
    console.error(e);
  }
}
