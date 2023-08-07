import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {

    try {
      const { rows: ranking } = await db.query(`
      SELECT users.id, users.name, COUNT(*) as "linksCount", SUM(urls.visit) AS "visitCount"
      FROM urls
      LEFT JOIN users ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC
      LIMIT 10;`);

      res.status(200).send(ranking);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }