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
exports.S3Management = void 0;
const S3Client_1 = require("./S3Client");
const LudyConsole_1 = __importDefault(require("../utils/LudyConsole"));
const config_1 = require("../config");
const path = require('path');
let ludyConsole = new LudyConsole_1.default();
let requestData = {};
let isBucketName;
switch (config_1.configs.env) {
    case "DEV":
        isBucketName = config_1.configs.bucketImboxDev;
        break;
    case "QA":
        isBucketName = config_1.configs.bucketImboxQA;
        break;
    case "PROD":
        isBucketName = config_1.configs.bucketImboxProd;
        break;
    default:
        isBucketName = config_1.configs.bucketImboxDev;
        break;
}
class S3Management {
    constructor() {
        this.bucket = isBucketName;
    }
    // private folder = "database";
    /**
     * Metodo que se encarga de obtener el objeto de s3
     * @author Miguel Garcia Yudex
     * @param {string} key storageid del objeto a obtener
     */
    downloadFile(key, folder) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                ludyConsole.start(`== SE INICIA DESCARGA DE ARCHIVO ${key} DE S3 ==`);
                //let keyQuemado = "triplea-f5133c80-1c43-4103-9de9-bf5d607703fb.xlsx"
                let slash = '/';
                let params = {
                    Bucket: this.bucket,
                    Key: `${folder}${slash}${key}`
                };
                let fileObject = yield S3Client_1.s3Client.getObject(params).promise();
                let extFile = fileObject === null || fileObject === void 0 ? void 0 : fileObject.ContentType.split('/')[1];
                let fileRaw = fileObject === null || fileObject === void 0 ? void 0 : fileObject.Body;
                ludyConsole.info(`Extensión del archivo descargado en S3 ${extFile}`);
                if (extFile !== 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    reject(new Error('La extensión del archivo debe ser XLSX'));
                }
                resolve(fileRaw);
                ludyConsole.end(`== SE FINALIZA LA DESCARGA DEL ARCHIVO XLSX ${key} DE S3 ==`);
            }
            catch (error) {
                let errorS3 = `Message: Ha ocurrido un error al obtener el archivo, code: ${error.code}, statusCode: ${error.statusCode}`;
                ludyConsole.error(errorS3);
                reject(errorS3);
            }
        }));
    }
    /**
     * Metodo que se encarga de cargar objetos a S3
     * @author Miguel Garcia Yudex
     * @param {any} data contenido del archivo a subir, path y storageId
     */
    uploadObject(data, folder) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let slash = '/';
            let params = {
                ACL: "public-read",
                Body: data.blob,
                Bucket: `${this.bucket}${slash}${folder}`,
                Key: data.storageId,
                ContentType: data.type,
                ContentLength: data.blob.byteLength
            };
            try {
                yield S3Client_1.s3Client.putObject(params).promise();
                ludyConsole.info(`== ARCHIVO CARGADO EN S3 CORRECTAMENTE ${data.storageId} ==`);
                requestData = {
                    storageId: data.storageId,
                    contentType: data.type,
                    fileSize: String(data.blob.byteLength),
                    path: `https://${this.bucket}.s3.amazonaws.com/${folder}/${data.storageId}`
                };
                resolve(requestData);
            }
            catch (error) {
                console.log(error);
                let errorS3 = `Message: Ha ocurrido un error al cargar el archivo, code: ${error.code}, statusCode: ${error.statusCode} \n ${error}`;
                reject(errorS3);
            }
        }));
    }
    /**
     * Metodo que se encarga de eliminar objetos de S3
     * @author Miguel Garcia Yudex
     * @param {string} storageId key del objeto para borrar en S3
     */
    deleteObject(oldUrl, folder) {
        let slash = '/';
        const url = `https://${this.bucket}.s3.amazonaws.com/`;
        const Key = oldUrl.replace(url, '');
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let slash = '/';
            let params = {
                Bucket: `${this.bucket}`,
                Key,
            };
            try {
                const objetctDeleted = yield S3Client_1.s3Client.deleteObject(params).promise();
                ludyConsole.info(`== ARCHIVO ELIMINADO EN S3 CORRECTAMENTE ${Key} ==`);
                resolve(objetctDeleted);
            }
            catch (error) {
                let errorS3 = `Message: Ha ocurrido un error al borrar el archivo, code: ${error.code}, statusCode: ${error.statusCode}`;
                reject(errorS3);
            }
        }));
    }
    renameObject(oldUrl, newKey, folder) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let slash = '/';
            const url = `https://${this.bucket}.s3.amazonaws.com/`;
            const key = oldUrl.replace(url, '');
            let params = {
                Bucket: this.bucket,
                CopySource: `${this.bucket}${slash}${key}`,
                Key: `${folder}${slash}${newKey}`,
                ACL: 'public-read'
            };
            try {
                // Copiar el objeto con la nueva clave
                yield S3Client_1.s3Client.copyObject(params, (err, data) => {
                    if (err) {
                        console.log(params);
                        console.error('Error al copiar el objeto:', err);
                    }
                    else {
                        console.log('Objeto copiado con la nueva clave:', data);
                        // Opcional: Eliminar el objeto original
                        const deleteParams = {
                            Bucket: this.bucket,
                            Key: key
                        };
                        S3Client_1.s3Client.deleteObject(deleteParams, (err, data) => {
                            if (err) {
                                console.log(deleteParams);
                                console.error('Error al eliminar el objeto original:', err);
                            }
                            else {
                                console.log('Objeto original eliminado:', data);
                            }
                        });
                    }
                });
                resolve(`https://${this.bucket}.s3.amazonaws.com/${params.Key}`);
            }
            catch (error) {
                let errorS3 = `Message: Ha ocurrido un error al borrar el archivo, code: ${error.code}, statusCode: ${error.statusCode}`;
                reject(errorS3);
            }
        }));
    }
    getBucketData() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                S3Client_1.s3Client.listObjects({ Bucket: this.bucket }, (err, data) => {
                    if (err) {
                        console.log('Error al obtener el contenido del bucket:', err);
                    }
                    else {
                        resolve(data.Contents);
                    }
                });
                // resolve( s3Client.getBucketCors({ Bucket: bucket }));
                // *METODO PARA AÑADOR LOS DOMINIOS DESDE LOS CUALES SE PUEDE ACCEDER POR TEMA DE CORS*
                /* s3Client.putBucketCors(
                    {
                        Bucket: 'NOMBRE_DE_TU_BUCKET',
                        CORSConfiguration: {
                            CORSRules: [
                                {
                                    AllowedOrigins: ['*'],
                                    AllowedMethods: ['GET'],
                                    MaxAgeSeconds: 3000,
                                    AllowedHeaders: ['*']
                                }
                            ]
                        }
                    },
                    (err, data) => {
                        if (err) {
                            console.log('Error al configurar CORS:', err);
                        } else {
                            console.log('Configuración CORS aplicada con éxito:', data);
                        }
                    }
                );
                    */
            }
            catch (error) {
                let errorS3 = `Message: Ha ocurrido un error al obtener los archivos, code: ${error.code}, statusCode: ${error.statusCode}`;
                reject(errorS3);
            }
        }));
    }
}
exports.S3Management = S3Management;
/*
const AWS = require('aws-sdk');
const fs = require('fs');

? Configurar las credenciales de AWS
AWS.config.update({
    accessKeyId: 'TU_ACCESS_KEY_ID',
    secretAccessKey: 'TU_SECRET_ACCESS_KEY'
});

? Crear un objeto S3
const s3 = new AWS.S3();

? Definir los parámetros del archivo
const params = {
    ACL: 'public-read', // Define el permiso de acceso al archivo (public-read)
    Body: fs.readFileSync('ruta/del/archivo/ejemplo.txt'), // Contenido del archivo
    Bucket: 'NOMBRE_DEL_BUCKET', // Nombre del bucket de S3
    Key: 'ejemplo.txt', // Nombre del archivo en S3
    ContentType: 'text/plain', // Tipo de contenido del archivo
    ContentLength: fs.statSync('ruta/del/archivo/ejemplo.txt').size // Tamaño del archivo
};

? Subir el archivo a S3
s3.putObject(params, function (err, data) {
    if (err) {
        console.log('Error al subir el archivo:', err);
    } else {
        console.log('Archivo subido exitosamente');
    }
});
*/ 
//# sourceMappingURL=S3Management.js.map