"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const swaggerDefinition_1 = __importDefault(require("./swaggerDefinition"));
const swaggerOptions = {
    swaggerDefinition: swaggerDefinition_1.default,
    apis: [
        path_1.default.join(__dirname, './routes/*.js'),
    ]
};
// console.log(path.join(__dirname, '../../routes/*.ts'));
// const swaggerOptions = {
//     definition: {
//       openapi: '3.0.0',
//       info: {
//         title: 'Hello World',
//         version: '1.0.0',
//       },
//     },
//     apis: ['./src/routes/*.routes.ts'], // files containing annotations as above
//   };
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map