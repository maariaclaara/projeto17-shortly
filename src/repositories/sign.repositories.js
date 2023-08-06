import { db } from "../database/database.connection.js";

export function signInToken(users, token) {
  return db.query(
    `INSERT INTO tokens ("userId", token) VALUES ($1, $2)`,
    [ users[0].id, token ]
  );
}