import { db } from "../connection.js";
export const books = await db.createCollection("books", {
  validator: {
    title: {
      $type: "string",
    },
  },
});
