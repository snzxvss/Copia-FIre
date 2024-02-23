"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth_controller");
const auth_middlewares_1 = require("../middlewares/auth_middlewares");
const router = (0, express_1.Router)();
router.post("/authUser", auth_middlewares_1.authUserMiddlewares, auth_controller_1.authUser);
router.post("/userInfo", auth_middlewares_1.userInfoMiddlewares, auth_controller_1.userInfo);
router.post("/forgotPassword", auth_middlewares_1.forgotPasswordMiddlewares, auth_controller_1.forgotPassword);
router.post("/updatePassword", auth_middlewares_1.updatePasswordMiddlewares, auth_controller_1.updatePassword);
router.put("/updateOrganization", auth_middlewares_1.updateOrganizationMiddlewares, auth_controller_1.updateOrganization);
router.put("/updateData", auth_middlewares_1.updateDataMiddlewares, auth_controller_1.updateData);
router.delete("/deleteUserImage", auth_middlewares_1.deleteUserImageMiddlewares, auth_controller_1.deleteUserImage);
exports.default = router;
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
//# sourceMappingURL=auth.routes.js.map