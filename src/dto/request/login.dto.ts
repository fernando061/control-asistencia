import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto{

    @Length(7,10)
    @IsString()
    @IsNotEmpty()
    dni: string

    @IsString()
    @IsNotEmpty()
    contrasena: string

}