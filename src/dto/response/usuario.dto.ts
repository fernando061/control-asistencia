import { Exclude, Expose } from "class-transformer"
import { TipoUsuario } from "../../model/usuarios.model"

@Exclude()
export class UsuarioDto{

    @Expose()
    usuarioId: string
    
    @Expose()
    usuarioDni: string
    
    @Expose()
    rol: TipoUsuario

    contrasena: string
    
    personalDni: string
    
    @Expose()
    usuarioJwt: string
}