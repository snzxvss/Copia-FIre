import { body, check } from 'express-validator'
import { RequestHandler } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { isValidLocationcity, isValidLocationState } from '../helpers/validations_locations';
import { validateAccessToken } from '../helpers/validations_tokens';
import {
    emailsClientContactExists, emailsClientContactToUpdate,
    isValidClientContactId, isValidClientId, phoneNumbersClientContactExits,
    phoneNumbersClientContactToUpdate
} from '../helpers/validations_clients';
import { isArrayOfEmails, isArrayOfPhoneNumbers, isBooleanValue, isStringOrNull } from '../helpers/validations_values';
import { permissionModuleClient } from '../helpers/validations_permissions';
import { isValidBuildingId, isValidBuildingTypeId } from '../helpers/validations_buildings';

export const getClientInfoMiddewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleClient),
    validationChecks,
    check("clientId").custom(isValidClientId),
    validationChecks,
]
export const createClientMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('clientTagId', 'El clientTagId no puede estar vacío').optional().notEmpty(),
    check('streetName', 'El streetName es obligatorio').notEmpty(),
    check('accommodationType', 'El accommodationType es obligatorio').notEmpty(),
    check('addressBorough', 'El addressBorough es obligatorio').notEmpty(),
    check('zipCode', 'Ingrese un zip code valido').matches(/^\d{5}(-\d{4})?$/),
    check('clientName', 'El clientName es obligatorio').notEmpty(),
    check("stateId").custom(isValidLocationState),
    check("cityId").custom(isValidLocationcity),
    validationChecks
];

export const createClientContactMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('clientId').custom(isValidClientId),
    check('contactFirstName', 'El contactFirstName es obligatorio').notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    check('contactLastName', 'El contactLastName es obligatorio').notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    validationChecks
];

export const updateClientContactMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('clientId', "El clientId es obligatorio").notEmpty().custom(isValidClientId).not().isArray().withMessage('Solo se permite una id a la vez'),
    check('contactId', "El contactId es obligatorio").notEmpty().custom(isValidClientContactId).not().isArray().withMessage('Solo se permite una id a la vez'),
    check('contactFirstName', 'El contactFirstName es obligatorio').optional().notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    check('contactLastName', 'El contactLastName es obligatorio').optional().notEmpty().isString().withMessage("Ingrese un valor tipo string"),
    check('addEmails').optional().isArray().withMessage("solo se aceptan arrays").custom(isArrayOfEmails).not().custom(emailsClientContactExists).withMessage("El array contiene correos ya existentes"),
    check('addNumbers').optional().isArray().withMessage("solo se aceptan arrays").custom(isArrayOfPhoneNumbers).not().custom(phoneNumbersClientContactExits).withMessage("El array numeros ya existentes"),
    check('deleteEmails').optional().isArray().withMessage("solo se aceptan arrays").custom(isArrayOfEmails).custom(emailsClientContactExists),
    check('deleteNumbers').optional().isArray().withMessage("solo se aceptan arrays").custom(isArrayOfPhoneNumbers).custom(phoneNumbersClientContactExits),
    check('updateEmails').optional().isArray().withMessage("solo se aceptan arrays").custom(emailsClientContactToUpdate),
    check('updateNumbers').optional().isArray().withMessage("solo se aceptan arrays").custom(phoneNumbersClientContactToUpdate),
    validationChecks
];

export const updateClientMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('clientId').custom(isValidClientId).not().isArray().withMessage('Solo se permite una id a la vez'),
    check('clientTagId', 'El clientTagId debe ser nulo o string').optional().custom(isStringOrNull),
    check('streetName', 'El streetName es obligatorio').optional().notEmpty(),
    check('accommodationType', 'El accommodationType es obligatorio').optional().notEmpty(),
    check('addressBorough', 'El addressBorough es obligatorio').optional().notEmpty(),
    check('zipCode', 'Ingrese un zip code valido').optional().matches(/^\d{5}(-\d{4})?$/),
    check('clientName').optional().isString().withMessage("El clientName debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El clientName debe tener al menos 8 caracteres"),
    check("stateId").optional().custom(isValidLocationState),
    check("cityId").optional().custom(isValidLocationcity),
    validationChecks
];

export const deleteClientcontactMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleClient),
    validationChecks,
    check('clientId').custom(isValidClientId),
    validationChecks,
    check('contactId').custom(isValidClientContactId),
    validationChecks,
]

export const createClientBuildingMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleClient),
    validationChecks,
    check("clientId").custom(isValidClientId),
    check("buildingName").isString().withMessage("El building_name debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El building_name debe tener al menos 8 caracteres"),
    check("buildingFloors").isInt({ min: 1, max: 167 }).withMessage("El buildingFloors debe ser un numero (1-167)"),
    check("buildingSurfaceSquareMeters").isNumeric().withMessage("El buildingSurfaceSquareMeters debe ser un valor numerico").notEmpty().withMessage("El buildingSurfaceSquareMeters es obligatorio"),
    check("buildingTypeId").isInt().withMessage("Solo se permiten valores numericos").custom(isValidBuildingTypeId),
    check("streetName").isString().withMessage("El streetName debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El streetName debe tener al menos 8 caracteres"),
    check("accommodationType").isString().withMessage("El accommodationType debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El accommodationType debe tener al menos 8 caracteres"),
    check("addressBorough").isString().withMessage("El addressBorough debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El addressBorough debe tener al menos 8 caracteres"),
    check("zipCode").matches(/^\d{5}(-\d{4})?$/).withMessage("El zipCode no es valido"),
    check("stateId").custom(isValidLocationState),
    check("cityId").custom(isValidLocationcity),
    validationChecks,
]

export const updateClientBuildingMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("clientId").custom(isValidClientId),
    validationChecks,
    check("buildingId").isInt().withMessage("Solo se permiten valores numericos").custom(isValidBuildingId),
    check("buildingName").optional().isString().withMessage("El building_name debe ser una cadena de texto").isLength({ min: 8 }).withMessage("El building_name debe tener al menos 8 caracteres"),
    check("buildingFloors").isInt({ min: 1, max: 167 }).withMessage("El buildingFloors debe ser un numero (1-167)"),
    check("buildingTypeId").optional().custom(isValidBuildingTypeId),
    check("buildingSurfaceSquareMeters").optional().isNumeric().withMessage("El buildingSurfaceSquareMeters debe ser un valor numerico").notEmpty().withMessage("El buildingSurfaceSquareMeters es obligatorio"),
    validationChecks
]

export const exportClientsMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]
export const exportClientDetailMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('clientId').custom(isValidClientId),
    validationChecks,
]