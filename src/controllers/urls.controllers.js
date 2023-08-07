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
    
    const {id} = req.params
    const {shortUrl, url} = req.body

    try{
        const listUrl = (`SELECT * FROM urls WHERE id = $1, "shortUrl" = $2, url = $3`, 
        [id, shortUrl, url]);

        if (listUrl.rowCount < 1) {
            return res.sendStatus(404)
          };

        res.status(200).send({ id, shortUrl, url });
    } 
    catch{
        res.status(500).send(error.message);
    }
};


export async function deleteUrl (req, res){

     const {id} = req.params
    const {shortUrl, userId} = req.body

    try {
        const deleteUrls = (`SELECT * FROM urls WHERE id = $1, "shortUrl" = $2, "userId" = $3`, 
        [id, shortUrl, userId]);
  
      if (deleteUrls.rowCount < 1) {
        return res.sendStatus(404)
      };
  
      if (shortUrl.rows[0] != userId.rows[0]) {
        return res.sendStatus(401)
      };
  
      await db.query(`DELETE FROM urls WHERE id=$1`,
        [id]);
      
      return res.sendStatus(204);
    }
    catch{
      return res.status(500).send(err.message)
    }
  
  }