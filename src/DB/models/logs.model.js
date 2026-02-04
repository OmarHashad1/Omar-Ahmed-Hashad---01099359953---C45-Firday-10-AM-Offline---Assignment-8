import { db } from "../connection.js";
export const logs = db.createCollection("logs", {
  capped: true,
  size: 1024,
  max: 100,
});
