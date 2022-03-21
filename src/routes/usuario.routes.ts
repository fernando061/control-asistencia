
import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";
// import { adminValidator, authValidator } from "../middlewares/validator";
const usaurioRouter = Router();

usaurioRouter
    .post("/registro", usuarioController.crearUsuario)

export default usaurioRouter