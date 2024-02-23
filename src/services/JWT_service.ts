import jwt from "jsonwebtoken";
import env from 'dotenv'
import { ResponseInterface } from "../interfaces/response_interface";
import moment from "moment";
env.config();

export class JWTService {
    private tokenType: string = '';

    public generateJWT(playload: any, type: 'ACCESS_TOKEN' | 'RECOVERY_TOKEN'): any {
        try {

            if (type === 'ACCESS_TOKEN') {
                this.tokenType = process.env.JWT_KEY_FOR_ACCESS_TOKEN!;
            } else if (type === 'RECOVERY_TOKEN') {
                this.tokenType = process.env.JWT_KEY_FOR_RECOVERY_TOKEN!;
            }

            if (type == 'ACCESS_TOKEN') {

                const accessToken = jwt.sign({ playload }, this.tokenType, {
                    // expiresIn: '30m',
                    algorithm: 'HS256'
                });

                return { status: 200, msg: 'Loggin correcto', success: true, accessToken }!;

            } else if (type == 'RECOVERY_TOKEN') {

                const recoveryToken = jwt.sign({ playload }, this.tokenType, {
                    //! expiresIn: '10m',
                    algorithm: 'HS256'
                });

                return { status: 200, msg: 'Loggin correcto', success: true, recoveryToken };
            }
        } catch (error) {
            console.log(error);
            return { status: 500, msg: 'Error, comunicarse con el administrador', success: false };
        }
    }

    public validateAccessJWT(accessToken: any): any {
        try {
            const { playload }: any = jwt.verify(accessToken, process.env.JWT_KEY_FOR_ACCESS_TOKEN!)

            const response = { success: true, playload }

            return response
        } catch (error) {

            return { success: false }
        }
    }

    public validateRecoveryJWT(recoveryToken: any): any {
        try {
            const { playload }: any = jwt.verify(recoveryToken, process.env.JWT_KEY_FOR_RECOVERY_TOKEN!)

            const response = { success: true, playload }
            return response
        } catch (error) {

            const response: ResponseInterface = { status: 400, success: false, msg: 'Token invalido' }
            return response;
        }
    }
}
