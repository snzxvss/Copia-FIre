import { body, check } from 'express-validator'
import { RequestHandler } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { validateAccessToken } from '../helpers/validations_tokens'
import { isValidBuildingTypeId } from '../helpers/validations_buildings'



export const createBuildingTypeMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("buildingTypeName").isString().withMessage("El buildingTypeName debe ser una cadena de texto").isLength({ min: 5 }).withMessage("El buildingTypeName debe tener al menos 5 caracteres"),
    check("buildingTypeDescription").isString().withMessage("El buildingTypeDescription debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El buildingTypeDescription debe tener al menos 25 caracteres"),
    validationChecks
]

export const updateBuildingTypeMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("buildingTypeId").custom(isValidBuildingTypeId),
    check("buildingTypeName").isString().withMessage("El buildingTypeName debe ser una cadena de texto").isLength({ min: 5 }).withMessage("El buildingTypeName debe tener al menos 5 caracteres"),
    check("buildingTypeDescription").isString().withMessage("El buildingTypeDescription debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El buildingTypeDescription debe tener al menos 25 caracteres"),
    validationChecks
]
