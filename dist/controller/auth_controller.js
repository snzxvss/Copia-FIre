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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrganization = exports.userInfo = exports.deleteUserImage = exports.updateData = exports.updatePassword = exports.forgotPassword = exports.authUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_service_1 = require("../services/email_service");
const JWT_service_1 = require("../services/JWT_service");
const user_procedures_1 = require("../db/procedures/user_procedures");
const S3Management_1 = require("../s3/S3Management");
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const organization_procedures_1 = require("../db/procedures/organization_procedures");
const connection_1 = __importDefault(require("../db/connection"));
const userDbProcedure = new user_procedures_1.UserDbProcedures;
const organizationDbProcedures = new organization_procedures_1.OrganizationDbProcedures;
const tokenService = new JWT_service_1.JWTService;
const emailService = new email_service_1.EmailService;
const s3 = new S3Management_1.S3Management();
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, usuario } = req.body;
    const { userPassword } = usuario, user = __rest(usuario, ["userPassword"]);
    try {
        const hashed = bcrypt_1.default.hashSync(password, 10);
        const equal = bcrypt_1.default.compareSync(password, userPassword);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        if (equal) {
            // Call the GetExtinguisher stored procedure
            const extinguisherData = yield connection_1.default.query('CALL GetExtinguisher()');
            const { status, success, msg, accessToken } = tokenService.generateJWT(user.userId, 'ACCESS_TOKEN');
            console.log(`${fechaFormateada} - Loggin correcto - Username: ${username}`);
            return res.status(status).json({
                success,
                msg,
                accessToken,
                data: user,
                extinguisherData,
            });
        }
        else {
            console.log(`${fechaFormateada} - Contraseña incorrecta - username: ${username}`);
            return res.status(401).json({
                success: false,
                errors: [
                    {
                        msg: 'La contraseña es incorrecta',
                        path: 'password'
                    }
                ],
                hashed
            });
        }
    }
    catch (error) {
        console.error(error);
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
exports.authUser = authUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const { recoveryToken } = tokenService.generateJWT(email, 'RECOVERY_TOKEN');
        // const { status, success, msg }: ResponseInterface = await emailService.sendRecoveryEmailByGmail(email, recoveryToken);
        const { status, success, msg } = yield emailService.sendRecoveryEmail(email, recoveryToken);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        success == true ? console.log(`${fechaFormateada} - Recovery token enviado a ${email}`) : console.log(`${fechaFormateada} - Error al enviar el Recovery Token a ${email}`);
        // console.log(success);
        return res.status(status).json({
            success,
            msg,
            recoveryToken
        });
    }
    catch (error) {
        console.error(error);
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
exports.forgotPassword = forgotPassword;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword, tokenType, usuario } = req.body;
        const { userPassword } = usuario, user = __rest(usuario, ["userPassword"]);
        const hashedNewPassword = bcrypt_1.default.hashSync(newPassword, 10);
        if (tokenType === 'recoveryToken') {
            const response = yield userDbProcedure.updateUserPasswordProcedure(user.userEmail, hashedNewPassword);
            const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
            console.log(`${fechaFormateada} - Contraseña del usuario ${user.userUsername} actualizada correctamente`);
            return res.status(200).json({
                success: true,
                msg: response
            });
        }
        else if (tokenType === 'accessToken' && user.userRequirePasswordChange == false) {
            const hashedOldPassword = bcrypt_1.default.hashSync(oldPassword, 10);
            const equal = bcrypt_1.default.compareSync(oldPassword, userPassword);
            if (equal) {
                const response = yield userDbProcedure.updateUserPasswordProcedure(user.userEmail, hashedNewPassword);
                return res.status(200).json({
                    success: true,
                    msg: response
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    msg: 'La contraseña actual no coincide',
                    errors: [
                        {
                            msg: 'La contraseña actual no coincide',
                            path: 'password'
                        }
                    ],
                });
            }
            ;
        }
        else if (tokenType === 'accessToken' && user.userRequirePasswordChange == true) {
            const response = yield userDbProcedure.updateUserPasswordProcedure(user.userEmail, hashedNewPassword);
            return res.status(200).json({
                success: true,
                msg: response,
            });
        }
        ;
    }
    catch (error) {
        console.error(error);
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
    ;
});
exports.updatePassword = updatePassword;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userLastName, userFirstName, stateId, userPhoneNumber, zipCode, streetName, addressBorough, cityId } = req.body;
        const { usuario, fileExt } = req.body;
        let userImage;
        if (req.files && req.files.profilePhoto) {
            const { profilePhoto } = req.files;
            yield profilePhoto.mv('./src/temp/profilePhoto.png');
            const dataFile = fs_1.default.readFileSync('./src/temp/profilePhoto.png');
            const data = {
                blob: dataFile,
                storageId: `USERBYID-${usuario.userId}-USER_IMAGE${fileExt}`,
                type: profilePhoto.mimetype
            };
            const dataUploaded = yield s3.uploadObject(data, 'USER_IMAGE');
            userImage = dataUploaded.path;
        }
        const newUserData = {
            userId: usuario.userId, userLastName, userFirstName, stateId, userImage,
            userPhoneNumber, zipCode, streetName, addressBorough, cityId
        };
        const response = yield userDbProcedure.updateUserDataProcedure(newUserData);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        if (response)
            console.log(`${fechaFormateada} - User Updated - Username: ${usuario.userUsername}`);
        return res.status(200).json({
            success: true,
            msg: response,
            newUserData,
        });
    }
    catch (error) {
        console.error(error);
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
    ;
});
exports.updateData = updateData;
const deleteUserImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const noImageString = null;
    try {
        yield s3.deleteObject(usuario.userImage, 'USER_IMAGE');
        const newUserData = { userId: usuario.userId, userImage: noImageString };
        const response = yield userDbProcedure.updateUserDataProcedure(newUserData);
        res.status(200).json({
            success: true,
            msg: "User image deleted successfulled",
            response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error al eliminar la foto de perfil, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
});
exports.deleteUserImage = deleteUserImage;
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario } = req.body;
    const { userPassword } = usuario, user = __rest(usuario, ["userPassword"]);
    try {
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Status Checked - Username: ${usuario.userUsername}`);
        res.status(200).json({
            success: true,
            msg: "Token verificado",
            data: user
        });
    }
    catch (error) {
        console.error(error);
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
exports.userInfo = userInfo;
const updateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organization_city, organization_name, organization_email, organization_address, organization_license, organization_zip_code, organization_street_name, organization_license_aproval_date, organization_license_expiration_date, } = req.body;
        const data = {
            organization_city,
            organization_name,
            organization_email,
            organization_address,
            organization_license,
            organization_zip_code,
            organization_street_name,
            organization_license_aproval_date,
            organization_license_expiration_date,
        };
        const response = yield organizationDbProcedures.updateOrganizationInfo(data);
        res.status(200).json({
            success: true,
            msg: response
        });
    }
    catch (error) {
        console.error(error);
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
exports.updateOrganization = updateOrganization;
//# sourceMappingURL=auth_controller.js.map