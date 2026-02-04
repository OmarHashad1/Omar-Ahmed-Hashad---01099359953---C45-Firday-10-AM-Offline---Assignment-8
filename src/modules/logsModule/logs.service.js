import { db } from "../../DB/connection.js";
import { ObjectId } from "mongodb";
export const insertLog = async ({ book_id,action }) => {
  try {
    const data = await db
      .collection("logs")
      .insertOne({ book_id: new ObjectId(book_id), action });
    return data;
  } catch (err) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};
