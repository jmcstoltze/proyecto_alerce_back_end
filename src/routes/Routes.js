var express = require('express')
var router = express.Router()
var controller = require('../controllers/PacienteController')
var upload = require('../config/Multer')

// Ruta para crear registro de paciente
router.post('/paciente', controller.CreatePaciente)

// Ruta para obtener paciente por Id
router.get('/paciente/:id', controller.GetPacienteById)
// Ruta para obtener todos los pacientes
router.get('/pacientes', controller.GetPacientes)

// Ruta para búsqueda personalizada (sexo, enfermedad)
router.get('/pacientes/search/:filter', controller.SearchPacientesByFilter)
// Ruta para búsqueda por fecha de ingreso del registro
router.get('/pacientes/search-date/:filter', controller.SearchPacientesByFechaIngreso)

// Ruta para actualizar información de un registro
router.put('/paciente/:id', controller.UpdatePaciente)
// Ruta para borrar registro
router.delete('/paciente/:id', controller.DeletePaciente)

// Ruta para subir imagen de un registro
router.post('/imagen/upload/:id', upload, controller.UploadFile)
// Ruta para leer archivo de un registro
router.get('/imagen/:filename', controller.GetFile)

module.exports = router
