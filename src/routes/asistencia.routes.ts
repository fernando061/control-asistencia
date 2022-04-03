import { Router } from "express";

import * as AsistenciaController from "../controllers/asistencia.controller";
import { adminValidator, authValidator } from "../middlewares/validator";

const asistenciaRouter = Router();

asistenciaRouter.post("/Registro-Ingreso", AsistenciaController.AsistenciaIngresoController);
asistenciaRouter.put("/Registro-Salida", AsistenciaController.AsistenciaSalidaController);
asistenciaRouter.get("/Reporte-Asistencia/:dni",authValidator,adminValidator,AsistenciaController.AsistenciaReporteController);

export default asistenciaRouter;