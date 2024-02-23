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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsInctiveCustom = exports.userIsActiveCustom = exports.userHasImage = exports.isUniqueEmail = exports.isUniqueUsername = exports.isValidUserId = exports.userIsAgent = exports.userIsActive = exports.userExistByEmail = exports.userExistByEmailCustom = exports.userExistByUsername = void 0;
const user_procedures_1 = require("../db/procedures/user_procedures");
const userDbProcedures = new user_procedures_1.UserDbProcedures;
const userExistByUsername = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    try {
        const usuario = yield userDbProcedures.getUserDataByUsernameProcedure(username);
        req.body.usuario = usuario;
        if (!usuario || usuario.userUsername !== username) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: `El usuario con username '${username}' no existe.`,
                        path: 'usuario'
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
exports.userExistByUsername = userExistByUsername;
const userExistByEmailCustom = (email, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        throw new Error(`El email es obligatorio`);
    const usuario = yield userDbProcedures.getUserDataByEmailProcedure(email);
    if (!usuario)
        throw new Error(`No existe un usuario con email ${email}`);
});
exports.userExistByEmailCustom = userExistByEmailCustom;
const userExistByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const usuario = yield userDbProcedures.getUserDataByEmailProcedure(email);
        req.body.usuario = usuario;
        if (!usuario || usuario.userEmail !== email) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: `No existe un usuario registrado con el correo ${email}`,
                        path: 'email',
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
exports.userExistByEmail = userExistByEmail;
const userIsActive = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = req.body.usuario;
    try {
        if (!usuario.userState) {
            return res.status(403).json({
                success: false,
                errors: [
                    {
                        msg: 'Usuario inactivo, habla con el administrador',
                        path: 'usuario'
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
exports.userIsActive = userIsActive;
const userIsAgent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isMobile } = req.body;
        const usuario = req.body.usuario;
        if (isMobile === true && usuario.agentCofNumber == null) {
            return res.status(403).json({
                success: false,
                errors: [
                    {
                        msg: 'Usuario no es agente, habla con el administrador',
                        path: 'usuario'
                    },
                ],
            });
        }
        else {
            next();
        }
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
exports.userIsAgent = userIsAgent;
const isValidUserId = (id, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidUserId = yield userDbProcedures.getUsersDataByIdsProcedure(id);
    req.body.user = isValidUserId;
    if (!id)
        throw new Error('El userId es obligatorio');
    if (!isValidUserId)
        throw new Error('Ingrese una id de usuario válida');
    if (Array.isArray(id))
        throw new Error('Solo se permiten valores numericos');
});
exports.isValidUserId = isValidUserId;
const isUniqueUsername = (username, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!username)
        throw new Error(`El username es obligatorio`);
    const { user } = req.body;
    const isUniqueUsername = yield userDbProcedures.getUserDataByUsernameProcedure(username);
    if (isUniqueUsername && (user.userUsername != isUniqueUsername.userUsername))
        throw new Error('El nombre de usuario ya está en uso');
});
exports.isUniqueUsername = isUniqueUsername;
const isUniqueEmail = (email, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email)
        throw new Error(`'El email es obligatorio`);
    const { user } = req.body;
    const isUniqueEmail = yield userDbProcedures.getUserDataByEmailProcedure(email);
    if (isUniqueEmail && (user.userEmail != isUniqueEmail.userEmail))
        throw new Error('El Email ya está en uso');
});
exports.isUniqueEmail = isUniqueEmail;
const userHasImage = (usuario, { req }) => usuario.userImage != "No-Url-user";
exports.userHasImage = userHasImage;
const userIsActiveCustom = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.userState) {
        throw new Error(`El usuario ${user.userUsername} se encuntra inactivo`);
    }
});
exports.userIsActiveCustom = userIsActiveCustom;
const userIsInctiveCustom = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.userState) {
        throw new Error(`El usuario ${user.userUsername} se encuntra activo`);
    }
});
exports.userIsInctiveCustom = userIsInctiveCustom;
//# sourceMappingURL=validations_users.js.map