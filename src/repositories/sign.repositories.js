import { db } from "../database/database.connection.js";

export function authToken(token) {
  return db.query(
    `SELECT * FROM tokens WHERE token=$1`,
    [token]
  )
}

export function signInToken(user, token) {
  return db.query(
    `INSERT INTO tokens ("userId", token) VALUES ($1, $2)`,
    [ user[0].id, token ]
  );
}

export function updateUrl(visit, shortUrl){
  return db.query(
    `UPDATE urls visit SET visit=$1 WHERE "shortUrl"=$2`, 
    [visit, shortUrl]
  );
}