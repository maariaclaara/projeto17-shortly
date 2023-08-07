import { Router } from "express";
import signRouter from "./sign.router.js";
import urlRouter from "./urls.router.js";
import usersRouter from "./users.router.js";
import rankingRouter from "./ranking.router.js";

const router = Router();

router.use(signRouter);
router.use(urlRouter);
router.use(usersRouter);
router.use(rankingRouter);

export default router;