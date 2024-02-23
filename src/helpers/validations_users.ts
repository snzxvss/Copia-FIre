import { Request, RequestHandler, Response } from "express";
import { UserDbProcedures } from "../db/procedures/user_procedures";
import { User } from '../interfaces/user_interface';

const userDbProcedures = new UserDbProcedures;
export const userExistByUsername: RequestHandler = async (req: Request, res: Response, next: Function) => {

    const { username } = req.body;

    try {
        const usuario = await userDbProcedures.getUserDataByUsernameProcedure(username);
        req.body.usuario = usuario;

        if (!usuario || usuario.userUsername !== username) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: `El usuario con username '${username}' no existe.`,
                        path: 'usuario'
                    },
                ],
            });
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

export const userExistByEmailCustom: any = async (email: string, { req }: { req: Request }) => {

    if (!email) throw new Error(`El email es obligatorio`);

    const usuario = await userDbProcedures.getUserDataByEmailProcedure(email)

    if (!usuario) throw new Error(`No existe un usuario con email ${email}`);

}

export const userExistByEmail: RequestHandler = async (req: Request, res: Response, next: Function) => {

    const { email } = req.body;

    try {
        const usuario = await userDbProcedures.getUserDataByEmailProcedure(email);

        req.body.usuario = usuario;

        if (!usuario || usuario.userEmail !== email) {
            return res.status(400).json({
                success: false,
                errors: [
                    {
                        msg: `No existe un usuario registrado con el correo ${email}`,
                        path: 'email',

                    },
                ],
            });
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

export const userIsActive: RequestHandler = async (req: Request, res: Response, next: Function) => {

    const usuario: User = req.body.usuario;

    try {
        if (!usuario.userState) {
            return res.status(403).json({
                success: false,
                errors: [
                    {
                        msg: 'Usuario inactivo, habla con el administrador',
                        path: 'usuario'
                    },
                ],
            });
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

export const userIsAgent: RequestHandler = async (req: Request, res: Response, next: Function) => {
    try {

        const { isMobile } = req.body;
        const usuario: User = req.body.usuario;

        if (isMobile === true && usuario.agentCofNumber == null) {
            return res.status(403).json({
                success: false,
                errors: [
                    {
                        msg: 'Usuario no es agente, habla con el administrador',
                        path: 'usuario'
                    },
                ],
            });
        } else {
            next();
        }
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

export const isValidUserId: any = async (id: number, { req }: { req: Request }) => {
    const isValidUserId = await userDbProcedures.getUsersDataByIdsProcedure(id);

    req.body.user = isValidUserId

    if (!id) throw new Error('El userId es obligatorio');
    if (!isValidUserId) throw new Error('Ingrese una id de usuario válida');
    if (Array.isArray(id)) throw new Error('Solo se permiten valores numericos');
}

export const isUniqueUsername: any = async (username: string, { req }: { req: Request }) => {
    if (!username) throw new Error(`El username es obligatorio`)
    const { user }: { user: User } = req.body
    const isUniqueUsername = await userDbProcedures.getUserDataByUsernameProcedure(username)

    if (isUniqueUsername && (user.userUsername != isUniqueUsername.userUsername)) throw new Error('El nombre de usuario ya está en uso')
}

export const isUniqueEmail: any = async (email: string, { req }: { req: Request }) => {
    if (!email) throw new Error(`'El email es obligatorio`);
    const { user }: { user: User } = req.body
    
    const isUniqueEmail = await userDbProcedures.getUserDataByEmailProcedure(email)


    if (isUniqueEmail && (user.userEmail != isUniqueEmail.userEmail)) throw new Error('El Email ya está en uso')
}

export const userHasImage: any = (usuario: User, { req }: { req: Request }) => usuario.userImage != "No-Url-user"

export const userIsActiveCustom: any = async (user: User) => {
    if (!user.userState) {

        throw new Error(`El usuario ${user.userUsername} se encuntra inactivo`)
    }
}
export const userIsInctiveCustom: any = async (user: User) => {
    if (user.userState) {

        throw new Error(`El usuario ${user.userUsername} se encuntra activo`)
    }
}
