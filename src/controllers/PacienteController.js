var mongoose = require('mongoose')
var PacienteSchema = require('../models/Schema')

var fs = require('fs')
var path = require('path')

// Crea registros de pacientes
function CreatePaciente(req, res) {
    try {
        var params = req.body

        var paciente = new PacienteSchema({
            rut: params.rut,
            nombre: params.nombre,
            edad: params.edad,
            sexo: params.sexo,
            enfermedad: params.enfermedad,
            fechaIngreso: params.fechaIngreso,
            revisado: params.revisado
        })

        paciente.save().then((data) =>{
            return res.json({
                status: 'success',
                message: 'Paciente agregado con éxito!',
                data
            })
        })
        .catch((e) =>{
            return res.json({
                status: 'error',
                message:'Ha ocurrido un error al agregar el paciente.',
                stacktrace: e
            })
        }) 

    } catch (e) {
        console.log('Error:', e); // Imprime error en consola para debugging
        return res.json({
            status: 'error',
            message:'Ha ocurrido un error.',
            stacktrace: e
        })
    }
}

// Obtiene pacientes por id
function GetPacienteById(req, res) {
    var id = req.params.id

    PacienteSchema.findById(id).then((data) =>{
        if(data === null){
            return res.json({
                status: 'error',
                message: 'Paciente no encontrado',
                idPaciente: id
            })
        }

        return res.json({
            status: 'success',
            message: 'Paciente encontrado',
            paciente: data
        })
    })
}

// Obtiene pacientes según fecha de ingreso
function SearchPacientesByFechaIngreso(req, res) {
    
    var filtro = req.params.filter

    var fechaFiltro = new Date(filtro)
    fechaFiltro.setUTCHours(0, 0, 0, 0)
        
    var fechaSiguiente = new Date(filtro)
    fechaSiguiente.setDate(fechaSiguiente.getDate() + 1)
    fechaSiguiente.setUTCHours(0, 0, 0, 0)

    PacienteSchema.find({ 
        fechaIngreso: {
            $gte: fechaFiltro,
            $lt: fechaSiguiente
        }
    })
    .then((data) => {
        if (data.length === 0) {
            return res.json({
                status: 'success',
                message: 'No existen registros con la fecha de ingreso requerida.',
            })
        }
        return res.json({
            status: 'success',
            message: 'Registros encontrados.',
            cantidad: data.length,
            pacientes: data
        })
    }).catch((error) => {
        return res.json({
            status: 'error',
            message: 'Error en la búsqueda.',
            error: error.message
        })
    })
}

// Obtiene pacientes por filtro (sexo o enfermedad)
function SearchPacientesByFilter(req, res) {
    var filtro = req.params.filter

    PacienteSchema.find({ 
        "$or":[
            {"sexo": {"$regex": filtro, "$options": "i"}},
            {"enfermedad": {"$regex": filtro, "$options": "i"}}
        ]
    })
    .sort([['fechaIngreso', 'descending']])
    .then((data) =>{
        if(data === null || data.length === 0){
            return res.json({
                status: 'error',
                message: 'No se encontraron valores con el filtro ' + filtro
            })
        }

        return res.json({
            status: 'success',
            message: 'Se encontraron registros',
            filtro: filtro,
            count: data.length,
            pacientes: data
        })
    })
    .catch((error) => {
        console.log('Error en la búsqueda:', error.message); // Imprime error para debugging
        return res.json({
            status: 'error',
            message: 'Error en la búsqueda',
            error: error.message
        });
    });
}

// Obtiene todos los registros
function GetPacientes(req, res) {
    
    PacienteSchema.find({ })
    .sort({ fechaIngreso: 'desc' })    
    .then((data) => {
        if (data === null || data.length === 0) {
            return res.json({
                status: 'error',
                message: 'No se encontraron registros.'
            });
        }

        return res.json({
            status: 'success',
            message: 'Registros encontrados.',
            total: data.length,
            productos: data
        })
    })
    .catch((e) => {
        return res.json({
            status: 'error',
            message: 'Error al buscar registros',
            error: e.message
        })
    })
}

// Actualiza registro por id
function UpdatePaciente(req, res) {
    var id = req.params.id
    var params = req.body

    PacienteSchema.findByIdAndUpdate({ _id:id }, params, { new: true })
    .then((data) =>{
        if(data === null){
            return res.json({
                status: 'error',
                message: 'No se pudo actualizar el registro'
            })
        }

        return res.json({
            status: 'success',
            message: 'Registro actualizado con éxito!',
            producto: data
        })
    })
    .catch((e) =>{
        return res.json({
            status: 'error',
            message: 'Ha ocurrido un error en el servidor',
            stacktrace: e
        })
    })
}

// Elimina registro po id
function DeletePaciente(req, res) {
    var id = req.params.id

    if(id === null){
        return res.json({
            status: 'error',
            message: 'El id debe ser proporcionado'
        })
    }

    PacienteSchema.findByIdAndDelete({ _id:id })
    .then((data) =>{
        if(data === null){
            return res.json({
                status: 'error',
                message: 'Registro no encontrado' 
            })
        }

        return res.json({
            status: 'success',
            message: 'Registro eliminado con éxito!',
            producto: data
        })
    })
    .catch((e) =>{
        return res.json({
            status: 'error',
            message: 'Ha ocurrido un error en el servidor',
            stacktrace: e
        })
    })
}

// Sube archivo indicando id del registro
function UploadFile(req, res) {
    const file = req.file
    var id = req.params.id

    if(!file){
        return res.status(404).send({
            status: 'error',
            message: 'File cannot be empty or file ext is not allowed'
        })
    }

    var tempFilename = file.filename

    if(id){
        PacienteSchema.findOneAndUpdate({ _id:id }, { fotoPersonal: tempFilename }, { new: true })
        .then((data) =>{
            if(data === null){
                return res.json({
                    status: 'error',
                    message: 'No se actualizó la imagen del paciente'
                })
            }

            return res.json({
                status: 'success',
                message: 'Imagen actualizada',
                producto: data
            })
        })
    }
}

// Obtiene archivo desde el registro
function GetFile(req, res) {
    var file = req.params.filename
    var pathFile = './uploads/' + file

    if(exists = fs.existsSync(pathFile)){
        return res.sendFile(path.resolve(pathFile))
    }else{
        return res.status(404).send({
            status: 'error',
            message: 'Image with image: '+ file + ' was not found'
        })
    }
}

module.exports = {
    CreatePaciente,
    GetPacientes,
    GetPacienteById,
    SearchPacientesByFechaIngreso,
    SearchPacientesByFilter,
    UpdatePaciente,
    DeletePaciente,
    UploadFile,
    GetFile,
}
