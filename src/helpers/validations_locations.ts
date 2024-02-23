import { Request, RequestHandler, Response } from "express";
import { LocationDbProcedures } from "../db/procedures/location_procedures";
import { State } from "../interfaces/state_interface";
import { City } from "../interfaces/borough_interface";

const locationDbProcedures = new LocationDbProcedures;

export const isValidLocationState: any = async (stateId: number, { req }: { req: Request }) => {
    const data = await locationDbProcedures.getLocationStates();
    const { cityId } = req.body;

    if (!stateId) throw new Error('El stateId es obligatorio');
    if (!cityId) throw new Error("El cityId es obligatorio");
    if (Array.isArray(stateId)) throw new Error('Solo se permiten valores numericos');

    const equal = data.find((state: State) => state.stateId == stateId) || false;

    if (!equal) throw new Error("El stateId es invalido");
}

export const isValidLocationcity: any = async (cityId: number, { req }: { req: Request }) => {
    const { stateId } = req.body

    if (!stateId) throw new Error("El stateId es obligatorio")
    if (!cityId) throw new Error("El cityId es obligatorio")

    const data = await locationDbProcedures.getLocationCitys(stateId);
    const equal = data != null ? data.find((city: City) => city.cityId == cityId) : false;

    if (!equal && data) throw new Error("El cityId es invalido");
}