import { Router } from "express";
import { createBuildingTypeMiddlewares, updateBuildingTypeMiddlewares } from "../middlewares/building_middlewares";
import { createBuildingType, updateBuildingType } from "../controller/building_controller";


const router = Router();

router.post ("/createBuildingType", createBuildingTypeMiddlewares,  createBuildingType);

router.put  ("/updateBuildingType", updateBuildingTypeMiddlewares,  updateBuildingType);

export default router;
