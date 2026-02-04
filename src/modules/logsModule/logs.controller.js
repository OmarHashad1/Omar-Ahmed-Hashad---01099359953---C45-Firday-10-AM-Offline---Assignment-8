import { Router } from "express";
import { insertLog } from "./logs.service.js";
export const logsRouter = new Router();

logsRouter.post("/", async (req, res) => {
  try {
    const { book_id, action } = req.body;
    const result = await insertLog({ book_id, action });
    return res
      .status(201)
      .json({ acknowledged: true, insertedId: result.insertedId });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});
