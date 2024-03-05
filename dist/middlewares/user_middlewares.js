"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMiddewaresPdf = exports.exportUsersMiddlewares = exports.alternateUserMiddlewares = exports.createUserMiddlewares = exports.updateUserMiddlewares = exports.getUserInfoMiddlewares = void 0;
const express_validator_1 = require("express-validator");
const validation_result_1 = require("../helpers/validation_result");
const validations_tokens_1 = require("../helpers/validations_tokens");
const validations_users_1 = require("../helpers/validations_users");
const validations_locations_1 = require("../helpers/validations_locations");
const validations_values_1 = require("../helpers/validations_values");
const validations_permissions_1 = require("../helpers/validations_permissions");
exports.getUserInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('usuario').custom(validations_permissions_1.permissionModuleUser).custom(validations_users_1.userIsActiveCustom),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)('userId').custom(validations_users_1.isValidUserId),
    validation_result_1.validationChecks,
];
exports.updateUserMiddlewares = [
    // VALIDACION DE CAMPOS NO NULOS
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('usuario').custom(validations_permissions_1.permissionModuleUser).custom(validations_users_1.userIsActiveCustom),
    (0, express_validator_1.check)('userId').custom(validations_users_1.isValidUserId),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)('userEmail', 'El userEmail es obligatorio').optional().isEmail().custom(validations_users_1.isUniqueEmail),
    (0, express_validator_1.check)('user_state', 'Solo se aceptan valores booleanos').optional().custom(validations_values_1.isBooleanValue),
    (0, express_validator_1.check)('addressBorough', 'El addressBorough es obligatorio').optional().isString().notEmpty(),
    (0, express_validator_1.check)("stateId").optional().custom(validations_locations_1.isValidLocationState),
    (0, express_validator_1.check)("cityId").optional().custom(validations_locations_1.isValidLocationcity),
    (0, express_validator_1.check)('userUsername', 'El user_username es obligatorio').optional().isString().notEmpty().custom(validations_users_1.isUniqueUsername),
    (0, express_validator_1.check)('userLastName', 'El user_last_name es obligatorio').optional().isString().notEmpty(),
    (0, express_validator_1.check)('userFirstName', 'El user_first_name es obligatorio').optional().isString().notEmpty(),
    (0, express_validator_1.check)('zipCode', 'Ingrese un zip code valido').optional().matches(/^\d{5}(-\d{4})?$/),
    (0, express_validator_1.check)('streetName', 'El adress_street_name es obligatorio').optional().isString().notEmpty(),
    (0, express_validator_1.check)('userPhoneNumber', 'Ingrese un numero de telefono valido').optional().matches(/^((\+1\s))(\(?\d{3}\)|(\d{3}))[-\s]?\d{3}[-\s]?\d{4}$/gm),
    // check('phone_number_number', 'Ingrese un numero de telefono valido').isMobilePhone(['es-CO']),
    (0, express_validator_1.check)('agentCofNumber', 'El user_agent_cof_number es requerido').optional().custom(validations_values_1.isStringOrNull),
    (0, express_validator_1.check)('accommodationType', 'El address_type_accommodation es obligatorio').optional().isString().notEmpty(),
    (0, express_validator_1.body)('profilePhoto').custom(validations_values_1.validateFile),
    validation_result_1.validationChecks,
];
exports.createUserMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('usuario').custom(validations_permissions_1.permissionModuleUser).custom(validations_users_1.userIsActiveCustom),
    (0, express_validator_1.check)('userState', 'Solo se aceptan valores booleanos').custom(validations_values_1.isBooleanValue),
    (0, express_validator_1.check)('userEmail', 'Ingrese un email valido').notEmpty().isEmail().custom(validations_users_1.isUniqueEmail),
    (0, express_validator_1.check)('userUsername', 'El nombre de usuario debe tener al menos 8 caracteres').notEmpty().isString().isLength({ min: 8 }).custom(validations_users_1.isUniqueUsername),
    (0, express_validator_1.check)('userPhoneNumber', 'Ingrese un numero de telefomo valido').notEmpty().matches(/^((\+1\s))?(\(?\d{3}\)|(\d{3}))[-\s]?\d{3}[-\s]?\d{4}$/gm),
    (0, express_validator_1.check)('userLastName', 'El apellido es obligatorio').notEmpty().isString(),
    (0, express_validator_1.check)('userFirstName', 'El nombre es obligatorio').notEmpty().isString(),
    (0, express_validator_1.check)('agentCofNumber', 'El es obligatorio').custom(validations_values_1.isStringOrNull),
    (0, express_validator_1.check)('zipCode', 'Ingrese un zip code valido').matches(/^\d{5}(-\d{4})?$/),
    (0, express_validator_1.check)('streetName', 'El nombre de la calle es obligatorio').notEmpty().isString(),
    (0, express_validator_1.check)('addressBorough', 'El addressBorough es obligatorio').notEmpty().isString(),
    (0, express_validator_1.check)('accommodationType', 'El tipo de edificio es obligatirio').notEmpty(),
    (0, express_validator_1.check)('auditLogPermission').custom(validations_values_1.isBooleanValue).withMessage('El auditLogPermission debe ser un valor booleano'),
    (0, express_validator_1.check)('reportTaskPermission').custom(validations_values_1.isBooleanValue).withMessage('El reportTaskPermission debe ser un valor booleano'),
    (0, express_validator_1.check)('organizationPermission').custom(validations_values_1.isBooleanValue).withMessage('El organizationPermission debe ser un valor booleano'),
    (0, express_validator_1.check)('userPermission').custom(validations_values_1.isBooleanValue).withMessage('El userPermission debe ser un valor booleano'),
    (0, express_validator_1.check)('taskPermission').custom(validations_values_1.isBooleanValue).withMessage('El taskPermission debe ser un valor booleano'),
    (0, express_validator_1.check)('clientPermission').custom(validations_values_1.isBooleanValue).withMessage('El clientPermission debe ser un valor booleano'),
    // check('isProfilPhoto').custom(validateFile),
    (0, express_validator_1.body)('profilePhoto').custom(validations_values_1.validateFile),
    (0, express_validator_1.check)("stateId").custom(validations_locations_1.isValidLocationState),
    (0, express_validator_1.check)("cityId").custom(validations_locations_1.isValidLocationcity),
    validation_result_1.validationChecks,
];
exports.alternateUserMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('usuario').custom(validations_permissions_1.permissionModuleUser).custom(validations_users_1.userIsActiveCustom),
    (0, express_validator_1.check)('userId').custom(validations_users_1.isValidUserId),
    validation_result_1.validationChecks
];
exports.exportUsersMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
exports.getUserMiddewaresPdf = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
//# sourceMappingURL=user_middlewares.js.map