import personalModel from "../model/personal.model";
import asistenciaModel from "../model/aistencia.model";
import usuariosModel from "../model/usuarios.model";
// RELACIONES
export const personal = personalModel()
export const asistencia = asistenciaModel()
export const usuario = usuariosModel()

personal.hasMany(asistencia, {foreignKey:{name: "personalDni", allowNull: false, field: "personal_dni"}})

asistencia.belongsTo(personal, {
    foreignKey: {name:"personalDni", allowNull:false, field: "personal_dni"}
})

personal.hasOne(usuario, {foreignKey:{name: "personalDni", allowNull: false, field: "personal_dni"}})
usuario.belongsTo(personal, {foreignKey:{name: "personalDni", allowNull: false, field: "personal_dni"}})