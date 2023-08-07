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
    const { rows, rowCount } = await db.query(`SELECT * FROM urls WHERE id = $1, "shortUrl" = $2, url = $3`, 
        [id]);
    if (!rowCount) {
      return res.sendStatus(404);
    }
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export async function getShortUrl (req, res){
    
    const { shortUrl } = req.params;

    try {
      const { rows, rowCount } = await db.query(
        `SELECT * FROM urls WHERE "shortUrl"=$1`, 
        [shortUrl]);
      if (!rowCount) {
        return res.sendStatus(404);
      }

      const redirectUrl = rows[0].url;
      const countVisit = rows[0].visit + 1;
  
      await db.query(
        `UPDATE urls visit SET visit=$1 WHERE "shortUrl"=$2`, 
        [visit, shortUrl]);
        
      res.redirect(redirectUrl);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


export async function deleteUrl (req, res){

    const {id} = req.params
    const { userId } = res.locals.session;

    try {
        const { rowCount: urlExists } = await db.query(`SELECT * FROM urls WHERE id = $1, "shortUrl" = $2, url = $3`, 
        [id]);
        if (!urlExists) {
          return res.sendStatus(404);
        }
       
        const { rowCount } = await db.query(`SELECT * FROM urls WHERE id = $1, "shortUrl" = $2, url = $3`, 
        [id, userId]);
        if (!rowCount) {
        return res.sendStatus(401);
        }
  
      await db.query(`DELETE FROM urls WHERE id=$1`,
        [id]);
      
      return res.sendStatus(204);
    }
    catch{
      return res.status(500).send(err.message)
    }  
  };