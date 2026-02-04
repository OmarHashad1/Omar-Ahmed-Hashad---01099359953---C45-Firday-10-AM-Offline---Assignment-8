import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();



const URI = process.env.URI;
const client = new MongoClient(URI);

export const testConnection = async () => {
  try {
    await client.connect();
    console.log("DB connected Successfully");
  } catch (err) {
    console.log("DB connected Successfully", err);
  }
};

export const db = client.db("Route-Node-Assignment");
