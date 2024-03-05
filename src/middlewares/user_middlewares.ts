import { body, check } from 'express-validator'
import { RequestHandler } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { validateAccessToken } from '../helpers/validations_tokens'
import { isUniqueEmail, isUniqueUsername, isValidUserId, userIsActive, userIsActiveCustom, userIsInctiveCustom } from '../helpers/validations_users';
import { isValidLocationcity, isValidLocationState } from '../helpers/validations_locations';
import { isStringOrNull, isBooleanValue, validateFile } from '../helpers/validations_values';
import { permissionModuleUser } from '../helpers/validations_permissions';


export const getUserInfoMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('usuario').custom(permissionModuleUser).custom(userIsActiveCustom),
    validationChecks,
    check('userId').custom(isValidUserId),
    validationChecks,
]

export const updateUserMiddlewares: RequestHandler[] = [
    // VALIDACION DE CAMPOS NO NULOS
    validateAccessToken,
    check('usuario').custom(permissionModuleUser).custom(userIsActiveCustom),
    check('userId').custom(isValidUserId),
    validationChecks,
    check('userEmail', 'El userEmail es obligatorio').optional().isEmail().custom(isUniqueEmail),
    check('user_state', 'Solo se aceptan valores booleanos').optional().custom(isBooleanValue),
    check('addressBorough', 'El addressBorough es obligatorio').optional().isString().notEmpty(),
    check("stateId").optional().custom(isValidLocationState),
    check("cityId").optional().custom(isValidLocationcity),
    check('userUsername', 'El user_username es obligatorio').optional().isString().notEmpty().custom(isUniqueUsername),
    check('userLastName', 'El user_last_name es obligatorio').optional().isString().notEmpty(),
    check('userFirstName', 'El user_first_name es obligatorio').optional().isString().notEmpty(),
    check('zipCode', 'Ingrese un zip code valido').optional().matches(/^\d{5}(-\d{4})?$/),
    check('streetName', 'El adress_street_name es obligatorio').optional().isString().notEmpty(),
    check('userPhoneNumber', 'Ingrese un numero de telefono valido').optional().matches(/^((\+1\s))(\(?\d{3}\)|(\d{3}))[-\s]?\d{3}[-\s]?\d{4}$/gm),
    // check('phone_number_number', 'Ingrese un numero de telefono valido').isMobilePhone(['es-CO']),
    check('agentCofNumber', 'El user_agent_cof_number es requerido').optional().custom(isStringOrNull),
    check('accommodationType', 'El address_type_accommodation es obligatorio').optional().isString().notEmpty(),
    body('profilePhoto').custom(validateFile),
    validationChecks,
]

export const createUserMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('usuario').custom(permissionModuleUser).custom(userIsActiveCustom),
    check('userState', 'Solo se aceptan valores booleanos').custom(isBooleanValue),
    check('userEmail', 'Ingrese un email valido').notEmpty().isEmail().custom(isUniqueEmail),
    check('userUsername', 'El nombre de usuario debe tener al menos 8 caracteres').notEmpty().isString().isLength({ min: 8 }).custom(isUniqueUsername),
    check('userPhoneNumber', 'Ingrese un numero de telefomo valido').notEmpty().matches(/^((\+1\s))?(\(?\d{3}\)|(\d{3}))[-\s]?\d{3}[-\s]?\d{4}$/gm),
    check('userLastName', 'El apellido es obligatorio').notEmpty().isString(),
    check('userFirstName', 'El nombre es obligatorio').notEmpty().isString(),
    check('agentCofNumber', 'El es obligatorio').custom(isStringOrNull),
    check('zipCode', 'Ingrese un zip code valido').matches(/^\d{5}(-\d{4})?$/),
    check('streetName', 'El nombre de la calle es obligatorio').notEmpty().isString(),
    check('addressBorough', 'El addressBorough es obligatorio').notEmpty().isString(),
    check('accommodationType', 'El tipo de edificio es obligatirio').notEmpty(),
    check('auditLogPermission').custom(isBooleanValue).withMessage('El auditLogPermission debe ser un valor booleano'),
    check('reportTaskPermission').custom(isBooleanValue).withMessage('El reportTaskPermission debe ser un valor booleano'),
    check('organizationPermission').custom(isBooleanValue).withMessage('El organizationPermission debe ser un valor booleano'),
    check('userPermission').custom(isBooleanValue).withMessage('El userPermission debe ser un valor booleano'),
    check('taskPermission').custom(isBooleanValue).withMessage('El taskPermission debe ser un valor booleano'),
    check('clientPermission').custom(isBooleanValue).withMessage('El clientPermission debe ser un valor booleano'),
    // check('isProfilPhoto').custom(validateFile),
    body('profilePhoto').custom(validateFile),
    check("stateId").custom(isValidLocationState),
    check("cityId").custom(isValidLocationcity),
    validationChecks,
]

export const alternateUserMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('usuario').custom(permissionModuleUser).custom(userIsActiveCustom),
    check('userId').custom(isValidUserId),
    validationChecks
]

export const exportUsersMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
] 

export const getUserMiddewaresPdf: RequestHandler[] = [
    validateAccessToken,
    check('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]