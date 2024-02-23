"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.emailConfig = exports.gmailConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.gmailConfig = {
    'sender': process.env.ACCOUNT,
    'clientId': process.env.ID_CLIENT,
    'clientSecret': process.env.SECRET_CLIENT,
    'refreshToken': process.env.REFRESH_TOKEN,
    'recoveryLink': process.env.RECOVERY_LINK
};
exports.emailConfig = {
    USEREMAIL: process.env.USEREMAIL,
    PASSWORDEMAIL: process.env.PASSWORDEMAIL,
    HOSTEMAIL: process.env.HOSTEMAIL,
    PORTEMAIL: process.env.PORTEMAIL,
    SENDEMAIL: process.env.SENDEMAIL,
    RECOVERYLINK: process.env.RECOVERY_LINK
};
exports.configs = {
    app_name: 'ALBA',
    accessKeyId: process.env.ACCESSKEYS3,
    secretAccessKey: process.env.SECRETKEYS3,
    env: process.env.S3ENV,
    bucketImboxQA: process.env.BUCKETNAMEQAS3,
    bucketImboxDev: process.env.BUCKETNAMEDEVS3,
    bucketImboxProd: process.env.BUCKETNAMEPRODS3,
};
//# sourceMappingURL=config.js.map