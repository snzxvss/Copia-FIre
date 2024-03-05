import { Router } from "express";
import { assignTask, cancelTask, completeTask, createTask, exportTasksToPDF, exportTasksToXLSX, getTaskInfo, manageTask, tasksPdfReport, tasksXlsxReport, updateTask } from "../controller/task_controller";
import { assignTaskMiddlewares, cancelTaskIMiddlewares, completeTaskIMiddlewares, createTaskMiddlewares, exportTasksMiddlewares, getTaskInfoMiddlewares, manageTaskMiddlewares, updateTaskMiddlewares } from "../middlewares/task_middlewares";



const router = Router();
router.post("/getTaskInfo", getTaskInfoMiddlewares, getTaskInfo);
router.post("/tasksPdfReport", exportTasksMiddlewares, tasksPdfReport);
router.post("/tasksXlsxReport", exportTasksMiddlewares, tasksXlsxReport);

router.post("/exportTasksToPDF", exportTasksMiddlewares, exportTasksToPDF);
router.post("/exportTasksToXLSX", exportTasksMiddlewares, exportTasksToXLSX);
router.post("/createTask", createTaskMiddlewares, createTask);

router.put("/updateTask", updateTaskMiddlewares, updateTask);
router.put("/manageTask", manageTaskMiddlewares, manageTask);
router.put("/assignTask", assignTaskMiddlewares, assignTask);
router.put("/cancelTask", cancelTaskIMiddlewares, cancelTask);
router.put("/CompleteTask", completeTaskIMiddlewares, completeTask);


export default router;