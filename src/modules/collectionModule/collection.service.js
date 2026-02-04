import { db } from "../../DB/connection.js";

export const createBookCollection = async () => {
  try {
    const data = await db.createCollection("books", {
      validator: {
        title: {
          $type: "string",
        },
      },
    });
    return data;
  } catch (err) {
    throw new Error("Enternal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const createAuthorImplicit = async ({ name, nationality }) => {
  try {
    const data = await db.collection("authors").insertOne({
      name,
      nationality,
    });
    return data;
  } catch (err) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const createCappedCollection = async () => {
  try {
    const data = db.createCollection("logs", {
      capped: true,
      size: 1024,
      max: 100,
    });
    return data;
  } catch (err) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

export const createIndexOnTitle = async () => {
  try {
    const data = await db.collection("books").createIndex({ title: 1 });
    return data;
  } catch (err) {
    throw new Error("Internal Server Error", {
      cause: {
        status: 500,
      },
    });
  }
};

