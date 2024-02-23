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
exports.permissionModuleOrganization = exports.permissionModuleAuditLog = exports.permissionModuleReportTask = exports.permissionModuleTask = exports.permissionModuleUser = exports.permissionModuleClient = void 0;
const permissionModuleClient = (usuario, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!usuario.userPermissions.clientPermission)
        throw new Error('No tiene permisos para modificar los clientes');
});
exports.permissionModuleClient = permissionModuleClient;
const permissionModuleUser = (usuario, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!usuario.userPermissions.userPermission)
        throw new Error('No tiene permisos para modificar los usuarios');
});
exports.permissionModuleUser = permissionModuleUser;
const permissionModuleTask = (usuario, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!usuario.userPermissions.taskPermission)
        throw new Error('No tiene permisos para modificar las tareas');
});
exports.permissionModuleTask = permissionModuleTask;
const permissionModuleReportTask = (usuario, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!usuario.userPermissions.reportTaskPermission)
        throw new Error('No tiene permisos para modificar los reportes de las tareas');
});
exports.permissionModuleReportTask = permissionModuleReportTask;
const permissionModuleAuditLog = (usuario, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!usuario.userPermissions.auditLogPermission)
        throw new Error('No tiene permisos para modificar los logs de auditoria');
});
exports.permissionModuleAuditLog = permissionModuleAuditLog;
const permissionModuleOrganization = (usuario, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!usuario.userPermissions.organizationPermission)
        throw new Error('No tiene permisos para modificar la organización');
});
exports.permissionModuleOrganization = permissionModuleOrganization;
//# sourceMappingURL=validations_permissions.js.map