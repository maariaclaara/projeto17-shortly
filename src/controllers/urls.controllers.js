import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid'
import { updateUrl } from "../repositories/sign.repositories.js";

export async function postUrl (req, res){
        const { url } = req.body
        const { userId } = res.locals.session;
        const shortUrl = nanoid();

    try{
        await db.query(
            `INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3)`, 
            [url, userId, shortUrl]);

        const createUrl = await db.query(
            `SELECT * FROM urls WHERE "shortUrl" = $1`, 
            [shortUrl])

            const id = createUrl.rows[0].id;

            res.status(201).send({ id, shortUrl });
        }
    catch{
        res.status(500).send(error.message);
    }
};

export async function getUrl (req, res){
    
    const { id } = req.params;

  try {
    const listUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, 
        [id]);

    if (listUrl.rowCount <= 0) return res.status(404).send("Not Found!");
    
    res.status(200).send(listUrl.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export async function getShortUrl (req, res){
    
  const { shortUrl } = req.params;

  try {
    const { rows, rowCount } = await db.query(
    `SELECT * FROM urls WHERE "shortUrl"=$1`, 
    [shortUrl]
  );
    console.log(rows)
    if (!rowCount) {
      return res.sendStatus(404);
    }

    const redirectUrl = rows[0].url;
    const countVisit = rows[0].visit + 1;

    await updateUrl(countVisit, shortUrl);
    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


export async function deleteUrl (req, res){

  const { id } = req.params;
  const { userId } = res.locals.session;
  try {
    const { rowCount: urlExists } = await db.query(
      `SELECT id, "shortUrl", url FROM urls WHERE id=$1`, 
      [id]);
    if (!urlExists) {
      return res.sendStatus(404);
    }

    const { rowCount } = await db.query(
      `SELECT * FROM urls WHERE "userId"=$1 AND id=$2`, 
      [userId, id]
    );;
    if (!rowCount) {
      return res.sendStatus(401);
    }

    await db.query(
      `DELETE FROM urls WHERE id=$1`, 
      [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}