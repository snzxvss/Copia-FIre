import { body, check } from 'express-validator'
import { RequestHandler } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { validateAccessToken } from '../helpers/validations_tokens';


export const exportReportsMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]