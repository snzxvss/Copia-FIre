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
exports.usersPdfReport = exports.exportUsersToPDF = exports.usersXlsxReport = exports.exportUsersToXLSX = exports.alternateUser = exports.createUser = exports.updateUser = exports.getUserInfo = void 0;
const S3Management_1 = require("../s3/S3Management");
const user_procedures_1 = require("../db/procedures/user_procedures");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const email_service_1 = require("../services/email_service");
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
const s3 = new S3Management_1.S3Management;
const userDbProcedures = new user_procedures_1.UserDbProcedures;
const emailService = new email_service_1.EmailService;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const data = yield userDbProcedures.getUsersDataByIdsProcedure(userId);
        const { userPassword } = data, user = __rest(data, ["userPassword"]);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - usuario con id ${userId} obtenido correctamente.`);
        res.status(200).json({
            success: true,
            msg: `Data obtenida correctamente`,
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
exports.getUserInfo = getUserInfo;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userEmail, userUsername, userLastName, userFirstName, agentCofNumber, userPhoneNumber, zipCode, streetName, addressBorough, stateId, cityId, accommodationType, taskPermission, userPermission, clientPermission, auditLogPermission, reportTaskPermission, organizationPermission } = req.body;
        const { usuario, fileExt } = req.body;
        let userImage;
        if (req.files && req.files.profilePhoto) {
            const { profilePhoto } = req.files;
            yield profilePhoto.mv('./src/temp/profilePhoto.png');
            const dataFile = fs_1.default.readFileSync('./src/temp/profilePhoto.png');
            const data = {
                blob: dataFile,
                storageId: `USERBYID-${userId}-USER_IMAGE${fileExt}`,
                type: profilePhoto.mimetype
            };
            const data_uploaded = yield s3.uploadObject(data, 'USER_IMAGE');
            userImage = data_uploaded.path;
        }
        const newUserData = {
            userId, userEmail, addressBorough, userUsername, userLastName, userFirstName,
            zipCode, streetName, userPhoneNumber, agentCofNumber, stateId, cityId,
            accommodationType, userImage, userPermission, clientPermission, auditLogPermission,
            reportTaskPermission, organizationPermission, taskPermission,
        };
        const response = yield userDbProcedures.updateUserDataProcedure(newUserData);
        return res.status(200).json({
            success: true,
            msg: response,
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
exports.updateUser = updateUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userUsername, userLastName, userFirstName, stateId, userPhoneNumber, agentCofNumber, zipCode, streetName, addressBorough, cityId, accommodationType, auditLogPermission, reportTaskPermission, organizationPermission, userPermission, taskPermission, clientPermission, countryId, userState } = req.body;
        const { fileExt } = req.body;
        let userImage = undefined;
        if (req.files && req.files.profilePhoto) {
            const { profilePhoto } = req.files;
            yield profilePhoto.mv('./src/temp/profilePhoto.png');
            const dataFile = fs_1.default.readFileSync('./src/temp/profilePhoto.png');
            const data = {
                blob: dataFile,
                storageId: `TEMP`,
                type: profilePhoto.mimetype
            };
            const data_uploaded = yield s3.uploadObject(data, 'USER_IMAGE');
            userImage = data_uploaded.path;
        }
        const randomPassword = crypto_1.default.randomBytes(10).toString('hex');
        const hashedPassword = bcrypt_1.default.hashSync(randomPassword, 10);
        const userData = {
            userEmail, addressBorough, userPassword: hashedPassword, userUsername, userLastName,
            userState, userImage, userFirstName, zipCode, streetName, userPhoneNumber,
            agentCofNumber, userPermission, taskPermission, stateId,
            clientPermission, cityId, accommodationType, auditLogPermission,
            reportTaskPermission, organizationPermission, countryId,
        };
        const { response, userId } = yield userDbProcedures.createUserProcedure(userData);
        if (userImage != null && userImage.includes('TEMP')) {
            const newUrl = yield s3.renameObject(userImage, `USERBYID-${userId}-USER_IMAGE${fileExt}`, 'USER_IMAGE');
            const data = { userId, userImage: newUrl };
            yield userDbProcedures.updateUserDataProcedure(data);
            userData.userImage = newUrl;
        }
        ;
        const user = yield userDbProcedures.getUsersDataByIdsProcedure(userId);
        const { userPassword } = user, data = __rest(user, ["userPassword"]);
        const { msg, status, success } = yield emailService.sendUserCreatedEmail(userEmail, { username: userUsername, password: randomPassword });
        return res.status(status).json({
            success,
            msg: response,
            data
        });
        // res.status(200).json('Puerba de cambio') 
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
exports.createUser = createUser;
const alternateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const response = yield userDbProcedures.alternateUserProcedure({ userId });
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
    ;
});
exports.alternateUser = alternateUser;
const exportUsersToXLSX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/user/usersXlsxReport'
    });
});
exports.exportUsersToXLSX = exportUsersToXLSX;
const usersXlsxReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            console.log(`${fechaFormateada} - Users report .XLSX genereted successfully by user`);
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_USER_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        }
        ;
    });
});
exports.usersXlsxReport = usersXlsxReport;
const exportUsersToPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/user/usersPdfReport'
    });
});
exports.exportUsersToPDF = exportUsersToPDF;
const usersPdfReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' };
        let result = yield userDbProcedures.GetUsersDataToReport(data);
        console.log(result);
        let resultWithEmails = Object.assign(Object.assign({}, result), { emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ] });
        // Send 'result' to http://localhost:8080/client
        const postResponse = yield axios_1.default.post('http://localhost:8080/user', resultWithEmails);
        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = yield axios_1.default.get('http://localhost:8080/user/export-pdf', { responseType: 'arraybuffer' });
        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');
        console.log(postResponse.data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);
        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
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
exports.usersPdfReport = usersPdfReport;
//# sourceMappingURL=user_controller.js.map