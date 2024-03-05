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
exports.UserDbProcedures = void 0;
const connection_1 = __importDefault(require("../connection"));
class UserDbProcedures {
    constructor() {
        this.db = connection_1.default;
    }
    createUserProcedure(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateUser(:newUserData)', {
                replacements: {
                    newUserData: JSON.stringify(newUserData) || JSON.stringify({})
                }
            });
            return { response: response.response, userId: response.new_user_id };
        });
    }
    getUserDataByUsernameProcedure(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield this.db.query('CALL GetUserDataByUsername(:username)', {
                replacements: { username }
            });
            if (user.usuario) {
                user.usuario.userPermissions.auditLogPermission == true ? user.usuario.userPermissions.auditLogPermission = true : user.usuario.userPermissions.auditLogPermission = false;
                user.usuario.userPermissions.clientPermission == true ? user.usuario.userPermissions.clientPermission = true : user.usuario.userPermissions.clientPermission = false;
                user.usuario.userPermissions.organizationPermission == true ? user.usuario.userPermissions.organizationPermission = true : user.usuario.userPermissions.organizationPermission = false;
                user.usuario.userPermissions.reportTaskPermission == true ? user.usuario.userPermissions.reportTaskPermission = true : user.usuario.userPermissions.reportTaskPermission = false;
                user.usuario.userPermissions.taskPermission == true ? user.usuario.userPermissions.taskPermission = true : user.usuario.userPermissions.taskPermission = false;
                user.usuario.userPermissions.userPermission == true ? user.usuario.userPermissions.userPermission = true : user.usuario.userPermissions.userPermission = false;
                user.usuario.userRequirePasswordChange == true ? user.usuario.userRequirePasswordChange = true : user.usuario.userRequirePasswordChange = false;
                user.usuario.userState == true ? user.usuario.userState = true : user.usuario.userState = false;
            }
            return user.usuario;
        });
    }
    getUserDataByEmailProcedure(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield this.db.query('CALL GetUserDataByEmail(:email)', {
                replacements: { email }
            });
            if (user.usuario) {
                user.usuario.userPermissions.auditLogPermission == true ? user.usuario.userPermissions.auditLogPermission = true : user.usuario.userPermissions.auditLogPermission = false;
                user.usuario.userPermissions.clientPermission == true ? user.usuario.userPermissions.clientPermission = true : user.usuario.userPermissions.clientPermission = false;
                user.usuario.userPermissions.organizationPermission == true ? user.usuario.userPermissions.organizationPermission = true : user.usuario.userPermissions.organizationPermission = false;
                user.usuario.userPermissions.reportTaskPermission == true ? user.usuario.userPermissions.reportTaskPermission = true : user.usuario.userPermissions.reportTaskPermission = false;
                user.usuario.userPermissions.taskPermission == true ? user.usuario.userPermissions.taskPermission = true : user.usuario.userPermissions.taskPermission = false;
                user.usuario.userPermissions.userPermission == true ? user.usuario.userPermissions.userPermission = true : user.usuario.userPermissions.userPermission = false;
                user.usuario.userRequirePasswordChange == true ? user.usuario.userRequirePasswordChange = true : user.usuario.userRequirePasswordChange = false;
                user.usuario.userState == true ? user.usuario.userState = true : user.usuario.userState = false;
            }
            return user.usuario;
        });
    }
    getUsersDataProcedure(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield this.db.query('CALL GetUsersData(:filter)', {
                replacements: {
                    filter: JSON.stringify(filter) || JSON.stringify({})
                }
            });
            return user.users;
        });
    }
    getUsersDataByIdsProcedure(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const isArray = Array.isArray(ids);
            const arrayOfIds = [];
            if (!isArray) {
                arrayOfIds.push(ids);
            }
            else {
                arrayOfIds.push(...ids);
            }
            const [user] = yield this.db.query('CALL GetUsersDataByIds(:ids)', {
                replacements: {
                    ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
                }
            });
            if (user.users) {
                user.users.forEach((user) => {
                    user.userPermissions.auditLogPermission == true ? user.userPermissions.auditLogPermission = true : user.userPermissions.auditLogPermission = false;
                    user.userPermissions.clientPermission == true ? user.userPermissions.clientPermission = true : user.userPermissions.clientPermission = false;
                    user.userPermissions.organizationPermission == true ? user.userPermissions.organizationPermission = true : user.userPermissions.organizationPermission = false;
                    user.userPermissions.reportTaskPermission == true ? user.userPermissions.reportTaskPermission = true : user.userPermissions.reportTaskPermission = false;
                    user.userPermissions.taskPermission == true ? user.userPermissions.taskPermission = true : user.userPermissions.taskPermission = false;
                    user.userPermissions.userPermission == true ? user.userPermissions.userPermission = true : user.userPermissions.userPermission = false;
                    user.userRequirePasswordChange == true ? user.userRequirePasswordChange = true : user.userRequirePasswordChange = false;
                    user.userState == true ? user.userState = true : user.userState = false;
                });
            }
            if (user.users)
                user.users = user.users.length == 1 ? user.users[0] : user.users;
            return user.users;
        });
    }
    updateUserPasswordProcedure(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateUserPassword(:email, :password)', {
                replacements: {
                    email,
                    password
                }
            });
            return response.response;
        });
    }
    updateUserDataProcedure(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateUserData(:newUserData)', {
                replacements: {
                    newUserData: JSON.stringify(newUserData) || JSON.stringify({})
                }
            });
            return response.response;
        });
    }
    alternateUserProcedure(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL AlternateUser(:userId)', {
                replacements: {
                    userId: JSON.stringify(userId) || JSON.stringify({})
                }
            });
            return response.response;
        });
    }
    GetUsersDataToReport(jsonFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { startDate, finalDate, searchKey } = jsonFilter;
            const [users] = yield this.db.query('CALL GetUsersDataToReport(:jsonFilter)', {
                replacements: {
                    jsonFilter: JSON.stringify({ startDate, finalDate, searchKey })
                }
            });
            return users;
        });
    }
}
exports.UserDbProcedures = UserDbProcedures;
//# sourceMappingURL=user_procedures.js.map