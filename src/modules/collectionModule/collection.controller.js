import { Router } from "express";
import {
  createBookCollection,
  createAuthorImplicit,
  createCappedCollection,
  createIndexOnTitle,
} from "./collection.service.js";

export const collectionRouter = new Router();

collectionRouter.post("/books", async (req, res) => {
  try {
    await createBookCollection();
    return res.status(201).json({ ok: 1 });
  } catch (error) {
    return res.status(error.cause.status).json({ error: error.message });
  }
});

collectionRouter.post("/authors", async (req, res) => {
  try {
    const { name, nationality } = req.body;
    const result = await createAuthorImplicit({ name, nationality });
    return res
      .status(201)
      .json({ acknowledged: true, insertedId: result.insertedId });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

collectionRouter.post("/logs/capped", async (req, res) => {
  try {
    await createCappedCollection();
    return res.status(201).json({ ok: 1 });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

collectionRouter.post("/books/index", async (req, res) => {
  try {
    await createIndexOnTitle();
    return res.status(201).json({ ok: 1 });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});
