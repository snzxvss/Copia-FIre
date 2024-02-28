"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganizationMiddlewares = exports.deleteUserImageMiddlewares = exports.userInfoMiddlewares = exports.updateDataMiddlewares = exports.updatePasswordMiddlewares = exports.forgotPasswordMiddlewares = exports.authUserMiddlewares = void 0;
const validation_result_1 = require("../helpers/validation_result");
const express_validator_1 = require("express-validator");
const validations_values_1 = require("../helpers/validations_values");
const validations_locations_1 = require("../helpers/validations_locations");
const validations_tokens_1 = require("../helpers/validations_tokens");
const validations_users_1 = require("../helpers/validations_users");
const validations_permissions_1 = require("../helpers/validations_permissions");
exports.authUserMiddlewares = [
    // VALIDACION DE CAMPOS NO NULOS
    (0, express_validator_1.check)('username', 'El nombre de usuario es obligatorio').notEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es obligatoria').notEmpty(),
    validation_result_1.validationChecks,
    // VALIDACIOIN DE USUARIO EN LA BASE DE DATOS
    validations_users_1.userExistByUsername,
    validations_users_1.userIsAgent,
    validations_users_1.userIsActive
];
exports.forgotPasswordMiddlewares = [
    // VAliDACION DE CAMPO EMAIL
    (0, express_validator_1.check)('email').notEmpty().withMessage('El email es obligatorio'),
    validation_result_1.validationChecks,
    (0, express_validator_1.check)('email').isEmail().withMessage('El email no tiene un formato correcto'),
    validation_result_1.validationChecks,
    // VALIDACION DE USUARIO EN LA BASE DE DATOS
    validations_users_1.userExistByEmail,
    (0, express_validator_1.check)('usuario').custom(validations_users_1.userIsActiveCustom),
    validation_result_1.validationChecks,
];
exports.updatePasswordMiddlewares = [
    validations_tokens_1.XORTokenType,
    validations_tokens_1.validateAccessToken,
    validations_tokens_1.validateRecoveryToken,
    validations_users_1.userExistByEmail,
    validations_users_1.userIsActive,
    (0, express_validator_1.check)('oldPassword', 'La vieja contraseña es obligatoria').if((0, express_validator_1.check)('tokenType').matches(/accessToken/)).notEmpty(),
    (0, express_validator_1.check)('newPassword').notEmpty().withMessage('La nueva contraseña es obligatoria').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[=;:+.\-_\/%*#@!])[A-Za-z\d=;:+.\-_\/%*#@!]{8,}$/gm).withMessage('No cumple con los requisitos de seguridad'),
    (0, express_validator_1.query)('recoveryToken', 'Token de recuperacion obligatorio').optional().notEmpty(),
    validation_result_1.validationChecks,
];
exports.updateDataMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('usuario').custom(validations_permissions_1.permissionModuleClient),
    validations_users_1.userIsActive,
    // check('userEmail', 'Ingrese un email valido').optional().notEmpty().isEmail(),
    // check('userUsername', 'El nombre de usuario debe tener al menos 8 caracteres').optional().notEmpty().isString().isLength({ min: 8 }),
    // check('user_image_url','').optional().notEmpty().isURL({require_tld: true, host_whitelist:['dominioespecifico.com']}),
    (0, express_validator_1.check)('userPhoneNumber', 'Ingrese un numero de telefomo valido').optional().notEmpty().matches(/^((\+1\s))?(\(?\d{3}\)|(\d{3}))[-\s]?\d{3}[-\s]?\d{4}$/),
    (0, express_validator_1.check)('userLastName', 'El apellido es obligatorio').optional().notEmpty().isString(),
    (0, express_validator_1.check)('userFirstName', 'El nombre es obligatorio').optional().notEmpty().isString(),
    // check('agentCofNumber', 'El es obligatorio').optional().custom(isStringOrNull),
    (0, express_validator_1.check)('zipCode', 'Ingrese un zip code valido').optional().matches(/^\d{5}(-\d{4})?$/),
    (0, express_validator_1.check)('streetName', 'El nombre de la calle es obligatorio').optional().notEmpty().isString(),
    (0, express_validator_1.check)('addressBorough', 'El addressBorough es obligatorio').optional().notEmpty().isString(),
    (0, express_validator_1.check)('accommodationType', 'El tipo de edificio es obligatirio').optional().notEmpty(),
    (0, express_validator_1.body)('profilePhoto').custom(validations_values_1.validateFile),
    (0, express_validator_1.check)("stateId").optional().custom(validations_locations_1.isValidLocationState),
    (0, express_validator_1.check)("cityId").optional().custom(validations_locations_1.isValidLocationcity),
    validation_result_1.validationChecks,
    // check('fecdb_location_state_id','').optional().notEmpty(),
    // check('fecdb_location_borough_id','').optional().notEmpty(),
    // isValidLocationState,
];
exports.userInfoMiddlewares = [
    validations_tokens_1.validateAccessToken,
    validations_users_1.userIsActive
];
exports.deleteUserImageMiddlewares = [
    validations_tokens_1.validateAccessToken,
    validations_users_1.userIsActive,
    (0, express_validator_1.check)("usuario").custom(validations_users_1.userHasImage).withMessage("The user doesn't have a profile image."),
    validation_result_1.validationChecks
];
exports.updateOrganizationMiddlewares = [
    validations_tokens_1.validateAccessToken,
    validations_users_1.userIsActive,
    (0, express_validator_1.check)("usuario").custom(validations_permissions_1.permissionModuleOrganization),
    (0, express_validator_1.check)("organization_city").optional().isString().withMessage("La ciudad debe ser un string").notEmpty().withMessage("La ciudad es obligatorio"),
    (0, express_validator_1.check)("organization_name").optional().isString().withMessage("El nombre debe ser un string").notEmpty().withMessage("El nombre es obligatorio"),
    (0, express_validator_1.check)("organization_email").optional().isEmail().withMessage("El email no es un email válido"),
    (0, express_validator_1.check)("organization_address").optional().isString().withMessage("La direccion debe ser un string").notEmpty().withMessage("La direccion es obligatorio"),
    (0, express_validator_1.check)("organization_license").optional().isString().withMessage("La licencia debe ser un string").notEmpty().withMessage("La licencia es obligatorio"),
    (0, express_validator_1.check)("organization_zip_code").optional().isString().withMessage("El zip code debe ser un string").matches(/^\d{5}(-\d{4})?$/).withMessage('Ingrese un zip code valido'),
    (0, express_validator_1.check)("organization_street_name").optional().isString().withMessage("El nombre de la calle debe ser un string").notEmpty().withMessage("El nombre de la calle es obligatorio"),
    (0, express_validator_1.check)("organization_license_aproval_date").optional().isString().withMessage("La fecha de aprovacion de la licencia debe ser un string").matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)("organization_license_expiration_date").optional().isString().withMessage("El fecha de expiracion de la licencia debe ser un string").matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validation_result_1.validationChecks
];
//# sourceMappingURL=auth_middlewares.js.map