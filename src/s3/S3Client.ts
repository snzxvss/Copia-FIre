import AWS from 'aws-sdk';
import { configs } from '../config';

const REGION = "us-east-1"; //Virginia del norte

AWS.config.update({

    accessKeyId: configs.accessKeyId,
    secretAccessKey: configs.secretAccessKey,
    region: REGION,
    correctClockSkew: true

});

const s3Client = new AWS.S3();



// s3Client.listBuckets((err, data: any) => {
//     data.Buckets.forEach((bucket: any) => {

//         if (bucket.Name == 'fire-control-2') {
//             console.log(bucket);
//             s3Client.listObjects({ Bucket: bucket.Name }, (err, data: any) => {
//                 if (err) {
//                     console.log('Error al obtener el contenido del bucket:', err);
//                 } else {
//                     console.log(`Contenido del bucket "firecontrol":`);
//                     data.Contents.forEach((item: any) => {
//                         console.log(item.Key);
//                         console.log(item);

//                     });
//                 }
//             })


//             s3Client.deleteObject({ Bucket: bucket.Name, Key: "USER_IMAGE/USERBYID-1001-USER_IMAGE.png" }, function (err, data) {
//                 if (err) {
//                     console.log("Error al eliminar el objeto:", err);
//                 } else {
//                     console.log("Objeto eliminado con éxito");
//                 }
//             });


//         }
//     });
// })



// const params = {
//     Bucket: 'fire-control-2',
//     Key:'database/key123456'
// }
// const a = async ()=>{

//     const url = s3Client.getSignedUrl('getObject', params)
//     console.log(url);
// }

// a()

export { s3Client };
