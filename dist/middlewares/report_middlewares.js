"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportReportsMiddlewares = void 0;
const express_validator_1 = require("express-validator");
const validation_result_1 = require("../helpers/validation_result");
const validations_tokens_1 = require("../helpers/validations_tokens");
exports.exportReportsMiddlewares = [
    validations_tokens_1.validateAccessToken,
    (0, express_validator_1.check)('startDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('finalDate').matches(/^([0-9]{1,4})(-|\/){1}((1[0-2])|(0?[1-9]))(-|\/)((1[0-9])|(2[0-9])|(3[0-1])|0?[1-9])$/).withMessage("La fecha no cumple el formato correcto 'AAAA-MM-DD'"),
    (0, express_validator_1.check)('searchKey').optional().isNumeric().withMessage("searchKey debe ser numérico si se proporciona"),
    validation_result_1.validationChecks
];
//# sourceMappingURL=report_middlewares.js.map