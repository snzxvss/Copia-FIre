import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from '../interfaces/user_interface';
import { EmailService } from "../services/email_service";
import { ResponseInterface } from "../interfaces/response_interface";
import { JWTService } from "../services/JWT_service";
import { UserDbProcedures } from "../db/procedures/user_procedures";
import { S3Management } from "../s3/S3Management";
import fs from 'fs'
import { Data } from "../interfaces/s3_data_interface";
import moment from "moment";
import { OrganizationDbProcedures } from "../db/procedures/organization_procedures";

const userDbProcedure = new UserDbProcedures;
const organizationDbProcedures = new OrganizationDbProcedures
const tokenService = new JWTService;
const emailService = new EmailService;
const s3 = new S3Management()

export const authUser = async (req: Request, res: Response) => {
    const { username, password, usuario } = req.body;
    const { userPassword, ...user }: User = usuario;

    try {

        const hashed = bcrypt.hashSync(password, 10);
        const equal = bcrypt.compareSync(password, userPassword!);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");

        if (equal) {

            const { status, success, msg, accessToken }: ResponseInterface = tokenService.generateJWT(user.userId, 'ACCESS_TOKEN');
            console.log(`${fechaFormateada} - Loggin correcto - Username: ${username}`);

            return res.status(status).json({
                success,
                msg,
                accessToken,
                data: user,
            });

        } else {

            console.log(`${fechaFormateada} - Contraseña incorrecta - username: ${username}`);

            return res.status(401).json({
                success: false,
                errors: [
                    {
                        msg: 'La contraseña es incorrecta',
                        path: 'password'
                    }
                ],
                hashed
            });
        }

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
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {

        const { recoveryToken } = tokenService.generateJWT(email, 'RECOVERY_TOKEN');

        // const { status, success, msg }: ResponseInterface = await emailService.sendRecoveryEmailByGmail(email, recoveryToken);
        const { status, success, msg }: ResponseInterface = await emailService.sendRecoveryEmail(email, recoveryToken)
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        success == true ? console.log(`${fechaFormateada} - Recovery token enviado a ${email}`) : console.log(`${fechaFormateada} - Error al enviar el Recovery Token a ${email}`);
        // console.log(success);

        return res.status(status).json({
            success,
            msg,
            recoveryToken
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
};

export const updatePassword = async (req: Request, res: Response) => {
    try {

        const { oldPassword, newPassword, tokenType, usuario } = req.body;
        const { userPassword, ...user }: User = usuario
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

        if (tokenType === 'recoveryToken') {

            const response = await userDbProcedure.updateUserPasswordProcedure(user.userEmail, hashedNewPassword)
            const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
            console.log(`${fechaFormateada} - Contraseña del usuario ${user.userUsername} actualizada correctamente`);

            return res.status(200).json({
                success: true,
                msg: response
            })

        } else if (tokenType === 'accessToken' && user.userRequirePasswordChange == false) {

            const hashedOldPassword = bcrypt.hashSync(oldPassword, 10);

            const equal = bcrypt.compareSync(oldPassword, userPassword!);


            if (equal) {

                const response = await userDbProcedure.updateUserPasswordProcedure(user.userEmail, hashedNewPassword)

                return res.status(200).json({
                    success: true,
                    msg: response
                });

            } else {
                return res.status(401).json({
                    success: false,
                    msg: 'La contraseña actual no coincide',
                    errors: [
                        {
                            msg: 'La contraseña actual no coincide',
                            path: 'password'
                        }
                    ],
                });
            };
        } else if (tokenType === 'accessToken' && user.userRequirePasswordChange == true) {

            const response = await userDbProcedure.updateUserPasswordProcedure(user.userEmail, hashedNewPassword)


            return res.status(200).json({
                success: true,
                msg: response,
            });
        };

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

export const updateData = async (req: Request, res: Response) => {
    try {
        const { userLastName, userFirstName, stateId, userPhoneNumber,
            zipCode, streetName, addressBorough, cityId } = req.body;

        const { usuario, fileExt }: { usuario: User, fileExt: string } = req.body;

        let userImage

        if (req.files && req.files.profilePhoto) {

            const { profilePhoto }: any = req.files

            await profilePhoto.mv('./src/temp/profilePhoto.png');
            const dataFile: Buffer = fs.readFileSync('./src/temp/profilePhoto.png');

            const data: Data = {
                blob: dataFile,
                storageId: `USERBYID-${usuario.userId}-USER_IMAGE${fileExt}`,
                type: profilePhoto.mimetype
            };

            const dataUploaded = await s3.uploadObject(data, 'USER_IMAGE');

            userImage = dataUploaded.path
        }

        const newUserData = {
            userId: usuario.userId, userLastName, userFirstName, stateId, userImage,
            userPhoneNumber, zipCode, streetName, addressBorough, cityId
        };

        const response = await userDbProcedure.updateUserDataProcedure(newUserData);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        if (response) console.log(`${fechaFormateada} - User Updated - Username: ${usuario.userUsername}`);

        return res.status(200).json({
            success: true,
            msg: response,
            newUserData,
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
        });
    };
};

export const deleteUserImage = async (req: Request, res: Response) => {

    const { usuario }: { usuario: User } = req.body
    const noImageString = null

    try {

        await s3.deleteObject(usuario.userImage, 'USER_IMAGE');
        const newUserData = { userId: usuario.userId, userImage: noImageString };

        const response = await userDbProcedure.updateUserDataProcedure(newUserData);

        res.status(200).json({
            success: true,
            msg: "User image deleted successfulled",
            response
        })


    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error al eliminar la foto de perfil, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        })
    }
}

export const userInfo = async (req: Request, res: Response) => {

    const { usuario }: { usuario: User } = req.body
    const { userPassword, ...user } = usuario
    try {
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Status Checked - Username: ${usuario.userUsername}`);
        res.status(200).json({
            success: true,
            msg: "Token verificado",
            data: user

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

export const updateOrganization = async (req: Request, res: Response) => {

    try {
        const {
            organization_id,
            organization_city,
            organization_name,
            organization_email,
            organization_address,
            organization_license,
            organization_zip_code,
            organization_street_name,
            organization_license_aproval_date,
            organization_license_expiration_date,
        } = req.body

        const data = {
            organization_id,
            organization_city,
            organization_name,
            organization_email,
            organization_address,
            organization_license,
            organization_zip_code,
            organization_street_name,
            organization_license_aproval_date,
            organization_license_expiration_date,
        }

        const response = await organizationDbProcedures.updateOrganizationInfo(data)

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
        })
    }

}