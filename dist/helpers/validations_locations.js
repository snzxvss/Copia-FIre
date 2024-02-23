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
exports.isValidLocationcity = exports.isValidLocationState = void 0;
const location_procedures_1 = require("../db/procedures/location_procedures");
const locationDbProcedures = new location_procedures_1.LocationDbProcedures;
const isValidLocationState = (stateId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield locationDbProcedures.getLocationStates();
    const { cityId } = req.body;
    if (!stateId)
        throw new Error('El stateId es obligatorio');
    if (!cityId)
        throw new Error("El cityId es obligatorio");
    if (Array.isArray(stateId))
        throw new Error('Solo se permiten valores numericos');
    const equal = data.find((state) => state.stateId == stateId) || false;
    if (!equal)
        throw new Error("El stateId es invalido");
});
exports.isValidLocationState = isValidLocationState;
const isValidLocationcity = (cityId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { stateId } = req.body;
    if (!stateId)
        throw new Error("El stateId es obligatorio");
    if (!cityId)
        throw new Error("El cityId es obligatorio");
    const data = yield locationDbProcedures.getLocationCitys(stateId);
    const equal = data != null ? data.find((city) => city.cityId == cityId) : false;
    if (!equal && data)
        throw new Error("El cityId es invalido");
});
exports.isValidLocationcity = isValidLocationcity;
//# sourceMappingURL=validations_locations.js.map