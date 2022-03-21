import { Router } from "express";

import * as personalController from "../controllers/personal.controller";

const personalRouter = Router();

personalRouter.post("/crear", personalController.registroController);

export default personalRouter;