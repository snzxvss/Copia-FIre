"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportTasksMiddlewares = exports.completeTaskIMiddlewares = exports.cancelTaskIMiddlewares = exports.assignTaskMiddlewares = exports.manageTaskMiddlewares = exports.updateTaskMiddlewares = exports.createTaskMiddlewares = exports.getTaskInfoMiddlewares = void 0;
const express_validator_1 = require("express-validator");
const validation_result_1 = require("../helpers/validation_result");
const validations_tokens_1 = require("../helpers/validations_tokens");
const validations_buildings_1 = require("../helpers/validations_buildings");
const validations_clients_1 = require("../helpers/validations_clients");
const validations_tasks_1 = require("../helpers/validations_tasks");
const validations_users_1 = require("../helpers/validations_users");
const validations_permissions_1 = require("../helpers/validations_permissions");
const task_procedures_1 = require("../db/procedures/task_procedures");
const taskDbProcedures = new task_procedures_1.TaskDbProcedures;
exports.getTaskInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("taskId").isNumeric().withMessage('El taskId debe ser un valor numerico').custom(validations_tasks_1.isValidTaskId),
    validation_result_1.validationChecks
];
exports.createTaskMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("taskDescription") /*task_description*/.isString().withMessage("El building_name debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El building_name debe tener al menos 25 caracteres"),
    (0, express_validator_1.check)("taskStartNewExtinguisherCount").isInt().withMessage("El task_start_number_new_extinguisher debe ser un valor entero"),
    (0, express_validator_1.check)("taskStartRechargedExtinguisherCount").isInt().withMessage("El task_start_number_recharged_extinguisher debe ser un valor entero"),
    (0, express_validator_1.check)("taskExpectedEndDate").matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/),
    (0, express_validator_1.check)("clientId").custom(validations_clients_1.isValidClientId),
    (0, express_validator_1.check)("buildingId").custom(validations_buildings_1.isValidBuildingId),
    (0, express_validator_1.check)("assignedUser").optional().custom(validations_users_1.isValidUserId),
    (0, express_validator_1.check)('taskExtinguishers').custom(validations_tasks_1.isValidTaskExtinguishers).isArray().withMessage(`La taskExtinguishers debe ser una lista`),
    validation_result_1.validationChecks
];
exports.updateTaskMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(validations_tasks_1.isValidTaskId),
    (0, express_validator_1.check)('isValidToEditTask').custom(validations_tasks_1.isValidToEditTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("clientId").optional().custom(validations_clients_1.isValidClientId),
    (0, express_validator_1.check)("taskDescription").optional().isString().withMessage("La taskDescription debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El building_name debe tener al menos 25 caracteres"),
    (0, express_validator_1.check)("taskStartNewExtinguisherCount").optional().isInt({ min: 1 }).withMessage("El taskStartNewExtinguisherCount debe ser un valor entero"),
    (0, express_validator_1.check)("taskStartRechargedExtinguisherCount").optional().isInt({ min: 1 }).withMessage("El taskStartRechargedExtinguisherCount debe ser un valor entero"),
    (0, express_validator_1.check)("taskExpectedEndDate").optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/),
    (0, express_validator_1.check)("buildingId").optional().custom(validations_buildings_1.isValidBuildingId),
    (0, express_validator_1.check)("assignedUser").optional().custom(validations_users_1.isValidUserId),
    validation_result_1.validationChecks
];
exports.manageTaskMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('usuario').custom(validations_permissions_1.permissionModuleTask).custom(validations_users_1.userIsActiveCustom),
    (0, express_validator_1.check)('taskId').custom(validations_tasks_1.isValidTaskId),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)('taskExtinguisher').custom(validations_tasks_1.isValidArrayOfTaskExtinguisher),
    validation_result_1.validationChecks,
];
exports.assignTaskMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(validations_tasks_1.isValidTaskId),
    (0, express_validator_1.check)('isValidToEditTask').custom(validations_tasks_1.isValidToAssign),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("assignedUser").custom(validations_users_1.isValidUserId),
    validation_result_1.validationChecks
];
exports.cancelTaskIMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(validations_tasks_1.isValidTaskId),
    (0, express_validator_1.check)('isValidToEditTask').custom(validations_tasks_1.isValidToCancel),
    validation_result_1.validationChecks
];
exports.completeTaskIMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleTask),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(validations_tasks_1.isValidTaskId),
    (0, express_validator_1.check)('isValidToEditTask').custom(validations_tasks_1.isValidToComplete),
    (0, express_validator_1.check)('taskEndLatitude').custom(express_validator_1.body),
    (0, express_validator_1.check)('taskEndLongitude').custom(express_validator_1.body),
    validation_result_1.validationChecks
];
exports.exportTasksMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
//# sourceMappingURL=task_middlewares.js.map