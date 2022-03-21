import { Router } from "express";

import * as AsistenciaController from "../controllers/asistencia.controller";

const asistenciaRouter = Router();

asistenciaRouter.post("/Registro-Ingreso", AsistenciaController.AsistenciaIngresoController);
asistenciaRouter.put("/Registro-Salida", AsistenciaController.AsistenciaSalidaController);
asistenciaRouter.get("/Reporte-Asistencia/:dni",AsistenciaController.AsistenciaReporteController);

export default asistenciaRouter;