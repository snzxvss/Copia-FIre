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
exports.tasksPdfReport = exports.exportTasksToPDF = exports.tasksXlsxReport = exports.exportTasksToXLSX = exports.reportTask = exports.completeTask = exports.cancelTask = exports.manageTask = exports.assignTask = exports.updateTask = exports.createTask = exports.getTaskInfo = void 0;
const task_procedures_1 = require("../db/procedures/task_procedures");
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const taskDbProcedures = new task_procedures_1.TaskDbProcedures;
const getTaskInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        const { task } = req.body;
        return res.status(200).json({
            success: true,
            msg: "Create Task",
            response: "Task info.",
            data: task
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
exports.getTaskInfo = getTaskInfo;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskDescription, taskStartNewExtinguisherCount, taskStartRechargedExtinguisherCount, taskExpectedEndDate, clientId, buildingId, assignedUser, } = req.body;
        const { taskExtinguishers } = req.body;
        const { usuario } = req.body;
        const { userId } = usuario;
        const taskStates = yield taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = assignedUser ? taskStates.find((taskState) => taskState.taskStateName == "Asignada") : taskStates.find((taskState) => taskState.taskStateName == "Creada");
        const data = {
            taskDescription, taskStartNewExtinguisherCount, taskStartRechargedExtinguisherCount,
            taskExpectedEndDate, clientId, buildingId, taskStateId: taskStateId === null || taskStateId === void 0 ? void 0 : taskStateId.taskStateId, assignedUser, taskCreator: userId,
        };
        const { response, taskId } = yield taskDbProcedures.createTaskProcedure(data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Tarea creada correctamente por ususario ${usuario.userUsername}`);
        if (taskExtinguishers) {
            taskExtinguishers.forEach((taskExtinguisher) => __awaiter(void 0, void 0, void 0, function* () {
                let { isNewPFE, isService } = taskExtinguisher;
                if (isNewPFE)
                    isService = !isNewPFE;
                if (isService)
                    isNewPFE = !isService;
                yield taskDbProcedures.createTaskTypeExtinguisher({
                    taskId,
                    createdInTask: true,
                    extinguisherTypeId: taskExtinguisher.extinguisherTypeId,
                    extinguisherSizeId: taskExtinguisher.extinguisherSizeId,
                    createdInMangement: false,
                    isNewPFE,
                    isService
                });
            }));
        }
        ;
        const task = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
        return res.status(200).json({
            success: true,
            msg: "Create Task",
            response,
            data: task
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
    ;
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, taskDescription, clientId, buildingId, taskEndDate, } = req.body;
        const { usuario } = req.body;
        const data = { taskId, taskDescription, clientId, buildingId, taskEndDate };
        const response = yield taskDbProcedures.updateTaskProcedure(data);
        const taskUpdated = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Tarea actualizada por usuario ${usuario.userUsername}`);
        return res.status(200).json({
            success: true,
            response,
            data: taskUpdated,
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
    ;
});
exports.updateTask = updateTask;
const assignTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, assignedUser } = req.body;
        const taskStates = yield taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = taskStates.find((taskState) => taskState.taskStateName == "Asignada");
        const data = { taskId, taskStateId: taskStateId.taskStateId, assignedUser };
        const response = yield taskDbProcedures.updateTaskProcedure(data);
        const task = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
        return res.status(200).json({
            success: true,
            msg: response,
            data: task
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
    ;
});
exports.assignTask = assignTask;
const manageTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.manageTask = manageTask;
const cancelTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        const taskStates = yield taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = taskStates.find((taskState) => taskState.taskStateName == "Anulada");
        const data = { taskId, taskStateId: taskStateId.taskStateId };
        const response = yield taskDbProcedures.updateTaskProcedure(data);
        const task = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
        return res.status(200).json({
            success: true,
            msg: response,
            data: task
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
    ;
});
exports.cancelTask = cancelTask;
const completeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        const taskStates = yield taskDbProcedures.getTaskStatesProcedure();
        const taskState = taskStates.find((taskState) => taskState.taskStateName == "Completada");
        const data = { taskId, taskStateId: taskState.taskStateId };
        const response = yield taskDbProcedures.updateTaskProcedure(data);
        const task = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
        return res.status(200).json({
            success: true,
            msg: "complete Task",
            data: task
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
    ;
});
exports.completeTask = completeTask;
const reportTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.body;
        const taskStates = yield taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = taskStates.find((taskState) => taskState.taskStateName == "Reportada");
        const data = { taskId, taskStateId: taskStateId.taskStateId };
        const response = yield taskDbProcedures.updateTaskProcedure(data);
        const task = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
        return res.status(200).json({
            success: true,
            msg: "Report Task",
            data: task
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
    ;
});
exports.reportTask = reportTask;
const exportTasksToXLSX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/task/tasksXlsxReport'
    });
});
exports.exportTasksToXLSX = exportTasksToXLSX;
const tasksXlsxReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_TASK_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.status(200).send(data);
        }
        ;
    });
});
exports.tasksXlsxReport = tasksXlsxReport;
const exportTasksToPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/task/tasksPdfReport'
    });
});
exports.exportTasksToPDF = exportTasksToPDF;
const tasksPdfReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' };
        let result = yield taskDbProcedures.GetTaskDataToReport(data);
        console.log(result);
        let resultWithEmails = Object.assign(Object.assign({}, result), { emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ] });
        // Send 'result' to http://localhost:8080/client
        const postResponse = yield axios_1.default.post('http://localhost:8080/task', resultWithEmails);
        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = yield axios_1.default.get('http://localhost:8080/task/export-pdf', { responseType: 'arraybuffer' });
        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');
        console.log(postResponse.data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);
        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
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
    ;
});
exports.tasksPdfReport = tasksPdfReport;
//# sourceMappingURL=task_controller.js.map