"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const building_middlewares_1 = require("../middlewares/building_middlewares");
const building_controller_1 = require("../controller/building_controller");
const router = (0, express_1.Router)();
router.post("/createBuildingType", building_middlewares_1.createBuildingTypeMiddlewares, building_controller_1.createBuildingType);
router.put("/updateBuildingType", building_middlewares_1.updateBuildingTypeMiddlewares, building_controller_1.updateBuildingType);
exports.default = router;
//# sourceMappingURL=building.routes.js.map