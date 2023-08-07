import { db } from "../database/database.connection.js";

export async function getUsers (req, res){

    const { userId } = res.locals.session;

  try {
    const { rows: userData } = await db.query(
      `SELECT us.id, us.name, SUM(ur.visit) AS "visitCount",
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ur.id,
            'shortUrl', ur."shortUrl",
            'url', ur.url,
            'visitCount', ur.visit
          )) AS "shortenedUrls"
          FROM users us
          JOIN urls ur ON ur."userId" = us.id
          WHERE us.id =$1
          GROUP BY us.id;`,
      [userId]
    );

    res.status(200).send(userData[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


