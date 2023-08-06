import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signInValidation(req, res, next) {
    const { email, password } = req.body;
    try {
      const { rows: user, rowCount: userExists } = await db.query(
        `SELECT * FROM users WHERE email=$1`, 
        [email]);
      if (!userExists) {
        return res.sendStatus(401);
      }
      const isPasswordValid = bcrypt.compareSync(password, user[0].password);
      if (!isPasswordValid) {
        return res.sendStatus(401);
      }
      res.locals.user = user;
      next();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }