import db from "../connection";
import { BuildingType } from "../../interfaces/building_type_interface";

export class BuildingDbProcedures {
    private db: typeof db;

    constructor() {
        this.db = db;
    }

    public async getBuildingTypeProcedure(): Promise<Array<BuildingType>> {
        const [response] = await this.db.query('CALL GetBuildingType()') as { types: Array<BuildingType> }[];
        return response.types;
    }

    public async createBuildingTypeProcedure(buildingTypeData: object): Promise<string> {
        const [response] = await this.db.query("CALL CreateBuildingType(:buildingTypeData)", {
            replacements: {
                buildingTypeData: JSON.stringify(buildingTypeData) || JSON.stringify({})
            }
        }) as { response: string }[]

        return response.response
    }

    public async updateBuildingTypeProcedure(buildingTypeData: object): Promise<string> {
        const [response] = await this.db.query("CALL UpdateBuildingType(:buildingTypeData)", {
            replacements: {
                buildingTypeData: JSON.stringify(buildingTypeData) || JSON.stringify({})
            }
        }) as { response: string }[]

        return response.response
    }


}