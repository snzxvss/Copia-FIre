import { Request, Response } from "express";
import { BuildingDbProcedures } from "../db/procedures/building_procedures";

const buildingDbProcedures = new BuildingDbProcedures
export const createBuildingType = async (req: Request, res: Response) => {

    try {
        const { buildingTypeName, buildingTypeDescription } = req.body
        const data = { buildingTypeName, buildingTypeDescription }

        const response = await buildingDbProcedures.createBuildingTypeProcedure(data);

        res.status(200).json({
            success: true,
            msg: "Create Building Type",
            response
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
export const updateBuildingType = async (req: Request, res: Response) => {

    try {
        const { buildingTypeId, buildingTypeName, buildingTypeDescription } = req.body
        const data = { buildingTypeId, buildingTypeName, buildingTypeDescription }

        const response = await buildingDbProcedures.updateBuildingTypeProcedure(data);

        res.status(200).json({
            success: true,
            msg: "Update Building Type",
            response
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