"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationChecks = void 0;
const express_validator_1 = require("express-validator");
const moment_1 = __importDefault(require("moment"));
const validationChecks = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const betterErrors = errors.array().map((error) => ({
        msg: error.msg,
        path: error.path,
        // value: error.value
    }));
    if (!errors.isEmpty()) {
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        const url = req.originalUrl;
        betterErrors.forEach((error) => {
            console.error(`${fechaFormateada} - Valor invalido en el atributo ${error.path} (${error.msg} - ${url})`);
        });
        return res.status(400).json({
            success: false,
            errors: betterErrors
        });
    }
    next();
};
exports.validationChecks = validationChecks;
//# sourceMappingURL=validation_result.js.map