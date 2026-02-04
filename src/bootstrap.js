import { db } from "./DB/connection.js";
import { testConnection } from "./DB/connection.js";
import dotenv from "dotenv";
import express from "express";
import { logs } from "./DB/models/logs.model.js";
import { logsRouter } from "./modules/logsModule/logs.controller.js";
import { books } from "./DB/models/books.model.js";
import { collectionRouter } from "./modules/collectionModule/collection.controller.js";
import { booksRouter } from "./modules/booksModule/books.controller.js";
dotenv.config();

export const bootstrap = async () => {
  const PORT = process.env.PORT;
  const app = express();

  app.use(express.json());
  app.use("/books", booksRouter);
  app.use("/logs", logsRouter);
  app.use("/collection", collectionRouter);

  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });

  await testConnection();
};
