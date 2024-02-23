import swaggerJSDoc, { OAS3Definition, OAS3Options, Options } from "swagger-jsdoc";
import path from 'path'
import swaggerDefinition from './swaggerDefinition'
import * as a from '../../src/routes/auth.routes' 

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: [
        path.join(__dirname, './routes/*.js'),
    ]
}

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


export default swaggerJSDoc(swaggerOptions)





