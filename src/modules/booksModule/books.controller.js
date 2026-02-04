import { Router } from "express";
import {
  getBookByTitle,
  insertDocumentBooks,
  insertMultipleDocuments,
  updateBookTitle,
  getBooksinSpecificInterval,
  getBookByGenre,
  getLimitedBooks,
  getBooksBySortedYear,
  getBooksExcludeGenres,
  deleteBookBeforeCertainYear,
  getSortedBooksbyFilter,
  getBooksByGenres,
  joinBooksWithLogs,
} from "./books.service.js";
export const booksRouter = Router();

booksRouter.post("/", async (req, res) => {
  try {
    const { title, author, year, genres } = req.body;
    const result = await insertDocumentBooks({ title, author, year, genres });
    return res
      .status(201)
      .json({ acknowledged: true, insertedId: result.insertedId });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.post("/batch", async (req, res) => {
  try {
    const books = req.body;
    const result = await insertMultipleDocuments(books);
    return res
      .status(201)
      .json({ acknowledged: true, insertedIds: result.insertedIds });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.patch("/feature", async (req, res) => {
  try {
    const result = await updateBookTitle();
    return res.status(201).json({
      acknowledged: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/title", async (req, res) => {
  try {
    const { title } = req.query;
    const result = await getBookByTitle({ title });
    return res.status(201).json({
      result,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.delete("/before-year", async (req, res) => {
  try {
    const { year } = req.query;
    const result = await deleteBookBeforeCertainYear({ year });
    return res.status(201).json({
      acknowledged: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/year", async (req, res) => {
  try {
    const { from, to } = req.query;
    const result = await getBooksinSpecificInterval({ from, to });
    return res.status(201).json({
      result,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/genre", async (req, res) => {
  try {
    const { genre } = req.query;
    const result = await getBookByGenre({ genre });
    return res.status(201).json({
      result,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/skip-limit", async (req, res) => {
  try {
    const { skip_limit } = req.query;
    const result = await getLimitedBooks({ skip_limit });
    return res.status(201).json({
      result,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/year-integer", async (req, res) => {
  try {
    const result = await getBooksBySortedYear();
    return res.status(201).json({
      result,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/exclude-genres", async (req, res) => {
  try {
    const result = await getBooksExcludeGenres();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/aggregate1", async (req, res) => {
  try {
    const result = await getSortedBooksbyFilter();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/aggregate2", async (req, res) => {
  try {
    const result = await getBookSpecificInfoInYear();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/aggregate3", async (req, res) => {
  try {
    const result = await getBooksByGenres();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});

booksRouter.get("/aggregate4", async (req, res) => {
  try {
    const result = await joinBooksWithLogs();
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.cause?.status || 500)
      .json({ error: error.message });
  }
});
