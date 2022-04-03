
import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller";
import { authValidator } from "../middlewares/validator";
// import { adminValidator, authValidator } from "../middlewares/validator";
const usaurioRouter = Router();

usaurioRouter
    .post("/registro", usuarioController.crearUsuario)
    .post("/login",usuarioController.login)
    .get("/me",authValidator,usuarioController.perfil)

export default usaurioRouter