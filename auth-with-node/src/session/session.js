import { client } from "./../db.js";

export const session = client.db("test").collection("session");

// indexes allows us to exponentially speed up the lookup time for DB queries
session.createIndex({ sessionToken: 1 });
