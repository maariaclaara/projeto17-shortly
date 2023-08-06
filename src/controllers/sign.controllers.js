import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signInToken } from "../repositories/sign.repositories.js";

// LOGIN
export async function signIn(req, res) {
  const { user } = res.locals;

  try {
    const token = uuid();

    await signInToken(user, token);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
  
  
  // CADASTRO
  export async function signUp(req, res) {
    const { name, email, password } = req.body;
  
    try {
      const emailExist = await db.query(
        `SELECT * FROM users WHERE email = $1`, [email])
      if (emailExist.rowCount != 0) return res.status(409).send("Conflict!");
  
      const crypt = bcrypt.hashSync(password, 10);
  
      await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, crypt]);

      return res.sendStatus(201);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
