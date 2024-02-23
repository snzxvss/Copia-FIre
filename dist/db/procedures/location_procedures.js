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
exports.LocationDbProcedures = void 0;
const connection_1 = __importDefault(require("../connection"));
class LocationDbProcedures {
    constructor() {
        this.db = connection_1.default;
    }
    // ? =================================<Location Procedures>=================================
    getLocationStates() {
        return __awaiter(this, void 0, void 0, function* () {
            const [states] = yield this.db.query('call GetLocationStates()');
            return states.location_states;
        });
    }
    getLocationCitys(stateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [citys] = yield this.db.query('call GetLocationCitys(:stateId)', {
                replacements: { stateId }
            });
            return citys.citys;
        });
    }
}
exports.LocationDbProcedures = LocationDbProcedures;
//# sourceMappingURL=location_procedures.js.map