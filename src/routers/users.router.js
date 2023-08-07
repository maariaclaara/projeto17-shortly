import { Router } from "express";
import { getUsers } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/authValidation.js";

const usersRouter = Router();

usersRouter.get("/users/me", authValidation, getUsers);

export default usersRouter;