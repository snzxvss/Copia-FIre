import db from "../connection";
import { City } from "../../interfaces/borough_interface";
import { State } from "../../interfaces/state_interface";

export class LocationDbProcedures {
    private db: typeof db;

    constructor() {
        this.db = db;
    }

    // ? =================================<Location Procedures>=================================
    public async getLocationStates(): Promise<Array<State>> {
        const [states] = await this.db.query('call GetLocationStates()'
        ) as { location_states: Array<State> }[];

        return states.location_states;
    }

    public async getLocationCitys(stateId: number): Promise<Array<City>> {

        const [citys] = await this.db.query('call GetLocationCitys(:stateId)', { 
            replacements: { stateId }
        }) as { citys: Array<City> }[];

        return citys.citys;
    }
}