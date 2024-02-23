"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JWTService {
    constructor() {
        this.tokenType = '';
    }
    generateJWT(playload, type) {
        try {
            if (type === 'ACCESS_TOKEN') {
                this.tokenType = process.env.JWT_KEY_FOR_ACCESS_TOKEN;
            }
            else if (type === 'RECOVERY_TOKEN') {
                this.tokenType = process.env.JWT_KEY_FOR_RECOVERY_TOKEN;
            }
            if (type == 'ACCESS_TOKEN') {
                const accessToken = jsonwebtoken_1.default.sign({ playload }, this.tokenType, {
                    // expiresIn: '30m',
                    algorithm: 'HS256'
                });
                return { status: 200, msg: 'Loggin correcto', success: true, accessToken };
            }
            else if (type == 'RECOVERY_TOKEN') {
                const recoveryToken = jsonwebtoken_1.default.sign({ playload }, this.tokenType, {
                    //! expiresIn: '10m',
                    algorithm: 'HS256'
                });
                return { status: 200, msg: 'Loggin correcto', success: true, recoveryToken };
            }
        }
        catch (error) {
            console.log(error);
            return { status: 500, msg: 'Error, comunicarse con el administrador', success: false };
        }
    }
    validateAccessJWT(accessToken) {
        try {
            const { playload } = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_KEY_FOR_ACCESS_TOKEN);
            const response = { success: true, playload };
            return response;
        }
        catch (error) {
            return { success: false };
        }
    }
    validateRecoveryJWT(recoveryToken) {
        try {
            const { playload } = jsonwebtoken_1.default.verify(recoveryToken, process.env.JWT_KEY_FOR_RECOVERY_TOKEN);
            const response = { success: true, playload };
            return response;
        }
        catch (error) {
            const response = { status: 400, success: false, msg: 'Token invalido' };
            return response;
        }
    }
}
exports.JWTService = JWTService;
//# sourceMappingURL=JWT_service.js.map