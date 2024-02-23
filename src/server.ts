import express from "express";
import fileUpload from 'express-fileupload'
import { Application } from 'express';
import authRoutes from "./routes/auth.routes";
import userRoutes from './routes/user.routes'
import infoRoutes from './routes/info.routes'
import clientRoutes from './routes/client.routes'
import buildingRoutes from './routes/building.routes'
import taskRoutes from './routes/task.routes'
import reportRoutes from './routes/report.routes'
//* ---------- SWAGGER IMPORTS ---------- *//
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from './swagger/swagger';
// ?---------------------------?//
import cors from "cors";
import env from "dotenv";
import db from "./db/connection";

env.config();

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/user',
        info: '/api/info',
        task: '/api/task',
        client: '/api/client',
        report: '/api/report',
        building: '/api/building',

        documentation:'/api-docs'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '9000';

        this.middlewares();

        // Rutas
        this.routes();
        this.connectionDB();


    }

    private connectionDB = async () => {
        //connection a la base de datos en mongodb
        try {
            await db.authenticate();
            console.log('OK Database');
        } catch (error) {
            console.error(error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // LECTURA DEL BODY
        this.app.use(express.json())

        // PUBLIC
        this.app.use(express.static('src/public'))

        // RECEPCION DE ARCHIVOS
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            // safeFileNames: true,
            // createParentPath: true 
        }));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.user, userRoutes)
        this.app.use(this.apiPaths.info, infoRoutes)
        this.app.use(this.apiPaths.client, clientRoutes)
        this.app.use(this.apiPaths.building, buildingRoutes)
        this.app.use(this.apiPaths.task, taskRoutes)
        this.app.use(this.apiPaths.report, reportRoutes)
        this.app.use(this.apiPaths.documentation, swaggerUi.serve, swaggerUi.setup(swaggerSetup))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('API in port: ' + this.port);
        })
    }

}

export default Server;
