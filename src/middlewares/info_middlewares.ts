import { check } from 'express-validator'
import { RequestHandler } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { validateAccessToken } from '../helpers/validations_tokens'
import { permissionModuleTask } from '../helpers/validations_permissions'
import { isValidClientId } from '../helpers/validations_clients'
import { isValidUserId } from '../helpers/validations_users'

export const getOrganizationInfoMiddlewares: RequestHandler[] = [
    // VALIDACION DE CAMPOS NO NULOS
    validateAccessToken,
    validationChecks,
]
export const getLocationInfoMiddlewares: RequestHandler[] = [
    // VALIDACION DE CAMPOS NO NULOS
    validateAccessToken,
    check('stateId', 'El state id debe ser un numero').optional().isNumeric(),
    validationChecks,
]

export const getBuildingTypeInfoMiddlewares: RequestHandler[] = [
    validateAccessToken
]

export const getClientBuildingsInfoMiddlewares:RequestHandler[]=[
    validateAccessToken,
    check("clientId").optional().custom(isValidClientId),
    validationChecks,
]

export const getClientsInfoMiddlewares: RequestHandler[] =[
    validateAccessToken,
    check('searchKey').optional().isString(),
    check('startDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]
export const getUsersInfoMiddlewares: RequestHandler[] =[
    validateAccessToken,
    check('search_key').optional().isString(),
    check('startDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]

const fileTest = (value: any, { req }: { req: any }) => {
    console.log(value);
    const files = req.files
    req.body.files = files
    console.log({ files });
    
}

export const testMiddlewares: RequestHandler[] = [
    check('nombre').custom(fileTest)
]

export const getTaskStatesInfoMiddlewares: RequestHandler[] = [
    validateAccessToken
]
export const getTasksInfoMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('search_key').optional().isString(),
    check('startDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]
export const getTasksByAgentIdInfoMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("assignedUser").notEmpty().withMessage("assignedUser es obligatorio"),
    validationChecks
]