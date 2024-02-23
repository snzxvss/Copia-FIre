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
exports.EmailService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
'../config';
dotenv_1.default.config();
class EmailService {
    constructor() {
        this.gmailCredentials = {
            'service': 'gmail',
            'type': 'OAuth2',
            'sender': process.env.ACCOUNT,
            'clientId': process.env.ID_CLIENT,
            'clientSecret': process.env.SECRET_CLIENT,
            'refreshToken': process.env.REFRESH_TOKEN,
            'recoveryLink': process.env.RECOVERY_LINK
        };
    }
    sendRecoveryEmailByGmail(target, JWToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sender, clientId, clientSecret, refreshToken, recoveryLink } = config_1.gmailConfig;
            const authClient = new googleapis_1.google.auth.OAuth2(clientId, clientSecret);
            authClient.setCredentials({ refresh_token: refreshToken });
            try {
                const { token } = yield authClient.getAccessToken();
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        type: 'OAuth2',
                        user: sender,
                        clientId,
                        clientSecret,
                        refreshToken,
                        accessToken: token,
                    },
                });
                let html = fs_1.default.readFileSync('src/email/user_created.html', { encoding: 'utf-8' });
                html = html.replace('ENLACE A REEMPLAZAR', recoveryLink + JWToken);
                const info = yield transporter.sendMail({
                    from: sender,
                    to: target,
                    subject: 'Alba Recovery Password',
                    html,
                });
                return {
                    status: 200,
                    success: true,
                    msg: `Correo de recuperación enviado correctamente a ${target}`
                };
            }
            catch (error) {
                console.log(error);
                return {
                    status: 500,
                    success: false,
                    msg: `Error al enviar correo de recuperación a ${target}`
                };
            }
        });
    }
    sendRecoveryEmail(target, JWToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const { HOSTEMAIL, PORTEMAIL, USEREMAIL, PASSWORDEMAIL, SENDEMAIL, RECOVERYLINK } = config_1.emailConfig;
            try {
                let html = fs_1.default.readFileSync('src/email/recovery_password.html', { encoding: 'utf-8' });
                html = html.replace('|ENLACE A REEMPLAZAR|', RECOVERYLINK + JWToken);
                const transporter = nodemailer_1.default.createTransport({
                    host: HOSTEMAIL,
                    port: PORTEMAIL,
                    secure: PORTEMAIL == 465 ? true : false,
                    auth: {
                        user: USEREMAIL,
                        pass: PASSWORDEMAIL
                    },
                });
                // const dataSend = {
                //   from: SENDEMAIL,
                //   to: '202331ed@gmail.com',
                //   subject: 'Subject',
                //   html: '<h1>Sendmail</h1>'
                // }
                const info = yield transporter.sendMail({
                    from: SENDEMAIL,
                    to: target,
                    subject: 'Alba Recovery Password',
                    html,
                });
                return {
                    status: 200,
                    success: true,
                    msg: `Correo de recuperación enviado correctamente a ${target}`
                };
            }
            catch (error) {
                console.log('Error al enviar el correo: ', error);
                return {
                    status: 500,
                    success: false,
                    msg: 'Error al enviar el correo.'
                };
            }
        });
    }
    sendUserCreatedEmail(target, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { HOSTEMAIL, PORTEMAIL, USEREMAIL, PASSWORDEMAIL, SENDEMAIL, RECOVERYLINK } = config_1.emailConfig;
            try {
                let html = fs_1.default.readFileSync('src/email/user_created.html', { encoding: 'utf-8' });
                html = html.replace('|USERNAME|', userData.username);
                html = html.replace('|PASSWORD|', userData.password);
                const transporter = nodemailer_1.default.createTransport({
                    host: HOSTEMAIL,
                    port: PORTEMAIL,
                    secure: PORTEMAIL == 465 ? true : false,
                    auth: {
                        user: USEREMAIL,
                        pass: PASSWORDEMAIL
                    },
                });
                // const dataSend = {
                //   from: SENDEMAIL,
                //   to: '202331ed@gmail.com',
                //   subject: 'Subject',
                //   html: '<h1>Sendmail</h1>'
                // }
                const info = yield transporter.sendMail({
                    from: SENDEMAIL,
                    to: target,
                    subject: 'Alba User Details',
                    html,
                });
                return {
                    status: 200,
                    success: true,
                    msg: `Usuario creado correctamente ${target}`
                };
            }
            catch (error) {
                console.log('Error al enviar el correo: ', error);
                return {
                    status: 500,
                    success: false,
                    msg: 'Error al enviar el correo.'
                };
            }
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email_service.js.map