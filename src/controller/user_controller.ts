import { Request, Response } from "express";
import { User } from "../interfaces/user_interface";
import { S3Management } from "../s3/S3Management";
import { UserDbProcedures } from "../db/procedures/user_procedures";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import fs from 'fs';
import { EmailService } from "../services/email_service";
import moment from "moment";
import { emails } from "../interfaces/email_interface";
import axios from "axios";

const s3 = new S3Management;
const userDbProcedures = new UserDbProcedures;
const emailService = new EmailService

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body
        const data = await userDbProcedures.getUsersDataByIdsProcedure(userId)
        const { userPassword, ...user } = data
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - usuario con id ${userId} obtenido correctamente.`);


        res.status(200).json({
            success: true,
            msg: `Data obtenida correctamente`,
            data: user
        })

    } catch (error) {
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
        })
    }
}
export const updateUser = async (req: Request, res: Response) => {

    try {

        const {
            userId, userEmail, userUsername, userLastName, userFirstName, agentCofNumber,
            userPhoneNumber, zipCode, streetName, addressBorough, stateId, cityId, accommodationType,
            taskPermission, userPermission, clientPermission, auditLogPermission, reportTaskPermission,
            organizationPermission } = req.body;


        const { usuario, fileExt }: { usuario: User, fileExt: string } = req.body;

        let userImage

        if (req.files && req.files.profilePhoto) {
            const { profilePhoto }: any = req.files

            await profilePhoto.mv('./src/temp/profilePhoto.png');
            const dataFile: Buffer = fs.readFileSync('./src/temp/profilePhoto.png');

            const data = {
                blob: dataFile,
                storageId: `USERBYID-${userId}-USER_IMAGE${fileExt}`,
                type: profilePhoto.mimetype
            };

            const data_uploaded = await s3.uploadObject(data, 'USER_IMAGE');

            userImage = data_uploaded.path
        }


        const newUserData = {
            userId, userEmail, addressBorough, userUsername, userLastName, userFirstName,
            zipCode, streetName, userPhoneNumber, agentCofNumber, stateId, cityId,
            accommodationType, userImage, userPermission, clientPermission, auditLogPermission,
            reportTaskPermission, organizationPermission, taskPermission,
        }

        const response = await userDbProcedures.updateUserDataProcedure(newUserData)

        return res.status(200).json({
            success: true,
            msg: response,

        });

    } catch (error) {
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
        })
    }

}
export const createUser = async (req: Request, res: Response) => {

    try {
        const { userEmail, userUsername, userLastName, userFirstName, stateId,
            userPhoneNumber, agentCofNumber, zipCode, streetName, addressBorough,
            cityId, accommodationType, auditLogPermission, reportTaskPermission,
            organizationPermission, userPermission, taskPermission, clientPermission,
            countryId, userState } = req.body;

        const { fileExt }: { usuario: User, fileExt: string } = req.body;

        let userImage: string | undefined = undefined

        if (req.files && req.files.profilePhoto) {

            const { profilePhoto }: any = req.files

            await profilePhoto.mv('./src/temp/profilePhoto.png');
            const dataFile: Buffer = fs.readFileSync('./src/temp/profilePhoto.png');

            const data = {
                blob: dataFile,
                storageId: `TEMP`,
                type: profilePhoto.mimetype
            };

            const data_uploaded = await s3.uploadObject(data, 'USER_IMAGE');

            userImage = data_uploaded.path
        }

        const randomPassword = crypto.randomBytes(10).toString('hex');
        const hashedPassword = bcrypt.hashSync(randomPassword, 10)

        const userData: any = {
            userEmail, addressBorough, userPassword: hashedPassword, userUsername, userLastName,
            userState, userImage, userFirstName, zipCode, streetName, userPhoneNumber,
            agentCofNumber, userPermission, taskPermission, stateId,
            clientPermission, cityId, accommodationType, auditLogPermission,
            reportTaskPermission, organizationPermission, countryId,
        };
        const { response, userId } = await userDbProcedures.createUserProcedure(userData);

        if (userImage != null && userImage.includes('TEMP')) {
            const newUrl = await s3.renameObject(userImage, `USERBYID-${userId}-USER_IMAGE${fileExt}`, 'USER_IMAGE');
            const data = { userId, userImage: newUrl };
            await userDbProcedures.updateUserDataProcedure(data);
            userData.userImage = newUrl;
        };

        const user = await userDbProcedures.getUsersDataByIdsProcedure(userId)
        const { userPassword, ...data } = user
        const { msg, status, success } = await emailService.sendUserCreatedEmail(userEmail, { username: userUsername, password: randomPassword })

        return res.status(status).json({
            success,
            msg: response,
            data
        });


        // res.status(200).json('Puerba de cambio') 

    } catch (error) {
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
    };
}
export const alternateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body

        const response = await userDbProcedures.alternateUserProcedure({ userId })

        res.status(200).json({
            success: true,
            msg: response
        })

    } catch (error) {
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
    };
}


export const exportUsersToXLSX = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/user/usersXlsxReport'
    })
};

export const usersXlsxReport = async (req: Request, res: Response) => {
    const { startDate, finalDate } = req.body;

    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        } else {
            console.log(`${fechaFormateada} - Users report .XLSX genereted successfully by user`);
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_USER_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        };
    });

};
export const exportUsersToPDF = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/user/usersPdfReport'
    })
};

export const usersPdfReport = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' }; 
        let result = await userDbProcedures.GetUsersDataToReport(data);
        console.log(result);

        interface UserWithEmails {
            emails: emails[];
        }
        
        let resultWithEmails: UserWithEmails = {
            ...result,
            emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ]
        };
    
        // Send 'result' to http://localhost:8080/client
        const postResponse = await axios.post('http://localhost:8080/user', resultWithEmails);

        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = await axios.get('http://localhost:8080/user/export-pdf', { responseType: 'arraybuffer' });

        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');

        console.log(postResponse.data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);

        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
    } catch (error) {
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
    };
};