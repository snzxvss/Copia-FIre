"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRecoveryToken = exports.validateAccessToken = exports.XORTokenType = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const JWT_service_1 = require("../services/JWT_service");
const user_procedures_1 = require("../db/procedures/user_procedures");
dotenv_1.default.config();
const tokenService = new JWT_service_1.JWTService;
const userDbProcedures = new user_procedures_1.UserDbProcedures;
const XORTokenType = (req, res, next) => {
    try {
        // const { recoveryToken } = req.query;
        const accessToken = req.header('accessToken');
        const { recoveryToken } = req.body;
        if (accessToken && recoveryToken) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'Sólo se permite un tipo de token a la vez',
                        path: 'service',
                        value: {
                            accessToken,
                            recoveryToken
                        }
                    },
                ],
            });
        }
        else if (!accessToken && !recoveryToken) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'El token es obligatorio',
                        path: 'service'
                    },
                ],
            });
        }
        req.body.tokenType = (accessToken) ? 'accessToken' : 'recoveryToken';
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
};
exports.XORTokenType = XORTokenType;
const validateAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accesToken = req.header('accessToken');
        const { tokenType } = req.body;
        if (accesToken || tokenType === 'accessToken') {
            const { success, playload } = tokenService.validateAccessJWT(accesToken);
            const usuario = yield userDbProcedures.getUsersDataByIdsProcedure(playload);
            if (!usuario) {
                return res.status(401).json({
                    success,
                    errors: [
                        {
                            msg: 'Error, Access Token invalido',
                            path: 'Access Token'
                        },
                    ],
                });
            }
            if (!success) {
                return res.status(401).json({
                    success,
                    errors: [
                        {
                            msg: 'Error, Access Token invalido',
                            path: 'Access Token'
                        },
                    ],
                });
            }
            req.body.email = usuario.userEmail;
            req.body.usuario = usuario;
        }
        else if (tokenType === "accessToken" || !tokenType) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'Error, Access Token es obligatorio',
                        path: 'Access Token'
                    },
                ],
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.validateAccessToken = validateAccessToken;
const validateRecoveryToken = (req, res, next) => {
    try {
        // const recoveryToken = req.header('recoveryToken');
        const { tokenType, recoveryToken } = req.body;
        if (recoveryToken || tokenType === 'recoveryToken') {
            const { success, playload: email } = tokenService.validateRecoveryJWT(recoveryToken);
            req.body.email = email;
            if (!success) {
                return res.status(400).json({
                    success,
                    errors: [
                        {
                            msg: 'Error, recovery Token invalido',
                            path: 'Recovery Token'
                        },
                    ],
                });
            }
        }
        else if (tokenType === 'recoveryToken' || !tokenType) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'Error, recovery Token es obligatorio',
                        path: 'Recovery Token'
                    },
                ],
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
};
exports.validateRecoveryToken = validateRecoveryToken;
//# sourceMappingURL=validations_tokens.js.map