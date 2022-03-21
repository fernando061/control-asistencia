import { DataTypes } from "sequelize";
import conexion from '../config//sequalize';
import { hashSync } from "bcrypt";
export enum TipoUsuario {
    ADMIN = "ADMIN",
    LOCADOR = "LOCADOR",
    POLLITO = "POLLITO"
}

export default () => 
    conexion.define('usuario',{
        usuarioId: {
            primaryKey:true,
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            field:'id',
        },
        usuarioDni: {
            type: DataTypes.CHAR(8),
            allowNull: false,
            unique:true,
            field: 'usuario'
        },
        contrasena: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'contrasena',
            set(valor: string){
                const contrasenaEncriptada = hashSync(valor, 10)
                this.setDataValue('contrasena', contrasenaEncriptada)
            }
        },
        rol: {
            type: DataTypes.ENUM(TipoUsuario.ADMIN,TipoUsuario.LOCADOR,TipoUsuario.POLLITO),
            defaultValue: TipoUsuario.POLLITO,
            field: "rol"
        }
    },{
        tableName:"usuario",
        timestamps:false
})