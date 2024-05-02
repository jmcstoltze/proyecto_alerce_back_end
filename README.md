
# Sistema de Gestión de Pacientes - API Backend

Este proyecto es una API de backend para un sistema de gestión de visitas a pacientes de un asilo de ancianos por parte del Hospital'Los Alerces'.

Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos de los pacientes, gestionar el almacenamiento de imágenes de los mismos y validar los datos ingresados.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (con Mongoose)
- Multer
- Cors
- UUID
- Validator
- Nodemon

## Estructura del proyecto

```javascript
- /src
  - /config
    - Multer.js
  - /controllers
    - PacienteController.js
  - /models
    - Schema.js
  - /routes
    - Routes.js
- /uploads
- index.js
- package-lock.json
- package.json
- README.md
```

## Configuración

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando el comando `npm install`.
3. Asegúrate de tener acceso a tu base de datos MongoDB Atlas y obtén la URI de conexión provista por MongoDB Atlas.
4. En el archivo `index.js`, ajusta la conexión a MongoDB utilizando la URI proporcionada por MongoDB Atlas.
5. Ajusta cualquier otra configuración necesaria en los archivos de la carpeta `config`.

## Ejecución

Una vez que hayas configurado el proyecto, puedes ejecutarlo utilizando el comando:

```bash
npm start
```

Esto iniciará el servidor y lo hará accesible en `http://localhost:3000/`.

## Uso

- Utiliza Postman u otro cliente REST para realizar llamadas a las rutas de la API.
- Puedes encontrar la documentación de las rutas en el archivo `Routes.js`.
- Las imágenes subidas se guardarán en la carpeta `/uploads`.

## Autor

Jose Contreras Stoltze
