import { Router } from "express";
import signRouter from "./sign.router.js";

const router = Router();

router.use(signRouter);

export default router;