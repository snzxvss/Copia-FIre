"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBuildingTypeMiddlewares = exports.createBuildingTypeMiddlewares = void 0;
const express_validator_1 = require("express-validator");
const validation_result_1 = require("../helpers/validation_result");
const validations_tokens_1 = require("../helpers/validations_tokens");
const validations_buildings_1 = require("../helpers/validations_buildings");
exports.createBuildingTypeMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("buildingTypeName").isString().withMessage("El buildingTypeName debe ser una cadena de texto").isLength({ min: 5 }).withMessage("El buildingTypeName debe tener al menos 5 caracteres"),
    (0, express_validator_1.check)("buildingTypeDescription").isString().withMessage("El buildingTypeDescription debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El buildingTypeDescription debe tener al menos 25 caracteres"),
    validation_result_1.validationChecks
];
exports.updateBuildingTypeMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)("buildingTypeId").custom(validations_buildings_1.isValidBuildingTypeId),
    (0, express_validator_1.check)("buildingTypeName").isString().withMessage("El buildingTypeName debe ser una cadena de texto").isLength({ min: 5 }).withMessage("El buildingTypeName debe tener al menos 5 caracteres"),
    (0, express_validator_1.check)("buildingTypeDescription").isString().withMessage("El buildingTypeDescription debe ser una cadena de texto").isLength({ min: 25 }).withMessage("El buildingTypeDescription debe tener al menos 25 caracteres"),
    validation_result_1.validationChecks
];
//# sourceMappingURL=building_middlewares.js.map