import { RequestHandler } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { body, check, query } from 'express-validator'
import { isStringOrNull, validateFile } from '../helpers/validations_values'
import { isValidLocationcity, isValidLocationState } from '../helpers/validations_locations'
import { XORTokenType, validateAccessToken, validateRecoveryToken } from '../helpers/validations_tokens'
import { userExistByEmail, userExistByUsername, userIsAgent, userIsActive, userHasImage, userIsActiveCustom } from '../helpers/validations_users'
import { permissionModuleClient, permissionModuleOrganization } from '../helpers/validations_permissions'

export const authUserMiddlewares: RequestHandler[] = [
    // VALIDACION DE CAMPOS NO NULOS
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validationChecks,
    // VALIDACIOIN DE USUARIO EN LA BASE DE DATOS
    userExistByUsername,
    userIsAgent,
    userIsActive
]



export const forgotPasswordMiddlewares: RequestHandler[] = [
    // VAliDACION DE CAMPO EMAIL
    check('email').notEmpty().withMessage('El email es obligatorio'),
    validationChecks,
    check('email').isEmail().withMessage('El email no tiene un formato correcto'),
    validationChecks,
    // VALIDACION DE USUARIO EN LA BASE DE DATOS
    userExistByEmail,
    check('usuario').custom(userIsActiveCustom),
    validationChecks,
]

export const updatePasswordMiddlewares: RequestHandler[] = [
    XORTokenType,
    validateAccessToken,
    validateRecoveryToken,
    userExistByEmail,
    userIsActive,
    check('oldPassword', 'La vieja contraseña es obligatoria').if(check('tokenType').matches(/accessToken/)).notEmpty(),
    check('newPassword').notEmpty().withMessage('La nueva contraseña es obligatoria').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[=;:+.\-_\/%*#@!])[A-Za-z\d=;:+.\-_\/%*#@!]{8,}$/gm).withMessage('No cumple con los requisitos de seguridad'),
    query('recoveryToken', 'Token de recuperacion obligatorio').optional().notEmpty(),
    validationChecks,
]

export const updateDataMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('usuario').custom(permissionModuleClient),
    userIsActive,
    // check('userEmail', 'Ingrese un email valido').optional().notEmpty().isEmail(),
    // check('userUsername', 'El nombre de usuario debe tener al menos 8 caracteres').optional().notEmpty().isString().isLength({ min: 8 }),
    // check('user_image_url','').optional().notEmpty().isURL({require_tld: true, host_whitelist:['dominioespecifico.com']}),
    check('userPhoneNumber', 'Ingrese un numero de telefomo valido').optional().notEmpty().matches(/^((\+1\s))?(\(?\d{3}\)|(\d{3}))[-\s]?\d{3}[-\s]?\d{4}$/),
    check('userLastName', 'El apellido es obligatorio').optional().notEmpty().isString(),
    check('userFirstName', 'El nombre es obligatorio').optional().notEmpty().isString(),
    // check('agentCofNumber', 'El es obligatorio').optional().custom(isStringOrNull),
    check('zipCode', 'Ingrese un zip code valido').optional().matches(/^\d{5}(-\d{4})?$/),
    check('streetName', 'El nombre de la calle es obligatorio').optional().notEmpty().isString(),
    check('addressBorough', 'El addressBorough es obligatorio').optional().notEmpty().isString(),
    check('accommodationType', 'El tipo de edificio es obligatirio').optional().notEmpty(),
    body('profilePhoto').custom(validateFile),
    check("stateId").optional().custom(isValidLocationState),
    check("cityId").optional().custom(isValidLocationcity),
    validationChecks,
    // check('fecdb_location_state_id','').optional().notEmpty(),
    // check('fecdb_location_borough_id','').optional().notEmpty(),
    // isValidLocationState,
]
export const userInfoMiddlewares: RequestHandler[] = [
    validateAccessToken,
    userIsActive
]
export const deleteUserImageMiddlewares: RequestHandler[] = [
    validateAccessToken,
    userIsActive,
    check("usuario").custom(userHasImage).withMessage("The user doesn't have a profile image."),
    validationChecks
]

export const updateOrganizationMiddlewares: RequestHandler[] = [
    validateAccessToken,
    userIsActive,
    check("usuario").custom(permissionModuleOrganization),
    check("organization_city").optional().isString().withMessage("La ciudad debe ser un string").notEmpty().withMessage("La ciudad es obligatorio"),
    check("organization_name").optional().isString().withMessage("El nombre debe ser un string").notEmpty().withMessage("El nombre es obligatorio"),
    check("organization_email").optional().isEmail().withMessage("El email no es un email válido"),
    check("organization_address").optional().isString().withMessage("La direccion debe ser un string").notEmpty().withMessage("La direccion es obligatorio"),
    check("organization_license").optional().isString().withMessage("La licencia debe ser un string").notEmpty().withMessage("La licencia es obligatorio"),
    check("organization_zip_code").optional().isString().withMessage("El zip code debe ser un string").matches(/^\d{5}(-\d{4})?$/).withMessage('Ingrese un zip code valido'),
    check("organization_street_name").optional().isString().withMessage("El nombre de la calle debe ser un string").notEmpty().withMessage("El nombre de la calle es obligatorio"),
    check("organization_license_aproval_date").optional().isString().withMessage("La fecha de aprovacion de la licencia debe ser un string").matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check("organization_license_expiration_date").optional().isString().withMessage("El fecha de expiracion de la licencia debe ser un string").matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]