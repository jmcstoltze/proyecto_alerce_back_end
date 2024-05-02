
// Importación de módulos necesarios
var express = require('express')
var mongoose = require('mongoose')
var cors = require('cors')
var pacienteRoutes = require('./src/routes/Routes')

// Inicializa la aplicación de Express
var app = express()

// Middleware para el manejo de datos JSON y formularios
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Middleware para permitir solicitudes desde diferentes dominios
app.use(cors())

// Ruta de bienvenida
app.get('/', (req, res) =>{
    return res.json({
        message: 'Servidor activo!'
    })
})

// Usa las rutas definidas para los pacientes
app.use('/alerce', pacienteRoutes)

// Puerto de escucha del servidor
const port = 3001

// URI de conexión a la base de datos MongoDB Atlas
const uri = 'mongodb+srv://jmcontrerasstoltze:p0JyyARXYZhi6h78@cluster0.lyb8cgk.mongodb.net/paciente?retryWrites=true&w=majority&appName=Cluster0'

// Conexión a la base de datos y arranque del servidor
mongoose.connect(uri)
.then(() =>{
    console.log('Base de datos conectada!')

    app.listen(port, () =>{
        console.log('Servidor de express corriendo con éxito!')
        console.log('http://localhost:3001')
    })
})
// Manejo de excepción
.catch((e) =>{
    console.log(e.message)
})
