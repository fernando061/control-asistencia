import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express"
import moment from "moment";
import {asistencia, personal } from '../config/models'
import { registroAsistenciaDto, reporteAsistenciaDto } from "../dto/request/asistencia.dto";
import sequalize from "../config/sequalize";
import { QueryTypes } from "sequelize";
import { Console } from "console";

export const AsistenciaIngresoController = async (req: Request, res: Response) => {
    try{
        const {body} = req;
        const hoy = moment().format('h:mm:ss a')

        body['ingreso'] = hoy
        body['fecha'] = moment().format("YYYY-MM-DD");
        const data = plainToClass(registroAsistenciaDto,body)
        
        const validacion = await validate(data)

        if(validacion.length != 0){
            const mensajes = validacion.map(error => error.constraints)
            return res.status(400).json({
                constent: mensajes,
                message: "Error en los valores"

            })
        }
        
        const busquedaPersonal = await personal.findOne({where: {personalDni: body.personalDni},})

        if(!busquedaPersonal){
            return res.status(400).json({
                content: null,
                message: "Error no existe personal registrado con este numero de documento",
            });
        }
        
        const valRegistro = await asistencia.findOne(
            {where: {personalDni: body.personalDni, fecha: moment().format("YYYY-MM-DD") }}
        )
        
        
        if(valRegistro){
            return res.status(400).json({
                content: valRegistro,
                message: "Ya se registro su ingreso a la FIEE",
            });
        }

        const regAsistencia = await asistencia.create(body);
    //    const personalRpta = await personal.findOne()

        return res.status(201).json({
            content: busquedaPersonal,
            message: "Se registro su ingreso a la fiee",
        });

        
    }catch(error){
        return res.status(400).json({
            message: "Error al crear el personal",
            content: error
        })
    }
}

export const AsistenciaSalidaController = async (req: Request, res: Response) => {
    try {
        const {body} = req;
        const hoy = moment().format('h:mm:ss a')


        const data = plainToClass(registroAsistenciaDto, body);
        const validacion = await validate(data)

        if(validacion.length != 0){
            const mensajes = validacion.map((error) =>  error.constraints)
            
            return res.status(400).json({
                content: mensajes,
                message: "Error en los valores"
            })
        }

        const busquedaPersonal = await personal.findOne({where: {personalDni: body.personalDni},})

        if(!busquedaPersonal){
            return res.status(400).json({
                content: null,
                message: "Error no existe personal registrado con este numero de documento",
            });
        }

        const asistenciaEncontrada = await asistencia.findOne(
            {where: {personalDni: body.personalDni , fecha: moment().format("YYYY-MM-DD")  }}
        )

        if (asistenciaEncontrada){
            if(asistenciaEncontrada.getDataValue('ingreso')){
                if(!asistenciaEncontrada.getDataValue('salida')){
                    const registroSalida = await asistencia.update({
                        salida: hoy,
                    },
                    {
                        where: {
                            personalDni: body.personalDni, fecha: moment().format("YYYY-MM-DD")
                        }, 
                            
                    })


                    const ResultRegistrada = await asistencia.findOne(
                        {where: {personalDni: body.personalDni , fecha: moment().format("YYYY-MM-DD")  }}
                    )
                    
                    return res.status(200).json({
                        content: busquedaPersonal,
                        message: "Se registro su salida de la FIEE"
                    })
                }else{
                    return res.status(400).json({
                        content: asistenciaEncontrada,
                        message: "Error ya se registro su salida"
                    });
                }
                
            }
        }else{
            return res.status(400).json({
                content: null,
                message: "Error aun no se registra su asistencia de ingreso"
            });
        }


    } catch (error) {
        return res.status(400).json({
            message: "Error al crear la salida",
            content: error
        })
    }

}

export const AsistenciaReporteController = async (req: Request, res: Response) => {
try{
    // const {body} = req;
    const body = req.params
    console.log(body)
    const data = plainToClass(reporteAsistenciaDto,body);
    const validacion = await validate(data);
    
    if(validacion.length != 0){
        const mensajes = validacion.map((error) =>  error.constraints)
        return res.status(400).json({
            content: mensajes,
            message: "Error en los valores"
        })
    }

    const personalEncontrado = await personal.findOne(
        {where: {personalDni: body.dni},
    })

    if(!personalEncontrado){
        return res.status(400).json({
            content: null,
            message: "No existe personal registrado con este numero de dni",
        });
    }
 
   



    const respuestaReporte = await sequalize.query('call p_reporteAsistencias(:indni)', { 
        replacements: { indni:body.dni}, 
        type: QueryTypes.SELECT,
        nest: true
        
        
      }).then(success => {
        //   console.log(success)
          const respuesta = success[0]
        return respuesta} )



// const t: nocq = respuestaReporte[0]
    //   console.log(J)
    //   let aea: String[]
      
    if(Object.entries(respuestaReporte).length!=0){
        return res.status(200).json({
            content:Object.values(respuestaReporte),
            message:"exitoso" 
        })
    }else{
        
        return res.status(200).json({
            content: personalEncontrado,
            message: `No hay registro de asistencia de ${personalEncontrado.getDataValue('nombre')} ${personalEncontrado.getDataValue('apPaterno')}`  ,
        });
    }



}catch(error){
    return res.status(400).json({
        message: "Error al generar el reporte",
        content: error
    })
}
      
      
    


}