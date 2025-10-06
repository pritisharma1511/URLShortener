import {MongoClient} from "mongodb";
import { env} from "./env.js"

 
const dbClient = new MongoClient("mongodb://localhost");
await dbClient.connect();

// const db = dbClient.db('xtrapriti');
// const userCollection = db.collection("urldata");


console.log("hiii")

export {dbClient}