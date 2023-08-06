import { Router } from "express";
import signRouter from "./sign.router.js";
import urlRouter from "./urls.router.js";

const router = Router();

router.use(signRouter);
router.use(urlRouter);

export default router;