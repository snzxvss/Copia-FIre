import { Router } from "express";
import { alternateUser, createUser, exportUsersToPDF, exportUsersToXLSX, getUserInfo, updateUser, usersPdfReport, usersXlsxReport,  } from '../controller/user_controller';
import { updateUserMiddlewares, createUserMiddlewares, getUserInfoMiddlewares, exportUsersMiddlewares, alternateUserMiddlewares, getUserMiddewaresPdf } from "../middlewares/user_middlewares";

const router = Router();

router.post("/getUserInfo", getUserInfoMiddlewares, getUserInfo);

router.post("/exportUsersToPDF", exportUsersMiddlewares, exportUsersToPDF);
router.post("/exportUsersToXLSX", exportUsersMiddlewares, exportUsersToXLSX);

router.post("/usersPdfReport", getUserMiddewaresPdf, usersPdfReport);
router.post("/usersXlsxReport", usersXlsxReport);

router.post("/createUser", createUserMiddlewares, createUser);

router.put("/updateUser", updateUserMiddlewares, updateUser);
router.put("/alternateUser", alternateUserMiddlewares, alternateUser);










export default router;
