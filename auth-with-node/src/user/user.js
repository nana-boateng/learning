import { client } from "../db.js";

export const user = client.db("test").collection("user");

// indexes allows us to exponentially speed up the lookup time for DB queries
user.createIndex({ "email.address": 1 });
