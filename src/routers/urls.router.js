import { Router } from "express";
import { urlSchema } from "../schemas/urls.schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { authValidation } from "../middlewares/authValidation.js";
import { postUrl, deleteUrl, getUrl, getShortUrl} from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateSchema(urlSchema), authValidation, postUrl);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", getShortUrl);
urlsRouter.delete("/urls/:id", authValidation, deleteUrl);

export default urlsRouter;