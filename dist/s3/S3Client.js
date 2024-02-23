"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config");
const REGION = "us-east-1"; //Virginia del norte
aws_sdk_1.default.config.update({
    accessKeyId: config_1.configs.accessKeyId,
    secretAccessKey: config_1.configs.secretAccessKey,
    region: REGION,
    correctClockSkew: true
});
const s3Client = new aws_sdk_1.default.S3();
exports.s3Client = s3Client;
//# sourceMappingURL=S3Client.js.map