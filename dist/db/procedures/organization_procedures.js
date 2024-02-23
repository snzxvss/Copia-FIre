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
exports.OrganizationDbProcedures = void 0;
const connection_1 = __importDefault(require("../connection"));
class OrganizationDbProcedures {
    constructor() {
        this.db = connection_1.default;
    }
    getOrganizationInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const [organization] = yield this.db.query('call GetOrganizationInfo()');
            return organization.organization_info;
        });
    }
    //TODO =================================<ARREGLAR>=================================
    updateOrganizationInfo(newOrganizationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('call UpdateOrganization(:newOrganizationData)', {
                replacements: {
                    newOrganizationData: JSON.stringify(newOrganizationData) || JSON.stringify({})
                }
            });
            return response.response;
        });
    }
}
exports.OrganizationDbProcedures = OrganizationDbProcedures;
//# sourceMappingURL=organization_procedures.js.map