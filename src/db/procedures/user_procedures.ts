import db from "../connection";
import { User } from '../../interfaces/user_interface';

export class UserDbProcedures {
    private db: typeof db;

    constructor() {
        this.db = db;
    }

    public async createUserProcedure(newUserData: object) {
        const [response] = await this.db.query('CALL CreateUser(:newUserData)', {
            replacements: {
                newUserData: JSON.stringify(newUserData) || JSON.stringify({})
            }
        }) as { response: string, new_user_id: number }[]

        return { response: response.response, userId: response.new_user_id };
    }

    public async getUserDataByUsernameProcedure(username: string): Promise<User> {
        const [user] = await this.db.query('CALL GetUserDataByUsername(:username)', {
            replacements: { username }
        }) as { usuario: User }[];

        if (user.usuario) {

            user.usuario.userPermissions.auditLogPermission == true ? user.usuario.userPermissions.auditLogPermission = true : user.usuario.userPermissions.auditLogPermission = false;
            user.usuario.userPermissions.clientPermission == true ? user.usuario.userPermissions.clientPermission = true : user.usuario.userPermissions.clientPermission = false;
            user.usuario.userPermissions.organizationPermission == true ? user.usuario.userPermissions.organizationPermission = true : user.usuario.userPermissions.organizationPermission = false;
            user.usuario.userPermissions.reportTaskPermission == true ? user.usuario.userPermissions.reportTaskPermission = true : user.usuario.userPermissions.reportTaskPermission = false;
            user.usuario.userPermissions.taskPermission == true ? user.usuario.userPermissions.taskPermission = true : user.usuario.userPermissions.taskPermission = false;
            user.usuario.userPermissions.userPermission == true ? user.usuario.userPermissions.userPermission = true : user.usuario.userPermissions.userPermission = false;
            user.usuario.userRequirePasswordChange == true ? user.usuario.userRequirePasswordChange = true : user.usuario.userRequirePasswordChange = false
            user.usuario.userState == true ? user.usuario.userState = true : user.usuario.userState = false

        }

        return user.usuario;
    }

    public async getUserDataByEmailProcedure(email: string): Promise<User> {


        const [user] = await this.db.query('CALL GetUserDataByEmail(:email)', {
            replacements: { email }
        }) as { usuario: User }[];

        if (user.usuario) {

            user.usuario.userPermissions.auditLogPermission == true ? user.usuario.userPermissions.auditLogPermission = true : user.usuario.userPermissions.auditLogPermission = false;
            user.usuario.userPermissions.clientPermission == true ? user.usuario.userPermissions.clientPermission = true : user.usuario.userPermissions.clientPermission = false;
            user.usuario.userPermissions.organizationPermission == true ? user.usuario.userPermissions.organizationPermission = true : user.usuario.userPermissions.organizationPermission = false;
            user.usuario.userPermissions.reportTaskPermission == true ? user.usuario.userPermissions.reportTaskPermission = true : user.usuario.userPermissions.reportTaskPermission = false;
            user.usuario.userPermissions.taskPermission == true ? user.usuario.userPermissions.taskPermission = true : user.usuario.userPermissions.taskPermission = false;
            user.usuario.userPermissions.userPermission == true ? user.usuario.userPermissions.userPermission = true : user.usuario.userPermissions.userPermission = false;
            user.usuario.userRequirePasswordChange == true ? user.usuario.userRequirePasswordChange = true : user.usuario.userRequirePasswordChange = false
            user.usuario.userState == true ? user.usuario.userState = true : user.usuario.userState = false

        }        

        return user.usuario;
    }

    public async getUsersDataProcedure(filter?: { searchKey: any, finalDate: any, startDate: any }): Promise<Array<User>> {
        const [user] = await this.db.query('CALL GetUsersData(:filter)', {
            replacements: {
                filter: JSON.stringify(filter) || JSON.stringify({})
            }
        }) as { users: Array<User> }[];

        return user.users;
    }

    public async getUsersDataByIdsProcedure(ids: Array<number> | number): Promise<User> {

        const isArray = Array.isArray(ids)
        const arrayOfIds = [];

        if (!isArray) {
            arrayOfIds.push(ids)
        } else { arrayOfIds.push(...ids) }

        const [user]: any = await this.db.query('CALL GetUsersDataByIds(:ids)', {
            replacements: {
                ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
            }
        }) as { users: Array<User> }[];

        if (user.users) {
            user.users.forEach((user: User) => {
                user.userPermissions.auditLogPermission == true ? user.userPermissions.auditLogPermission = true : user.userPermissions.auditLogPermission = false;
                user.userPermissions.clientPermission == true ? user.userPermissions.clientPermission = true : user.userPermissions.clientPermission = false;
                user.userPermissions.organizationPermission == true ? user.userPermissions.organizationPermission = true : user.userPermissions.organizationPermission = false;
                user.userPermissions.reportTaskPermission == true ? user.userPermissions.reportTaskPermission = true : user.userPermissions.reportTaskPermission = false;
                user.userPermissions.taskPermission == true ? user.userPermissions.taskPermission = true : user.userPermissions.taskPermission = false;
                user.userPermissions.userPermission == true ? user.userPermissions.userPermission = true : user.userPermissions.userPermission = false;
                user.userRequirePasswordChange == true ? user.userRequirePasswordChange = true : user.userRequirePasswordChange = false
                user.userState == true ? user.userState = true : user.userState = false
            })
        }

        if (user.users) user.users = user.users.length == 1 ? user.users[0] : user.users;
        return user.users;
    }

    public async updateUserPasswordProcedure(email: string, password: string): Promise<String> {
        const [response] = await this.db.query('CALL UpdateUserPassword(:email, :password)', {
            replacements: {
                email,
                password
            }
        }) as { response: string }[]

        return response.response;
    }

    public async updateUserDataProcedure(newUserData: object): Promise<String> {
        const [response] = await this.db.query('CALL UpdateUserData(:newUserData)', {
            replacements: {
                newUserData: JSON.stringify(newUserData) || JSON.stringify({})
            }
        }) as { response: string }[];

        return response.response;
    }

    public async alternateUserProcedure(userId: { userId: number }): Promise<String> {
        const [response] = await this.db.query('CALL AlternateUser(:userId)', {
            replacements: {
                userId: JSON.stringify(userId) || JSON.stringify({})
            }
        }) as { response: string }[];



        return response.response
    }
}