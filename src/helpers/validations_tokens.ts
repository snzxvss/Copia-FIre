import { Request, RequestHandler, Response } from "express";
import env from 'dotenv';
import { JWTService } from "../services/JWT_service";
import { UserDbProcedures } from "../db/procedures/user_procedures";
env.config()

const tokenService = new JWTService;
const userDbProcedures = new UserDbProcedures

export const XORTokenType: RequestHandler = (req: Request, res: Response, next: Function) => {
    try {
        // const { recoveryToken } = req.query;
        const accessToken = req.header('accessToken');
        const { recoveryToken } = req.body;

        if (accessToken && recoveryToken) {

            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'Sólo se permite un tipo de token a la vez',
                        path: 'service',
                        value: {
                            accessToken,
                            recoveryToken
                        }
                    },
                ],
            })
        } else if (!accessToken && !recoveryToken) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'El token es obligatorio',
                        path: 'service'
                    },
                ],
            })
        }
        req.body.tokenType = (accessToken) ? 'accessToken' : 'recoveryToken'
        next()


    } catch (error) {
        console.log(error);

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

export const validateAccessToken: RequestHandler = async (req: Request, res: Response, next: Function) => {
    try {

        const accesToken: any = req.header('accessToken')
        const { tokenType } = req.body

        if (accesToken || tokenType === 'accessToken') {
            const { success, playload } = tokenService.validateAccessJWT(accesToken);
            const usuario = await userDbProcedures.getUsersDataByIdsProcedure(playload);

            if (!usuario) {
                return res.status(401).json({
                    success,
                    errors: [
                        {
                            msg: 'Error, Access Token invalido',
                            path: 'Access Token'
                        },
                    ],
                })
            }

            if (!success) {
                return res.status(401).json({
                    success,
                    errors: [
                        {
                            msg: 'Error, Access Token invalido',
                            path: 'Access Token'
                        },
                    ],
                })
            }

            req.body.email = usuario.userEmail
            req.body.usuario = usuario
            
        } else if (tokenType === "accessToken" || !tokenType) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'Error, Access Token es obligatorio',
                        path: 'Access Token'
                    },
                ],
            })
        }

        next()

    } catch (error) {
        console.log(error);

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

export const validateRecoveryToken: RequestHandler = (req: Request, res: Response, next: Function) => {

    try {

        // const recoveryToken = req.header('recoveryToken');
        const { tokenType, recoveryToken } = req.body
        if (recoveryToken || tokenType === 'recoveryToken') {
            const { success, playload: email } = tokenService.validateRecoveryJWT(recoveryToken)

            req.body.email = email;

            if (!success) {
                return res.status(400).json({
                    success,
                    errors: [
                        {
                            msg: 'Error, recovery Token invalido',
                            path: 'Recovery Token'
                        },
                    ],
                })
            }
        } else if (tokenType === 'recoveryToken' || !tokenType) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: 'Error, recovery Token es obligatorio',
                        path: 'Recovery Token'
                    },
                ],
            })
        }

        next()

    } catch (error) {
        console.log(error);

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
