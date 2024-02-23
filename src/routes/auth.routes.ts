import { Router } from "express";
import { forgotPassword, authUser, updatePassword, updateData, userInfo, deleteUserImage, updateOrganization } from "../controller/auth_controller";
import { authUserMiddlewares, deleteUserImageMiddlewares, forgotPasswordMiddlewares, updateDataMiddlewares, updateOrganizationMiddlewares, updatePasswordMiddlewares, userInfoMiddlewares } from "../middlewares/auth_middlewares";


const router = Router();


router.post("/authUser", authUserMiddlewares, authUser);
router.post("/userInfo", userInfoMiddlewares, userInfo);
router.post("/forgotPassword", forgotPasswordMiddlewares, forgotPassword);
router.post("/updatePassword", updatePasswordMiddlewares, updatePassword);

router.put("/updateOrganization", updateOrganizationMiddlewares, updateOrganization)

router.put("/updateData", updateDataMiddlewares, updateData);
router.delete("/deleteUserImage", deleteUserImageMiddlewares, deleteUserImage);


export default router;

/**
 * @openapi
 * /api/auth/authUser:
 *   post:
 *     tags:
 *       - "Autenticación"
 *     summary: "Autenticar usuario"
 *     description: "En este endpoint se validan las credenciales del usuario"
 *     operationId: "authUser"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - username
 *              - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: 'Admin'
 *               password:
 *                 type: string
 *                 example: "Admin=0035131"
 *     responses:
 *       '200':
 *         description: "Autenticación exitosa"
 *       '401':
 *         description: "Autenticación fallida"
 */