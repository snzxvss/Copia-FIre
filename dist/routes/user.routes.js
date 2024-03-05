"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user_controller");
const user_middlewares_1 = require("../middlewares/user_middlewares");
const router = (0, express_1.Router)();
router.post("/getUserInfo", user_middlewares_1.getUserInfoMiddlewares, user_controller_1.getUserInfo);
router.post("/exportUsersToPDF", user_middlewares_1.exportUsersMiddlewares, user_controller_1.exportUsersToPDF);
router.post("/exportUsersToXLSX", user_middlewares_1.exportUsersMiddlewares, user_controller_1.exportUsersToXLSX);
router.post("/usersPdfReport", user_middlewares_1.getUserMiddewaresPdf, user_controller_1.usersPdfReport);
router.post("/usersXlsxReport", user_controller_1.usersXlsxReport);
router.post("/createUser", user_middlewares_1.createUserMiddlewares, user_controller_1.createUser);
router.put("/updateUser", user_middlewares_1.updateUserMiddlewares, user_controller_1.updateUser);
router.put("/alternateUser", user_middlewares_1.alternateUserMiddlewares, user_controller_1.alternateUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map