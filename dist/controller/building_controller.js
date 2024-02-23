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
exports.updateBuildingType = exports.createBuildingType = void 0;
const building_procedures_1 = require("../db/procedures/building_procedures");
const buildingDbProcedures = new building_procedures_1.BuildingDbProcedures;
const createBuildingType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buildingTypeName, buildingTypeDescription } = req.body;
        const data = { buildingTypeName, buildingTypeDescription };
        const response = yield buildingDbProcedures.createBuildingTypeProcedure(data);
        res.status(200).json({
            success: true,
            msg: "Create Building Type",
            response
        });
    }
    catch (error) {
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
        });
    }
});
exports.createBuildingType = createBuildingType;
const updateBuildingType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { buildingTypeId, buildingTypeName, buildingTypeDescription } = req.body;
        const data = { buildingTypeId, buildingTypeName, buildingTypeDescription };
        const response = yield buildingDbProcedures.updateBuildingTypeProcedure(data);
        res.status(200).json({
            success: true,
            msg: "Update Building Type",
            response
        });
    }
    catch (error) {
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
        });
    }
});
exports.updateBuildingType = updateBuildingType;
//# sourceMappingURL=building_controller.js.map