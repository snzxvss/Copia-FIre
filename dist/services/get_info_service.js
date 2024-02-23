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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInfoService = void 0;
const client_procedures_1 = require("../db/procedures/client_procedures");
const building_procedures_1 = require("../db/procedures/building_procedures");
const location_procedures_1 = require("../db/procedures/location_procedures");
const organization_procedures_1 = require("../db/procedures/organization_procedures");
const user_procedures_1 = require("../db/procedures/user_procedures");
const task_procedures_1 = require("../db/procedures/task_procedures");
const organizationDbProcedures = new organization_procedures_1.OrganizationDbProcedures;
const locationDbProcedures = new location_procedures_1.LocationDbProcedures;
const clientDbProcedures = new client_procedures_1.ClientDbProcedures;
const buildingDbProcedures = new building_procedures_1.BuildingDbProcedures;
const userDbProcedures = new user_procedures_1.UserDbProcedures;
const taskDbProcedures = new task_procedures_1.TaskDbProcedures;
class GetInfoService {
    getOrganizationInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const states = yield organizationDbProcedures.getOrganizationInfo();
                return { status: 200, success: true, msg: 'Organización obtenida correctamente', data: states };
            }
            catch (error) {
                console.log({ error });
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getLocationStates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const states = yield locationDbProcedures.getLocationStates();
                return { status: 200, success: true, msg: 'Estados obtenidos correctamente', data: states };
            }
            catch (error) {
                console.log({ error });
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getLocationBorough(stateId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const citys = yield locationDbProcedures.getLocationCitys(stateId);
                if (citys) {
                    return { status: 200, success: true, msg: 'Ciudades obtenidas correctamente', data: citys };
                }
                else {
                    return { status: 400, success: false, msg: 'El stateID no corresponde a ningún estado', data: citys };
                }
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    msg: `Error al obtener la informacion`
                };
            }
        });
    }
    getClientsData(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield clientDbProcedures.getClientsDataProcedure(filters);
                return { status: 200, success: true, msg: `Clientes obtenidos correctamente`, data: clients };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getUsersData(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield userDbProcedures.getUsersDataProcedure(filters);
                if (!users)
                    users = [];
                users.forEach((user) => {
                    user.userPermissions.auditLogPermission == true ? user.userPermissions.auditLogPermission = true : user.userPermissions.auditLogPermission = false;
                    user.userPermissions.clientPermission == true ? user.userPermissions.clientPermission = true : user.userPermissions.clientPermission = false;
                    user.userPermissions.organizationPermission == true ? user.userPermissions.organizationPermission = true : user.userPermissions.organizationPermission = false;
                    user.userPermissions.reportTaskPermission == true ? user.userPermissions.reportTaskPermission = true : user.userPermissions.reportTaskPermission = false;
                    user.userPermissions.taskPermission == true ? user.userPermissions.taskPermission = true : user.userPermissions.taskPermission = false;
                    user.userPermissions.userPermission == true ? user.userPermissions.userPermission = true : user.userPermissions.userPermission = false;
                    user.userRequirePasswordChange == true ? user.userRequirePasswordChange = true : user.userRequirePasswordChange = false;
                    user.userState == true ? user.userState = true : user.userState = false;
                    delete user.userPassword;
                });
                return { status: 200, success: true, msg: `Usuarios obtenidos correctamente`, data: users };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getBuildingType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield buildingDbProcedures.getBuildingTypeProcedure();
                return { status: 200, success: true, msg: `Building Types obtenidos correctamente`, data };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getClientsBuilding(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buildings = yield clientDbProcedures.getClientBuildingsProcedure({ clientId });
                return { status: 200, success: true, msg: `Buildings obtenidos correctamente`, data: buildings };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getTaskStates() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const buildings = yield taskDbProcedures.getTaskStatesProcedure();
                return { status: 200, success: true, msg: `Task States obtenidos correctamente`, data: buildings };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getTasks(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield taskDbProcedures.getTasksProcedure(filters);
                return { status: 200, success: true, msg: `Tasks obtenidos correctamente`, data: tasks };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
    getTasksByAgentId(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield taskDbProcedures.getTasksByAgnetIdsProcedure(ids);
                return { status: 200, success: true, msg: `Tasks obtenidos correctamente`, data: tasks };
            }
            catch (error) {
                console.log(error);
                return { status: 500, success: false, msg: `Error al obtener la informacion` };
            }
        });
    }
}
exports.GetInfoService = GetInfoService;
//# sourceMappingURL=get_info_service.js.map