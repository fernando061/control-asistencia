import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express"
import {usuario} from '../config/models'
import { crearUsuarioDto } from "../dto/request/usuario.dto";
import { UsuarioDto } from "../dto/response/usuario.dto";
import { sign } from "jsonwebtoken";
import { TipoUsuario } from "../model/usuarios.model";

interface Payload {
    usuarioId: string
    usuarioDni: string
    rol: TipoUsuario

}




export const crearUsuario = async (req: Request, res: Response) => {
    try{
        const {body} = req;
        const data = plainToClass(crearUsuarioDto, body)
        const validacion = await validate(data)

        if(validacion.length != 0){
            const mensajes = validacion.map(error => error.constraints)
            return res.status(400).json({
                content: mensajes,
                message: "Error en los valores"
            })
        }

        const usuarioEncontrado = await usuario.findOne(
            {where: {usuarioDni: body.usuarioDni},
        })

        if(usuarioEncontrado){
            return res.status(400).json({
                content: null,
                message: "Usuario ya existe",
            });
        }

        const nuevoUsuario = await usuario.create(body)
       

        const payload: Payload = {
            usuarioDni: nuevoUsuario.getDataValue('usuarioDni'),
            usuarioId: nuevoUsuario.getDataValue('usuarioId'),
            rol: nuevoUsuario.getDataValue('rol')

        }
        
        // const jst = sign(payload, process.env.JWT_TOKEN)

        const content = plainToClass(UsuarioDto, nuevoUsuario.toJSON())
        return res.status(201).json({
            content,
            message: "Usuario creado exitosamente"
        })
    }catch(error){
        return res.status(400).json({
            message: "Error al crear el personal",
            content: error
        })
    }
}