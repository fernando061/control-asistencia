import {  IsDateString, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class crearPersonalDto{


    @IsString()
    @IsNotEmpty()
    @Length(8)
    personalDni: string

    @IsString()
    @IsNotEmpty()
    nombre: string

    @IsString()
    @IsNotEmpty()
    apPaterno: string

    @IsString()
    @IsNotEmpty()
    apMaterno: string

    @IsString()
    @IsNotEmpty()
    @Length(7,9)
    telefono: string

    @IsDateString()
    @IsOptional()
    fechNacimiento: Date

}