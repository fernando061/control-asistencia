import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator"
import { TipoUsuario } from "../../model/usuarios.model"


export class crearUsuarioDto {

    @IsString()
    @IsNotEmpty()
    @Length(8)
    usuarioDni: string

    @IsString()
    @Matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#&?])[A-Za-z\d@$!%*#&?]{6,}/,
      {
        message:
          "Password invalida, debe de ser al menos una mayus, una minus, un numero y un caracter especial y no menor de 6 caracteres",
      }
    )
    @IsNotEmpty()
    contrasena: string

    @IsEnum(TipoUsuario)
    @IsOptional()
    rol?: TipoUsuario 

    @IsString()
    @IsNotEmpty()
    @Length(8)
    personalDni: string
}