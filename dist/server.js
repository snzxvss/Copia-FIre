"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const info_routes_1 = __importDefault(require("./routes/info.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const building_routes_1 = __importDefault(require("./routes/building.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
// ?---------------------------?//
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            user: '/api/user',
            info: '/api/info',
            task: '/api/task',
            client: '/api/client',
            report: '/api/report',
            building: '/api/building',
            documentation: '/api-docs'
        };
        this.connectionDB = () => __awaiter(this, void 0, void 0, function* () {
            //connection a la base de datos en mongodb
            try {
                yield connection_1.default.authenticate();
                console.log('OK Database');
            }
            catch (error) {
                console.error(error);
            }
        });
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '9000';
        this.middlewares();
        // Rutas
        this.routes();
        this.connectionDB();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // LECTURA DEL BODY
        this.app.use(express_1.default.json());
        // PUBLIC
        this.app.use(express_1.default.static('src/public'));
        // RECEPCION DE ARCHIVOS
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            // safeFileNames: true,
            // createParentPath: true 
        }));
    }
    routes() {
        this.app.use(this.apiPaths.auth, auth_routes_1.default);
        this.app.use(this.apiPaths.user, user_routes_1.default);
        this.app.use(this.apiPaths.info, info_routes_1.default);
        this.app.use(this.apiPaths.client, client_routes_1.default);
        this.app.use(this.apiPaths.building, building_routes_1.default);
        this.app.use(this.apiPaths.task, task_routes_1.default);
        this.app.use(this.apiPaths.report, report_routes_1.default);
        this.app.use(this.apiPaths.documentation, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('API in port: ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map