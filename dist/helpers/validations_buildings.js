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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidBuildingId = exports.isValidBuildingTypeId = void 0;
const client_procedures_1 = require("../db/procedures/client_procedures");
const building_procedures_1 = require("../db/procedures/building_procedures");
const clientDbProcedurses = new client_procedures_1.ClientDbProcedures;
const buildingDbProcedurses = new building_procedures_1.BuildingDbProcedures;
const isValidBuildingTypeId = (buildingTypeId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield buildingDbProcedurses.getBuildingTypeProcedure();
    if (!buildingTypeId)
        throw new Error('El buildingTypeId es obligatorio');
    const equal = data.find((type) => type.buildingTypeId == buildingTypeId) || false;
    if (!equal)
        throw new Error("El buildingTypeId es invalido");
});
exports.isValidBuildingTypeId = isValidBuildingTypeId;
const isValidBuildingId = (buildingId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId } = req.body;
    const data = yield clientDbProcedurses.getClientBuildingsProcedure({ clientId });
    if (!buildingId)
        throw new Error('El buildingId es obligatorio');
    if (buildingId && !clientId)
        throw new Error('El clientId es obligatorio');
    const equal = data.clientBuildings.find((building) => building.buildingId == buildingId) || false;
    if (!equal)
        throw new Error("El buildingId es invalido");
});
exports.isValidBuildingId = isValidBuildingId;
//# sourceMappingURL=validations_buildings.js.map