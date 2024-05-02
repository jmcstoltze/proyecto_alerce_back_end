var mongoose = require('mongoose')
var Schema = mongoose.Schema

// Definición del esquema del paciente
var pacienteSchema = Schema({
    rut: { type: String, required: true },
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    sexo: { type: String, required: true },
    fotoPersonal: { type: String },
    fechaIngreso: { type: Date, default: Date.now },
    enfermedad: { type: String, required: true},
    revisado: { type: Boolean, default: false}
})

// Exporta el modelo del esquema paciente
module.exports = mongoose.model('PacienteSchema', pacienteSchema)
