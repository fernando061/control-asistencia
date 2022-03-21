import { IsDateString, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class registroAsistenciaDto{

    @IsDateString()
    @IsOptional()
    fecha: Date

    @IsString()
    @IsOptional()
    ingreso: string

    @IsString()
    @IsOptional()
    salida: string

    @IsString()
    @IsNotEmpty()
    @Length(8)   
    personalDni: string
}

export class reporteAsistenciaDto{

    @IsString()
    @IsNotEmpty()
    @Length(8)
    dni: string
}