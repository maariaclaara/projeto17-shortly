import { Router } from "express";
import { userSignUp, userSignIn } from "../schemas/sign.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js"; 
import { signIn, signUp} from "../controllers/sign.controllers.js";

const userRouter = Router();

userRouter.post("/signin", validateSchema(userSignIn), signIn);
userRouter.post("/signup", validateSchema(userSignUp), signUp);

export default userRouter;