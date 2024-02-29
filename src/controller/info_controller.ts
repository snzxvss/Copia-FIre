import { Request, Response } from "express";
import { GetInfoService } from "../services/get_info_service";
import { ResponseInterface } from "../interfaces/response_interface";
import moment from "moment";
import { User } from "../interfaces/user_interface";

const getInfo = new GetInfoService;
export const getLocationInfo = async (req: Request, res: Response) => {

    try {
        const { stateId } = req.body;
        const { usuario }: { usuario: User } = req.body

        if (stateId) {
            const { status, success, msg, data }: ResponseInterface = await getInfo.getLocationBorough(stateId);
            const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
            console.log(`${fechaFormateada} - Informacion obtenida de la ubicación - Username: ${usuario.userUsername}`);
            return res.status(status).json({
                success,
                msg,
                data
            })
        }

        const { status, success, msg, data }: ResponseInterface = await getInfo.getLocationStates();
        return res.status(status).json({
            success,
            msg,
            data
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
export const getOrganizationInfo = async (req: Request, res: Response) => {

    try {
        const { usuario }: { usuario: User } = req.body

        const { status, success, msg, data }: ResponseInterface = await getInfo.getOrganizationInfo();
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de la organización - Username: ${usuario.userUsername}`);
        return res.status(status).json({
            success,
            msg,
            data
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
export const getClientsInfo = async (req: Request, res: Response) => {

    try {
        const { searchKey, finalDate, startDate } = req.body
        const filters = { searchKey, finalDate, startDate }
        const { usuario }: { usuario: User } = req.body

        const { status, success, msg, data }: ResponseInterface = await getInfo.getClientsData(filters);
        

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de clientes - Username: ${usuario.userUsername}`);

        return res.status(status).json({
            success,
            msg,
            data
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
export const getUsersInfo = async (req: Request, res: Response) => {

    try {
        const { searchKey, finalDate, startDate } = req.body
        const filters = { searchKey, finalDate, startDate }
        const { usuario }: { usuario: User } = req.body

        const { status, success, msg, data }: ResponseInterface = await getInfo.getUsersData(filters);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de usuarios - Username: ${usuario.userUsername}`);

        return res.status(status).json({
            success,
            msg,
            data
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
export const getBuildingTypeInfo = async (req: Request, res: Response) => {
    try {

        const { status, success, msg, data } = await getInfo.getBuildingType()
        const { usuario }: { usuario: User } = req.body

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de los tipos de edificacion - Username: ${usuario.userUsername}`);

        res.status(status).json({
            success,
            msg,
            data
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
export const getTaskStatesInfo = async (req: Request, res: Response) => {
    try {

        const { status, success, msg, data } = await getInfo.getTaskStates()
        const { usuario }: { usuario: User } = req.body

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de los estados de tareas - Username: ${usuario.userUsername}`);

        res.status(status).json({
            success,
            msg,
            data
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

export const getClientBuildingsInfo = async (req: Request, res: Response) => {

    try {
        const { clientId } = req.body
        const { usuario }: { usuario: User } = req.body

        const { status, success, msg, data }: ResponseInterface = await getInfo.getClientsBuilding(clientId);

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de las edificaciones de un cliente - Username: ${usuario.userUsername}`);
        return res.status(status).json({
            success,
            msg,
            data
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
export const getTasksInfo = async (req: Request, res: Response) => {
    try {
        const { searchKey, finalDate, startDate } = req.body;
        const filters = { searchKey, finalDate, startDate };
        const { usuario }: { usuario: User } = req.body

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de las tareas - Username: ${usuario.userUsername}`);

        const { status, success, msg, data } = await getInfo.getTasks(filters)

        console.log("Data enviada: ", data);
        
        res.status(status).json({
            success,
            msg,
            data
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
export const getTasksByAgentIdInfo = async (req: Request, res: Response) => {
    try {
        const { assignedUser } = req.body
        const { usuario }: { usuario: User } = req.body

        const { status, success, msg, data } = await getInfo.getTasksByAgentId(assignedUser);
        console.log(data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Informacion obtenida de las tareas - Username: ${usuario.userUsername}`);

        res.status(status).json({
            success,
            msg,
            data
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