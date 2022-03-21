import { DataTypes } from "sequelize";
import conexion from '../config/sequalize';
// import {v4} from 'uuid'

export default () => 
    conexion.define('personal',{
        personalDni:{
            primaryKey:true,
            type:DataTypes.STRING(11),
            unique: true,
            field:'id',
        },
        nombre:{
            type: DataTypes.STRING(200),
            allowNull: false,
            field:'nombre',
        },
        apPaterno:{
            type: DataTypes.STRING(100),
            allowNull: false,
            field:'ap_paterno',
        },
        apMaterno:{
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'ap_materno',
        },
        telefono:{
            type: DataTypes.STRING(9),
            allowNull: true,
            field: 'telefono',
        },
        fechNacimiento:{
            type: DataTypes.DATEONLY,
            allowNull: true,
            field:'fech_nacimiento'
        }
    },{
        tableName:"personal",
        timestamps:false
});