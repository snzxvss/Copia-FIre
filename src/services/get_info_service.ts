import { ResponseInterface } from "../interfaces/response_interface";
import { ClientDbProcedures } from "../db/procedures/client_procedures";
import { BuildingDbProcedures } from "../db/procedures/building_procedures";
import { LocationDbProcedures } from "../db/procedures/location_procedures";
import { OrganizationDbProcedures } from "../db/procedures/organization_procedures";
import { UserDbProcedures } from "../db/procedures/user_procedures";
import { TaskDbProcedures } from '../db/procedures/task_procedures';



const organizationDbProcedures = new OrganizationDbProcedures
const locationDbProcedures = new LocationDbProcedures
const clientDbProcedures = new ClientDbProcedures
const buildingDbProcedures = new BuildingDbProcedures
const userDbProcedures = new UserDbProcedures
const taskDbProcedures = new TaskDbProcedures
export class GetInfoService {

    public async getOrganizationInfo(): Promise<ResponseInterface> {
        try {
            const states = await organizationDbProcedures.getOrganizationInfo();
            return { status: 200, success: true, msg: 'Organización obtenida correctamente', data: states }
        } catch (error) {
            console.log({ error });
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }

    }

    public async getLocationStates(): Promise<ResponseInterface> {

        try {

            const states = await locationDbProcedures.getLocationStates();
            return { status: 200, success: true, msg: 'Estados obtenidos correctamente', data: states }

        } catch (error) {
            console.log({ error });
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }


    public async getLocationBorough(stateId: number): Promise<ResponseInterface> {

        try {

            const citys = await locationDbProcedures.getLocationCitys(stateId);

            if (citys) {
                return { status: 200, success: true, msg: 'Ciudades obtenidas correctamente', data: citys }
            } else {
                return { status: 400, success: false, msg: 'El stateID no corresponde a ningún estado', data: citys }
            }

        } catch (error) {
            console.log(error);
            return {
                status: 500,
                success: false,
                msg: `Error al obtener la informacion`
            };
        }
    }

    public async getClientsData(filters: { searchKey?: any, finalDate?: any, startDate?: any }): Promise<ResponseInterface> {

        try {
            const clients = await clientDbProcedures.getClientsDataProcedure(filters)
            

            return { status: 200, success: true, msg: `Clientes obtenidos correctamente`, data: clients };

        } catch (error) {
            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }

    public async getUsersData(filters: { searchKey: any, finalDate: any, startDate: any }): Promise<ResponseInterface> {

        try {

            let users = await userDbProcedures.getUsersDataProcedure(filters)

            if (!users) users = []

            users.forEach((user) => {
                user.userPermissions.auditLogPermission == true ? user.userPermissions.auditLogPermission = true : user.userPermissions.auditLogPermission = false;
                user.userPermissions.clientPermission == true ? user.userPermissions.clientPermission = true : user.userPermissions.clientPermission = false;
                user.userPermissions.organizationPermission == true ? user.userPermissions.organizationPermission = true : user.userPermissions.organizationPermission = false;
                user.userPermissions.reportTaskPermission == true ? user.userPermissions.reportTaskPermission = true : user.userPermissions.reportTaskPermission = false;
                user.userPermissions.taskPermission == true ? user.userPermissions.taskPermission = true : user.userPermissions.taskPermission = false;
                user.userPermissions.userPermission == true ? user.userPermissions.userPermission = true : user.userPermissions.userPermission = false;
                user.userRequirePasswordChange == true ? user.userRequirePasswordChange = true : user.userRequirePasswordChange = false
                user.userState == true ? user.userState = true : user.userState = false
                delete user.userPassword
            })

            return { status: 200, success: true, msg: `Usuarios obtenidos correctamente`, data: users }

        } catch (error) {
            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }

    public async getBuildingType(): Promise<ResponseInterface> {

        try {
            const data = await buildingDbProcedures.getBuildingTypeProcedure()

            return { status: 200, success: true, msg: `Building Types obtenidos correctamente`, data }

        } catch (error) {
            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }

    public async getClientsBuilding(clientId?: number): Promise<ResponseInterface> {
        try {
            const buildings = await clientDbProcedures.getClientBuildingsProcedure({ clientId });
            return { status: 200, success: true, msg: `Buildings obtenidos correctamente`, data: buildings };

        } catch (error) {
            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }

    public async getTaskStates(): Promise<ResponseInterface> {
        try {
            const buildings = await taskDbProcedures.getTaskStatesProcedure();
            return { status: 200, success: true, msg: `Task States obtenidos correctamente`, data: buildings };

        } catch (error) {
            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }

    public async getTasks(filters: { searchKey?: any, finalDate?: any, startDate?: any }): Promise<ResponseInterface> {
        try {
            const tasks = await taskDbProcedures.getTasksProcedure(filters);

            return { status: 200, success: true, msg: `Tasks obtenidos correctamente`, data: tasks };

        } catch (error) {
            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
        }
    }

    public async getTasksByAgentId(ids: Array<number>): Promise<ResponseInterface> {
        try {
            const tasks = await taskDbProcedures.getTasksByAgnetIdsProcedure(ids);
            
            return { status: 200, success: true, msg: `Tasks obtenidos correctamente`, data: tasks };

        } catch (error) {

            console.log(error);
            return { status: 500, success: false, msg: `Error al obtener la informacion` };
            
        }
    }
    
    // public async getTasksByAgentId(ids: Array<number>, stateFilter: number): Promise<ResponseInterface> {
    //     try {
    //         const tasks = await taskDbProcedures.getTasksByAgnetIdsProcedure(ids, stateFilter);

    //         return { status: 200, success: true, msg: `Tasks obtenidos correctamente`, data: tasks };

    //     } catch (error) {
    //         console.log(error);
    //         return { status: 500, success: false, msg: `Error al obtener la informacion` };
    //     }
    // }
}