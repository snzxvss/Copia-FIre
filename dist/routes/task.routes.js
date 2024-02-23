"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controller/task_controller");
const task_middlewares_1 = require("../middlewares/task_middlewares");
const router = (0, express_1.Router)();
router.post("/getTaskInfo", task_middlewares_1.getTaskInfoMiddlewares, task_controller_1.getTaskInfo);
router.get("/tasksPdfReport", task_controller_1.tasksPdfReport);
router.get("/tasksXlsxReport", task_controller_1.tasksXlsxReport);
router.post("/exportTasksToPDF", task_middlewares_1.exportTasksMiddlewares, task_controller_1.exportTasksToPDF);
router.post("/exportTasksToXLSX", task_middlewares_1.exportTasksMiddlewares, task_controller_1.exportTasksToXLSX);
router.post("/createTask", task_middlewares_1.createTaskMiddlewares, task_controller_1.createTask);
router.put("/updateTask", task_middlewares_1.updateTaskMiddlewares, task_controller_1.updateTask);
router.put("/manageTask", task_middlewares_1.manageTaskMiddlewares, task_controller_1.manageTask);
router.put("/assignTask", task_middlewares_1.assignTaskMiddlewares, task_controller_1.assignTask);
router.put("/cancelTask", task_middlewares_1.cancelTaskIMiddlewares, task_controller_1.cancelTask);
router.put("/CompleteTask", task_middlewares_1.completeTaskIMiddlewares, task_controller_1.completeTask);
exports.default = router;
//# sourceMappingURL=task.routes.js.map