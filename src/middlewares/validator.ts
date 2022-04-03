import { verify } from "jsonwebtoken";
import { Request,Response,NextFunction } from "express"
import {Model} from "sequelize"
import { usuario } from "../config/models";
import { TipoUsuario } from "../model/usuarios.model";
export interface RequestUser extends Request{
usuario?: Model
}

export const authValidator = async (req: RequestUser, res: Response, next: NextFunction) => {

    if(!req.headers.authorization){
        return res.status(401).json({
            message: "Se necesita una token para esta peticion",
            content: null,
        })
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
        const payload = verify(token,process.env.JWT_TOKEN ?? "");
        console.log(payload)
        if(typeof payload === 'object'){
           const usuario1 = await usuario.findByPk(payload.usuarioId,{
               attributes: {exclude: ["contrasena"]},
           });
           if(!usuario1){
               return res.status(400).json({
                   message: "Usuario no existe en la base de datos"
               });
           }
           req.usuario = usuario1
        }
        
        next()
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message)
        }
    }

}

export const adminValidator = async (req: RequestUser, res: Response, next: NextFunction) => {
    const tipo: TipoUsuario = req.usuario?.getDataValue('rol')

    if(tipo === TipoUsuario.POLLITO || tipo === TipoUsuario.LOCADOR){
        return res.status(401).json({
            message: "El usuario no tiene privilegios suficientes",
            content: null
        })
    }else{
        next();
    }
}