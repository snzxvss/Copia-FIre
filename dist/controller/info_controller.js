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
exports.getTasksByAgentIdInfo = exports.getTasksInfo = exports.getClientBuildingsInfo = exports.getTaskStatesInfo = exports.getBuildingTypeInfo = exports.getUsersInfo = exports.getClientsInfo = exports.getOrganizationInfo = exports.getLocationInfo = void 0;
const get_info_service_1 = require("../services/get_info_service");
const moment_1 = __importDefault(require("moment"));
const getInfo = new get_info_service_1.GetInfoService;
const getLocationInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stateId } = req.body;
        const { usuario } = req.body;
        if (stateId) {
            const { status, success, msg, data } = yield getInfo.getLocationBorough(stateId);
            const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
            console.log(`${fechaFormateada} - Informacion obtenida de la ubicación - Username: ${usuario.userUsername}`);
            return res.status(status).json({
                success,
                msg,
                data
            });
        }
        const { status, success, msg, data } = yield getInfo.getLocationStates();
        return res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getLocationInfo = getLocationInfo;
const getOrganizationInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario } = req.body;
        const { status, success, msg, data } = yield getInfo.getOrganizationInfo();
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de la organización - Username: ${usuario.userUsername}`);
        return res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getOrganizationInfo = getOrganizationInfo;
const getClientsInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchKey, finalDate, startDate } = req.body;
        const filters = { searchKey, finalDate, startDate };
        const { usuario } = req.body;
        const { status, success, msg, data } = yield getInfo.getClientsData(filters);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de clientes - Username: ${usuario.userUsername}`);
        return res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getClientsInfo = getClientsInfo;
const getUsersInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchKey, finalDate, startDate } = req.body;
        const filters = { searchKey, finalDate, startDate };
        const { usuario } = req.body;
        const { status, success, msg, data } = yield getInfo.getUsersData(filters);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de usuarios - Username: ${usuario.userUsername}`);
        return res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getUsersInfo = getUsersInfo;
const getBuildingTypeInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, msg, data } = yield getInfo.getBuildingType();
        const { usuario } = req.body;
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de los tipos de edificacion - Username: ${usuario.userUsername}`);
        res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getBuildingTypeInfo = getBuildingTypeInfo;
const getTaskStatesInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, success, msg, data } = yield getInfo.getTaskStates();
        const { usuario } = req.body;
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de los estados de tareas - Username: ${usuario.userUsername}`);
        res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getTaskStatesInfo = getTaskStatesInfo;
const getClientBuildingsInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.body;
        const { usuario } = req.body;
        const { status, success, msg, data } = yield getInfo.getClientsBuilding(clientId);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de las edificaciones de un cliente - Username: ${usuario.userUsername}`);
        return res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getClientBuildingsInfo = getClientBuildingsInfo;
const getTasksInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchKey, finalDate, startDate } = req.body;
        const filters = { searchKey, finalDate, startDate };
        const { usuario } = req.body;
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de las tareas - Username: ${usuario.userUsername}`);
        const { status, success, msg, data } = yield getInfo.getTasks(filters);
        console.log("Data enviada: ", data);
        res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getTasksInfo = getTasksInfo;
const getTasksByAgentIdInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assignedUser } = req.body;
        const { usuario } = req.body;
        const { status, success, msg, data } = yield getInfo.getTasksByAgentId(assignedUser);
        console.log(data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de las tareas - Username: ${usuario.userUsername}`);
        res.status(status).json({
            success,
            msg,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.getTasksByAgentIdInfo = getTasksByAgentIdInfo;
//# sourceMappingURL=info_controller.js.map