"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByAgentIdInfoMiddlewares = exports.getTasksInfoMiddlewares = exports.getTaskStatesInfoMiddlewares = exports.testMiddlewares = exports.getUsersInfoMiddlewares = exports.getClientsInfoMiddlewares = exports.getClientBuildingsInfoMiddlewares = exports.getBuildingTypeInfoMiddlewares = exports.getLocationInfoMiddlewares = exports.getOrganizationInfoMiddlewares = void 0;
const express_validator_1 = require("express-validator");
const validation_result_1 = require("../helpers/validation_result");
const validations_tokens_1 = require("../helpers/validations_tokens");
const validations_clients_1 = require("../helpers/validations_clients");
const validations_users_1 = require("../helpers/validations_users");
exports.getOrganizationInfoMiddlewares = [
    // VALIDACION DE CAMPOS NO NULOS
    validations_tokens_1.validateAccessToken,
    validation_result_1.validationChecks,
];
exports.getLocationInfoMiddlewares = [
    // VALIDACION DE CAMPOS NO NULOS
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('stateId', 'El state id debe ser un numero').optional().isNumeric(),
    validation_result_1.validationChecks,
];
exports.getBuildingTypeInfoMiddlewares = [
    validations_tokens_1.validateAccessToken
];
exports.getClientBuildingsInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("clientId").optional().custom(validations_clients_1.isValidClientId),
    validation_result_1.validationChecks,
];
exports.getClientsInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('searchKey').optional().isString(),
    (0, express_validator_1.check)('startDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
exports.getUsersInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('search_key').optional().isString(),
    (0, express_validator_1.check)('startDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
const fileTest = (value, { req }) => {
    console.log(value);
    const files = req.files;
    req.body.files = files;
    console.log({ files });
};
exports.testMiddlewares = [
    (0, express_validator_1.check)('nombre').custom(fileTest)
];
exports.getTaskStatesInfoMiddlewares = [
    validations_tokens_1.validateAccessToken
];
exports.getTasksInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('search_key').optional().isString(),
    (0, express_validator_1.check)('startDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
exports.getTasksByAgentIdInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('assignedUser').custom(validations_users_1.isValidUserId),
    validation_result_1.validationChecks
];
//# sourceMappingURL=info_middlewares.js.map