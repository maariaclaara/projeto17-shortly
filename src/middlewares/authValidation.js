export async function authValidation(req, res, next) {

  function authToken(token) {
    return db.query(
      `SELECT * FROM tokens WHERE token=$1`,
      [token]
    );
  }

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  try {
    const session = await authToken(token);
    if (!session.rowCount) return res.sendStatus(401);
    res.locals.session = session.rows[0];
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}