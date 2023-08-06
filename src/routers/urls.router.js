import { Router } from "express";
import { urlSchema } from "../schemas/urls.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { authValidation } from "../middlewares/authValidation.js";
import { postUrl} from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, postUrl);
/*urlsRouter.get("/urls/:id", getUrl);
urlsRouter.delete("/urls/:id", deleteUrl);*/

export default urlsRouter;