import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express"
import {usuario} from '../config/models'
import { crearUsuarioDto } from "../dto/request/usuario.dto";
import { UsuarioDto } from "../dto/response/usuario.dto";
import { sign, SignOptions } from "jsonwebtoken";
import { TipoUsuario } from "../model/usuarios.model";
import { LoginDto } from "../dto/request/login.dto";
import { compareSync } from "bcrypt";
import { RequestUser } from "../middlewares/validator";

interface Payload {
    usuarioId: string
    usuarioDni: string
    rol: TipoUsuario

}

const tokenOptions: SignOptions = {
    expiresIn: "1h"
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
        
        const jwt = sign(payload, process.env.JWT_TOKEN ?? "",tokenOptions)

        const content = plainToClass(UsuarioDto, {...nuevoUsuario.toJSON(),
                                                    usuarioJwt: jwt})
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

export const login = async (req: Request, res: Response) => {

    const validador = plainToClass(LoginDto,req.body)
    try{
        const resultado = await validate(validador)
        
        if(resultado.length !== 0){
            return res.status(400).json({
                content: resultado.map(error => error.constraints),
                message: "Informacion incorrecta"
            })
        }

       const UsuarioEncontrado = await usuario.findOne({where:{usuarioDni: validador.dni}})
console.log(UsuarioEncontrado)
        if(!UsuarioEncontrado){
            return res.status(400).json({
                message: "Usuario incorrecto",
                content: null,
            })
        }

        const resultadoPass = compareSync(validador.contrasena,
                        UsuarioEncontrado.getDataValue("contrasena"))
        
        if(!resultadoPass){
            return res.status(400).json({
                message: 'Usuario incorrecto',
                content: null,
            })
        }

        const payload: Payload ={
            usuarioDni: UsuarioEncontrado.getDataValue('usuarioDni'),
            usuarioId: UsuarioEncontrado.getDataValue('usuarioId'),
            rol: UsuarioEncontrado.getDataValue('rol')
        }
        console.log(payload)
        const jwt = sign(payload, process.env.JWT_TOKEN ??  "",tokenOptions);
        console.log(jwt)
        return res.json({
            content: jwt,
            message: null
        })

    }catch(error){
        if(error instanceof Error){
            return res.status(400).json({
                message: "error al hacer login",
                content: error.message,
            })
        }
        
    }
}

export const perfil = (req: RequestUser, res: Response) => {
    
    console.log(req.usuario)
    const content = plainToClass(UsuarioDto, req.usuario)

    return res.json({
        message: "Hola desde el endpoint final",
        content
    })
}