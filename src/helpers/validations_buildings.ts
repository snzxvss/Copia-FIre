import { Request, RequestHandler, Response } from "express";
import { ClientDbProcedures } from "../db/procedures/client_procedures";
import { BuildingDbProcedures } from "../db/procedures/building_procedures";
import { BuildingType } from "../interfaces/building_type_interface";



const clientDbProcedurses = new ClientDbProcedures;
const buildingDbProcedurses = new BuildingDbProcedures;

export const isValidBuildingTypeId: any = async (buildingTypeId: number, { req }: { req: Request }) => {
    const data = await buildingDbProcedurses.getBuildingTypeProcedure();

    if (!buildingTypeId) throw new Error('El buildingTypeId es obligatorio')
    const equal = data.find((type: BuildingType) => type.buildingTypeId == buildingTypeId) || false
    if (!equal) throw new Error("El buildingTypeId es invalido")
}

export const isValidBuildingId: any = async (buildingId: number, { req }: { req: Request }) => {
    const { clientId } = req.body

    const data = await clientDbProcedurses.getClientBuildingsProcedure({ clientId });    

    if (!buildingId) throw new Error('El buildingId es obligatorio')
    if (buildingId && !clientId) throw new Error('El clientId es obligatorio')
    const equal = data.clientBuildings.find((building: any) => building.buildingId == buildingId) || false;
    if (!equal) throw new Error("El buildingId es invalido")
}
