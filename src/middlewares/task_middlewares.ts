import { body, check } from 'express-validator'
import { Request, RequestHandler, Response, } from 'express'
import { validationChecks } from '../helpers/validation_result'
import { validateAccessToken } from '../helpers/validations_tokens'
import { isValidBuildingId } from '../helpers/validations_buildings'
import { isValidClientId } from '../helpers/validations_clients'
import { isValidToEditTask, isValidTaskExtinguishers, isValidTaskId, isValidToAssign, isValidToCancel, isValidToComplete, isValidArrayOfTaskExtinguisher } from '../helpers/validations_tasks'
import { isValidUserId, userIsActiveCustom } from '../helpers/validations_users'
import { permissionModuleTask } from '../helpers/validations_permissions'
import { TaskDbProcedures } from '../db/procedures/task_procedures'

const taskDbProcedures = new TaskDbProcedures

export const getTaskInfoMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleTask),
    validationChecks,
    check("taskId").isNumeric().withMessage('El taskId debe ser un valor numerico').custom(isValidTaskId),
    validationChecks
]
export const createTaskMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleTask),
    validationChecks,
    check("taskDescription")/*task_description*/.isString().withMessage("El building_name debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El building_name debe tener al menos 25 caracteres"),
    check("taskStartNewExtinguisherCount").isInt().withMessage("El task_start_number_new_extinguisher debe ser un valor entero"),
    check("taskStartRechargedExtinguisherCount").isInt().withMessage("El task_start_number_recharged_extinguisher debe ser un valor entero"),
    check("taskExpectedEndDate").matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/),
    check("clientId").custom(isValidClientId),
    check("buildingId").custom(isValidBuildingId),
    check("assignedUser").optional().custom(isValidUserId),
    check('taskExtinguishers').custom(isValidTaskExtinguishers).isArray().withMessage(`La taskExtinguishers debe ser una lista`),
    validationChecks
]
export const updateTaskMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleTask),
    validationChecks,
    check("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(isValidTaskId),
    check('isValidToEditTask').custom(isValidToEditTask),
    validationChecks,
    check("clientId").optional().custom(isValidClientId),
    check("taskDescription").optional().isString().withMessage("La taskDescription debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El building_name debe tener al menos 25 caracteres"),
    check("taskStartNewExtinguisherCount").optional().isInt({ min: 1 }).withMessage("El taskStartNewExtinguisherCount debe ser un valor entero"),
    check("taskStartRechargedExtinguisherCount").optional().isInt({ min: 1 }).withMessage("El taskStartRechargedExtinguisherCount debe ser un valor entero"),
    check("taskExpectedEndDate").optional().matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/),
    check("buildingId").optional().custom(isValidBuildingId),
    check("assignedUser").optional().custom(isValidUserId),
    validationChecks
]
export const manageTaskMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('usuario').custom(permissionModuleTask).custom(userIsActiveCustom),
    check('taskId').custom(isValidTaskId),
    validationChecks,
    check('taskExtinguisher').custom(isValidArrayOfTaskExtinguisher),
    validationChecks,

]
export const assignTaskMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleTask),
    validationChecks,
    check("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(isValidTaskId),
    check('isValidToEditTask').custom(isValidToAssign),
    validationChecks,
    check("assignedUser").custom(isValidUserId),
    validationChecks
]
export const cancelTaskIMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleTask),
    validationChecks,
    check("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(isValidTaskId),
    check('isValidToEditTask').custom(isValidToCancel),
    validationChecks
]
export const completeTaskIMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check("usuario").custom(permissionModuleTask),
    validationChecks,
    check("taskId").isNumeric().withMessage('taskId debe ser un valor numerico').custom(isValidTaskId),
    check('isValidToEditTask').custom(isValidToComplete),
    check('taskEndLatitude').custom(body),
    check('taskEndLongitude').custom(body),
    validationChecks
]
export const exportTasksMiddlewares: RequestHandler[] = [
    validateAccessToken,
    check('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    check('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    validationChecks
]