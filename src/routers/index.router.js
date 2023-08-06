import { Router } from "express";
import signRouter from "./sign.router.js";
import urlRouters from "./urls.router.js";

const router = Router();

router.use(signRouter);
router.use(urlRouters);

export default router;