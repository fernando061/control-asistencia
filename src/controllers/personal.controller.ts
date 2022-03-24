import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express"
import {personal } from '../config/models'
import {crearPersonalDto} from '../dto/request/personal.dto'

export const registroController = async (req: Request, res: Response) => {
    try{
        const {body} = req;

        const data = plainToClass(crearPersonalDto, body)
        const validacion = await validate(data)

        if(validacion.length != 0){
            const mensajes = validacion.map((error) =>  error.constraints)

            return res.status(400).json({
                content: mensajes,
                message: "Error en los valores"
            })
        }

        const personalEncontrado = await personal.findOne(
            {where: {personalDni: body.personalDni},
        })

        if(personalEncontrado){
            return res.status(400).json({
                content: null,
                message: "Personal ya existe",
            });
        }
        
        const nuevoPersonal = await personal.create(body);

        // nuevoPersonal.save();
        return res.status(201).json({
            content: nuevoPersonal,
            message: "Personal creado exitosamente",
        });

    }catch(error){
        return res.status(400).json({
            message: "Error al crear el personal",
            content: error
        })
    }
}

export const updatePersonalController = async(req: Request, res: Response) => {

    try{
        const {body} = req
        const data = plainToClass(crearPersonalDto,body)

        const validacion = await validate(data)

        if(validacion.length != 0){
            const mensaje = validacion.map(error => error.constraints)
            return res.status(400).json({
                content: mensaje,
                message: "Error en los valores"
            })
        }

        const busquedaPersonal = await personal.findOne({where: {personalDni: body.personalDni},})

        if(!busquedaPersonal){
            return res.status(400).json({
                content: null,
                message: "No existe personal con este numero de documento"
            })
        }

        // const registroPersonal = await personal.update(body,);

        return res.status(201).json({
            // content: registroPersonal,
            message: "Registro exitoso"
        });
        
    }catch(error){
        return res.status(400).json({
            mmessage: "Error al registrar un personal",
            content: error
        })
    }

}


