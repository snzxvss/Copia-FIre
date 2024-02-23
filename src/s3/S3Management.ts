import { s3Client } from './S3Client';
import LudyConsole from '../utils/LudyConsole';
import { configs } from '../config';

const path = require('path');
let ludyConsole: LudyConsole = new LudyConsole();
let requestData: any = {};

let isBucketName: string;
switch (configs.env) {
    case "DEV":
        isBucketName = configs.bucketImboxDev
        break;
    case "QA":
        isBucketName = configs.bucketImboxQA
        break;
    case "PROD":
        isBucketName = configs.bucketImboxProd
        break;
    default:
        isBucketName = configs.bucketImboxDev
        break;
}

export class S3Management {

    private bucket = isBucketName;
    // private folder = "database";


    /**
     * Metodo que se encarga de obtener el objeto de s3
     * @author Miguel Garcia Yudex
     * @param {string} key storageid del objeto a obtener
     */
    public downloadFile(key: string, folder: 'TASK_IMAGE' | 'USER_IMAGE') {
        return new Promise<Buffer>(async (resolve, reject) => {
            try {

                ludyConsole.start(`== SE INICIA DESCARGA DE ARCHIVO ${key} DE S3 ==`);

                //let keyQuemado = "triplea-f5133c80-1c43-4103-9de9-bf5d607703fb.xlsx"
                let slash: string = '/';
                let params: any = {
                    Bucket: this.bucket,
                    Key: `${folder}${slash}${key}`
                };

                let fileObject: any = await s3Client.getObject(params).promise();
                let extFile: string = fileObject?.ContentType.split('/')[1];
                let fileRaw: Buffer = fileObject?.Body;

                ludyConsole.info(`Extensión del archivo descargado en S3 ${extFile}`);

                if (extFile !== 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {

                    reject(new Error('La extensión del archivo debe ser XLSX'));
                }

                resolve(fileRaw);
                ludyConsole.end(`== SE FINALIZA LA DESCARGA DEL ARCHIVO XLSX ${key} DE S3 ==`);
            } catch (error: any) {
                let errorS3: string = `Message: Ha ocurrido un error al obtener el archivo, code: ${error.code}, statusCode: ${error.statusCode}`
                ludyConsole.error(errorS3);
                reject(errorS3);
            }
        })
    }

    /**
     * Metodo que se encarga de cargar objetos a S3
     * @author Miguel Garcia Yudex
     * @param {any} data contenido del archivo a subir, path y storageId
     */
    public uploadObject(data: any, folder: 'TASK_IMAGE' | 'USER_IMAGE') {
        return new Promise<any>(async (resolve, reject) => {
            let slash: string = '/';

            let params = {
                ACL: "public-read",
                Body: data.blob,
                Bucket: `${this.bucket}${slash}${folder}`,
                Key: data.storageId,
                ContentType: data.type,
                ContentLength: data.blob.byteLength
            }

            try {
                await s3Client.putObject(params).promise();
                ludyConsole.info(`== ARCHIVO CARGADO EN S3 CORRECTAMENTE ${data.storageId} ==`);
                requestData = {
                    storageId: data.storageId,
                    contentType: data.type,
                    fileSize: String(data.blob.byteLength),
                    path: `https://${this.bucket}.s3.amazonaws.com/${folder}/${data.storageId}`
                }
                resolve(requestData);

            } catch (error: any) {
                console.log(error);

                let errorS3: string = `Message: Ha ocurrido un error al cargar el archivo, code: ${error.code}, statusCode: ${error.statusCode} \n ${error}`;
                reject(errorS3);
            }
        })
    }

    /**
     * Metodo que se encarga de eliminar objetos de S3
     * @author Miguel Garcia Yudex
     * @param {string} storageId key del objeto para borrar en S3
     */
    public deleteObject(oldUrl: string, folder: 'TASK_IMAGE' | 'USER_IMAGE') {

        let slash: string = '/';
        const url: string = `https://${this.bucket}.s3.amazonaws.com/`
        const Key: string = oldUrl.replace(url, '')

        return new Promise<any>(async (resolve, reject) => {
            let slash: string = '/';

            let params = {
                Bucket: `${this.bucket}`,
                Key,
            }

            try {

                const objetctDeleted = await s3Client.deleteObject(params).promise();
                ludyConsole.info(`== ARCHIVO ELIMINADO EN S3 CORRECTAMENTE ${Key} ==`);
                resolve(objetctDeleted);

            } catch (error: any) {
                let errorS3: string = `Message: Ha ocurrido un error al borrar el archivo, code: ${error.code}, statusCode: ${error.statusCode}`;
                reject(errorS3);
            }
        })
    }

    public renameObject(oldUrl: string, newKey: string, folder: 'TASK_IMAGE' | 'USER_IMAGE') {
        return new Promise<any>(async (resolve, reject) => {
            let slash: string = '/';
            const url: string = `https://${this.bucket}.s3.amazonaws.com/`
            const key: string = oldUrl.replace(url, '')

            let params = {
                Bucket: this.bucket,
                CopySource: `${this.bucket}${slash}${key}`,
                Key: `${folder}${slash}${newKey}`,
                ACL: 'public-read'
            }

            try {

                // Copiar el objeto con la nueva clave
                await s3Client.copyObject(params, (err, data) => {
                    if (err) {
                        console.log(params);
                        console.error('Error al copiar el objeto:', err);
                    } else {
                        console.log('Objeto copiado con la nueva clave:', data);

                        // Opcional: Eliminar el objeto original
                        const deleteParams = {
                            Bucket: this.bucket,
                            Key: key
                        };

                        s3Client.deleteObject(deleteParams, (err, data) => {
                            if (err) {
                                console.log(deleteParams);

                                console.error('Error al eliminar el objeto original:', err);
                            } else {
                                console.log('Objeto original eliminado:', data);
                            }
                        });
                    }
                });

                resolve(`https://${this.bucket}.s3.amazonaws.com/${params.Key}`);
            } catch (error: any) {
                let errorS3: string = `Message: Ha ocurrido un error al borrar el archivo, code: ${error.code}, statusCode: ${error.statusCode}`;
                reject(errorS3);
            }
        })
    }

    public getBucketData() {
        return new Promise<any>(async (resolve, reject) => {
            try {
                s3Client.listObjects({ Bucket: this.bucket }, (err, data: any) => {
                    if (err) {
                        console.log('Error al obtener el contenido del bucket:', err);
                    } else {
                        resolve(data.Contents);
                    }
                },)

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

            } catch (error: any) {
                let errorS3: string = `Message: Ha ocurrido un error al obtener los archivos, code: ${error.code}, statusCode: ${error.statusCode}`;
                reject(errorS3);
            }

        })
    }
}
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