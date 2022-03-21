import express, {Express, json} from 'express'
import personalRouter from '../routes/personal.routes';
import usuarioRouter from '../routes/usuario.routes';
import asistenciaRouter from '../routes/asistencia.routes';
import conexion from './sequalize'
import cors from "cors";

export class Server{

    private readonly app: Express;
    private readonly puerto: number;

    constructor(){
        this.app = express()
        this.puerto= 8000;
        this.app.use(cors());
        this.bodyParser();
        this.rutas();
    }

    private bodyParser(){
        this.app.use(json());
    }

    private rutas(){
        this.app.use(personalRouter)
        this.app.use(usuarioRouter)
        this.app.use(asistenciaRouter)
    }
    public start(){
        this.app.listen(this.puerto, async() => {
            console.log(`Servidpr corriendo en el puerto ${this.puerto}`);
            //console.log(process.env.DATABASE_URL ?? "")
            await conexion.sync();
            console.log('Base de datos conectada exitosamente')
        });
    }
}