const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()//creo en mi servidor la plicacion de express como una propiedad en el servidor
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';


        //Conectar a base de datos
        this.conectarDB();

        //Middlewares son funciones que siempre se van a ejecutar cuabdo se levante el servidor
        this.middlewares();
        
        //rutas de mi aplicaion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        //CORS protege nuestro servidor de una manera superficial
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));

    }

    routes() {
        //Endpoint
        this.app.use(this.usuariosPath, require('../routes/usuarios'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        })
    }
}






module.exports = Server;