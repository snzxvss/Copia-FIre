"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportClientDetailMiddlewares = exports.getClientMiddewaresPdf = exports.exportClientsMiddlewares = exports.updateClientBuildingMiddlewares = exports.createClientBuildingMiddlewares = exports.deleteClientcontactMiddlewares = exports.updateClientMiddlewares = exports.updateClientContactMiddlewares = exports.createClientContactMiddlewares = exports.createClientMiddlewares = exports.getClientInfoMiddewares = void 0;
const express_validator_1 = require("express-validator");
const validation_result_1 = require("../helpers/validation_result");
const validations_locations_1 = require("../helpers/validations_locations");
const validations_tokens_1 = require("../helpers/validations_tokens");
const validations_clients_1 = require("../helpers/validations_clients");
const validations_values_1 = require("../helpers/validations_values");
const validations_permissions_1 = require("../helpers/validations_permissions");
const validations_buildings_1 = require("../helpers/validations_buildings");
exports.getClientInfoMiddewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleClient),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("clientId").custom(validations_clients_1.isValidClientId),
    validation_result_1.validationChecks,
];
exports.createClientMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('clientTagId', 'El clientTagId no puede estar vacío').optional().notEmpty(),
    (0, express_validator_1.check)('streetName', 'El streetName es obligatorio').notEmpty(),
    (0, express_validator_1.check)('accommodationType', 'El accommodationType es obligatorio').notEmpty(),
    (0, express_validator_1.check)('addressBorough', 'El addressBorough es obligatorio').notEmpty(),
    (0, express_validator_1.check)('zipCode', 'Ingrese un zip code valido').matches(/^\d{5}(-\d{4})?$/),
    (0, express_validator_1.check)('clientName', 'El clientName es obligatorio').notEmpty(),
    (0, express_validator_1.check)("stateId").custom(validations_locations_1.isValidLocationState),
    (0, express_validator_1.check)("cityId").custom(validations_locations_1.isValidLocationcity),
    validation_result_1.validationChecks
];
exports.createClientContactMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('clientId').custom(validations_clients_1.isValidClientId),
    (0, express_validator_1.check)('contactFirstName', 'El contactFirstName es obligatorio').notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    (0, express_validator_1.check)('contactLastName', 'El contactLastName es obligatorio').notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    validation_result_1.validationChecks
];
exports.updateClientContactMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('clientId', "El clientId es obligatorio").notEmpty().custom(validations_clients_1.isValidClientId).not().isArray().withMessage('Solo se permite una id a la vez'),
    (0, express_validator_1.check)('contactId', "El contactId es obligatorio").notEmpty().custom(validations_clients_1.isValidClientContactId).not().isArray().withMessage('Solo se permite una id a la vez'),
    (0, express_validator_1.check)('contactFirstName', 'El contactFirstName es obligatorio').optional().notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    (0, express_validator_1.check)('contactLastName', 'El contactLastName es obligatorio').optional().notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    (0, express_validator_1.check)('addEmails').optional().isArray().withMessage("solo se aceptan arrays").custom(validations_values_1.isArrayOfEmails).not().custom(validations_clients_1.emailsClientContactExists).withMessage("El array contiene correos ya existentes"),
    (0, express_validator_1.check)('addNumbers').optional().isArray().withMessage("solo se aceptan arrays").custom(validations_values_1.isArrayOfPhoneNumbers).not().custom(validations_clients_1.phoneNumbersClientContactExits).withMessage("El array numeros ya existentes"),
    (0, express_validator_1.check)('deleteEmails').optional().isArray().withMessage("solo se aceptan arrays").custom(validations_values_1.isArrayOfEmails).custom(validations_clients_1.emailsClientContactExists),
    (0, express_validator_1.check)('deleteNumbers').optional().isArray().withMessage("solo se aceptan arrays").custom(validations_values_1.isArrayOfPhoneNumbers).custom(validations_clients_1.phoneNumbersClientContactExits),
    (0, express_validator_1.check)('updateEmails').optional().isArray().withMessage("solo se aceptan arrays").custom(validations_clients_1.emailsClientContactToUpdate),
    (0, express_validator_1.check)('updateNumbers').optional().isArray().withMessage("solo se aceptan arrays").custom(validations_clients_1.phoneNumbersClientContactToUpdate),
    validation_result_1.validationChecks
];
exports.updateClientMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('clientId').custom(validations_clients_1.isValidClientId).not().isArray().withMessage('Solo se permite una id a la vez'),
    (0, express_validator_1.check)('clientTagId', 'El clientTagId debe ser nulo o string').optional().custom(validations_values_1.isStringOrNull),
    (0, express_validator_1.check)('streetName', 'El streetName es obligatorio').optional().notEmpty(),
    (0, express_validator_1.check)('accommodationType', 'El accommodationType es obligatorio').optional().notEmpty(),
    (0, express_validator_1.check)('addressBorough', 'El addressBorough es obligatorio').optional().notEmpty(),
    (0, express_validator_1.check)('zipCode', 'Ingrese un zip code valido').optional().matches(/^\d{5}(-\d{4})?$/),
    (0, express_validator_1.check)('clientName').optional().isString().withMessage("El clientName debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El clientName debe tener al menos 8 caracteres"),
    (0, express_validator_1.check)("stateId").optional().custom(validations_locations_1.isValidLocationState),
    (0, express_validator_1.check)("cityId").optional().custom(validations_locations_1.isValidLocationcity),
    validation_result_1.validationChecks
];
exports.deleteClientcontactMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleClient),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)('clientId').custom(validations_clients_1.isValidClientId),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)('contactId').custom(validations_clients_1.isValidClientContactId),
    validation_result_1.validationChecks,
];
exports.createClientBuildingMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleClient),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("clientId").custom(validations_clients_1.isValidClientId),
    (0, express_validator_1.check)("buildingName").isString().withMessage("El building_name debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El building_name debe tener al menos 8 caracteres"),
    (0, express_validator_1.check)("buildingFloors").isInt({ min: 1, max: 167 }).withMessage("El buildingFloors debe ser un numero (1-167)"),
    (0, express_validator_1.check)("buildingSurfaceSquareMeters").isNumeric().withMessage("El buildingSurfaceSquareMeters debe ser un valor numerico").notEmpty().withMessage("El buildingSurfaceSquareMeters es obligatorio"),
    (0, express_validator_1.check)("buildingTypeId").isInt().withMessage("Solo se permiten valores numericos").custom(validations_buildings_1.isValidBuildingTypeId),
    (0, express_validator_1.check)("streetName").isString().withMessage("El streetName debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El streetName debe tener al menos 8 caracteres"),
    (0, express_validator_1.check)("accommodationType").isString().withMessage("El accommodationType debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El accommodationType debe tener al menos 8 caracteres"),
    (0, express_validator_1.check)("addressBorough").isString().withMessage("El addressBorough debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El addressBorough debe tener al menos 8 caracteres"),
    (0, express_validator_1.check)("zipCode").matches(/^\d{5}(-\d{4})?$/).withMessage("El zipCode no es valido"),
    (0, express_validator_1.check)("stateId").custom(validations_locations_1.isValidLocationState),
    (0, express_validator_1.check)("cityId").custom(validations_locations_1.isValidLocationcity),
    validation_result_1.validationChecks,
];
exports.updateClientBuildingMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("clientId").custom(validations_clients_1.isValidClientId),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)("buildingId").isInt().withMessage("Solo se permiten valores numericos").custom(validations_buildings_1.isValidBuildingId),
    (0, express_validator_1.check)("buildingName").optional().isString().withMessage("El building_name debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El building_name debe tener al menos 8 caracteres"),
    (0, express_validator_1.check)("buildingFloors").isInt({ min: 1, max: 167 }).withMessage("El buildingFloors debe ser un numero (1-167)"),
    (0, express_validator_1.check)("buildingTypeId").optional().custom(validations_buildings_1.isValidBuildingTypeId),
    (0, express_validator_1.check)("buildingSurfaceSquareMeters").optional().isNumeric().withMessage("El buildingSurfaceSquareMeters debe ser un valor numerico").notEmpty().withMessage("El buildingSurfaceSquareMeters es obligatorio"),
    validation_result_1.validationChecks
];
exports.exportClientsMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
exports.getClientMiddewaresPdf = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
exports.exportClientDetailMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('clientId').custom(validations_clients_1.isValidClientId),
    validation_result_1.validationChecks,
];
//# sourceMappingURL=client_middlewares.js.map