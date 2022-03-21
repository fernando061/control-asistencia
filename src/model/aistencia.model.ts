import moment from "moment";
import { DataTypes } from "sequelize";
import conexion from '../config/sequalize'

export default () => conexion.define(
    'asistencia',{
        asistenciaId:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: 'id',
        },
        fecha:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: new Date,
            field: 'fecha',
        },
        ingreso:{
            type: DataTypes.STRING(30),
            allowNull: true,
            field:'hIngreso'
        },
        salida:{
            type: DataTypes.STRING(30),
            allowNull: true,
            field:'hSalida'
        },
        // fkPersonal:{
        //     type
        // }

    },
    
    {
        tableName: "asistencia",
        timestamps: false
    }
)