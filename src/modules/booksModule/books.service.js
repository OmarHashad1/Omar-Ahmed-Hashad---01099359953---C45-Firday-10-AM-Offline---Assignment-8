import { db } from "../../DB/connection.js";

export const insertDocumentBooks = async ({ title, author, year, genres }) => {
  try {
    const data = await db
      .collection("books")
      .insertOne({ title, author, year, genres });
    return data;
  } catch (err) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const insertMultipleDocuments = async (books) => {
  try {
    const data = await db.collection("books").insertMany(books);
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const updateBookTitle = async () => {
  try {
    const data = await db.collection("books").updateOne(
      {
        title: "Feature",
      },
      {
        $set: {
          year: 2020,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBookByTitle = async ({ title }) => {
  try {
    const data = await db.collection("books").findOne({
      title: title,
    });
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBooksinSpecificInterval = async ({ from, to }) => {
  try {
    const data = await db
      .collection("books")
      .find({
        year: { $gte: Number(from), $lte: Number(to) },
      })
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBookByGenre = async ({ genre }) => {
  try {
    const data = await db
      .collection("books")
      .find({
        genres: genre,
      })
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getLimitedBooks = async ({ skip_limit }) => {
  try {
    const data = await db
      .collection("books")
      .find({})
      .skip(2)
      .limit(Number(skip_limit))
      .sort({ year: -1 })
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBooksBySortedYear = async () => {
  try {
    const data = await db
      .collection("books")
      .find({})
      .sort({ year: 1 })
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBooksExcludeGenres = async () => {
  try {
    const data = await db
      .collection("books")
      .find({
        genres: { $nin: ["Horror", "Science Fiction"] },
      })
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const deleteBookBeforeCertainYear = async ({ year }) => {
  try {
    const data = await db.collection("books").deleteMany({
      year: { $lt: Number(year) },
    });
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getSortedBooksbyFilter = async () => {
  try {
    const data = await db
      .collection("books")
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBookSpecificInfoInYear = async () => {
  try {
    const data = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $project: { title: 1, author: 1, year: 1, _id: 0 } },
      ])
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const getBooksByGenres = async () => {
  try {
    const data = await db
      .collection("books")
      .aggregate([
        { $unwind: "$genres" },
        { $project: { title: 1, genres: 1, _id: 0 } },
      ])
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const joinBooksWithLogs = async () => {
  try {
    const data = await db
      .collection("logs")
      .aggregate([
        {
          $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details",
          },
        },
        {
          $unwind: "$book_details",
        },
        {
          $group: {
            _id: "$action",
            book_details: {
              $push: {
                title: "$book_details.title",
                author: "$book_details.author",
                year: "$book_details.year",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            action: "$_id",
            book_details: 1,
          },
        },
      ])
      .toArray();
    return data;
  } catch (error) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};
