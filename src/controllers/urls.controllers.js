import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid'

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
    
    const { shortUrl, visit } = req.params;

    try {
      const listShortUrl = await db.query(
        `SELECT * FROM urls WHERE "shortUrl" = $1`, 
        [shortUrl]);

        if (listShortUrl.rowCount <= 0) return res.status(404).send("Not Found!");

        const listVisit = await db.query(
            `SELECT * FROM urls WHERE visit = $1`, 
            [visit]);

        const countVisit = listVisit.rows[0].visit + 1;

        await db.query(
            `UPDATE urls SET visit = $1 WHERE "shortUrl"=$2`, 
            [countVisit, shortUrl]);
        
        const redirectUrl = listShortUrl.rows[0].url;
        
      res.redirect(redirectUrl);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


export async function deleteUrl (req, res){

    const { id } = req.params.id;
    const { shortUrl } = req.params;

  try {
    const deleteShortUrl = await db.query(`SELECT * FROM urls WHERE id=$1`, [id]
    );

    if (deleteShortUrl.rowCount <= 0) return res.status(404).send("Not Found!");

    const listShortUrl = await db.query(
        `SELECT * FROM urls WHERE "shortUrl" = $1`, 
        [shortUrl]);

    if (deleteShortUrl.rows[0] != listShortUrl.rows[0]) return res.status(401).send("ID Not Found!")
 
    if (deleteShortUrl.rows[0] === listShortUrl.rows[0]){
        await db.query(`DELETE FROM urls WHERE id=$1`,
      [id]);
    }
    
    return res.sendStatus(204);
  }
  catch{
    return res.status(500).send(err.message)
  }

}