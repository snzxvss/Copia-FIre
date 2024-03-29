import { Request, Response } from "express";
import { TaskDbProcedures } from "../db/procedures/task_procedures";
import { User } from "../interfaces/user_interface";
import { Task } from "../interfaces/task_interface";
import { TypeSizeExtinguisher } from "../interfaces/typeSizeExtinguisher_interface";
import moment from "moment";
import fs from 'fs';
import { emails } from "../interfaces/email_interface";
import axios from "axios";
import { Workbook } from "exceljs";

const taskDbProcedures = new TaskDbProcedures
export const getTaskInfo = async (req: Request, res: Response) => {
    try {

        const { taskId } = req.body
        const { task }: { task: Task } = req.body

        return res.status(200).json({
            success: true,
            msg: "Create Task",
            response: "Task info.",
            data: task
        })

    } catch (error) {
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
        })
    }

}
export const createTask = async (req: Request, res: Response) => {
    try {

        const { taskDescription, taskStartNewExtinguisherCount, taskStartRechargedExtinguisherCount,
            taskExpectedEndDate, clientId, buildingId, assignedUser, } = req.body
        const { taskExtinguishers }: { taskExtinguishers: Array<TypeSizeExtinguisher> } = req.body
        const { usuario }: { usuario: User } = req.body
        const { userId } = usuario;

        const taskStates = await taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = assignedUser ? taskStates.find((taskState) => taskState.taskStateName == "Asignada") : taskStates.find((taskState) => taskState.taskStateName == "Creada");

        const data = {
            taskDescription, taskStartNewExtinguisherCount, taskStartRechargedExtinguisherCount,
            taskExpectedEndDate, clientId, buildingId, taskStateId: taskStateId?.taskStateId, assignedUser, taskCreator: userId,
        };

        const { response, taskId } = await taskDbProcedures.createTaskProcedure(data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Tarea creada correctamente por ususario ${usuario.userUsername}`)


        if (taskExtinguishers) {
            taskExtinguishers.forEach(async (taskExtinguisher) => {

                let { isNewPFE, isService } = taskExtinguisher;
                if (isNewPFE) isService = 1 - isNewPFE;
                if (isService) isNewPFE = 1 - isService;

                await taskDbProcedures.createTaskTypeExtinguisher({
                    taskId,
                    createdInTask: 1,
                    extinguisherTypeId: taskExtinguisher.extinguisherTypeId,
                    extinguisherSizeId: taskExtinguisher.extinguisherSizeId,
                    createdInMangement: 0,
                    isNewPFE,
                    isService
                });
            });
        };

        const task = await taskDbProcedures.getTasksByIdsProcedure(taskId)

        return res.status(200).json({
            success: true,
            msg: "Create Task",
            response,
            data: task
        });

    } catch (error) {
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
    };
};

export const updateTask = async (req: Request, res: Response) => {
    try {

        const { taskId, taskDescription, clientId, buildingId, taskEndDate, } = req.body;
        const { usuario }: { usuario: User } = req.body

        const data = { taskId, taskDescription, clientId, buildingId, taskEndDate };
        const response = await taskDbProcedures.updateTaskProcedure(data);
        const taskUpdated = await taskDbProcedures.getTasksByIdsProcedure(taskId)

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Tarea actualizada por usuario ${usuario.userUsername}`);

        return res.status(200).json({
            success: true,
            response,
            data: taskUpdated,
        });

    } catch (error) {
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
    };
};

export const assignTask = async (req: Request, res: Response) => {
    try {
        const { taskId, assignedUser } = req.body;

        const taskStates = await taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = taskStates.find((taskState) => taskState.taskStateName == "Asignada")
        const data = { taskId, taskStateId: taskStateId!.taskStateId, assignedUser };
        const response = await taskDbProcedures.updateTaskProcedure(data);

        const task = await taskDbProcedures.getTasksByIdsProcedure(taskId)

        return res.status(200).json({
            success: true,
            msg: response,
            data: task
        });

    } catch (error) {
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
    };
}

export const manageTask =async (req: Request, res: Response) => {
    
}

export const cancelTask = async (req: Request, res: Response) => {
    try {

        const { taskId } = req.body;

        const taskStates = await taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = taskStates.find((taskState) => taskState.taskStateName == "Anulada")
        const data = { taskId, taskStateId: taskStateId!.taskStateId };
        const response = await taskDbProcedures.updateTaskProcedure(data);

        const task = await taskDbProcedures.getTasksByIdsProcedure(taskId);

        return res.status(200).json({
            success: true,
            msg: response,
            data: task
        });

    } catch (error) {
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
    };
}
export const completeTask = async (req: Request, res: Response) => {
    try {

        const { taskId } = req.body;

        const taskStates = await taskDbProcedures.getTaskStatesProcedure();
        const taskState = taskStates.find((taskState) => taskState.taskStateName == "Completada")
        const data = { taskId, taskStateId: taskState!.taskStateId };
        const response = await taskDbProcedures.updateTaskProcedure(data);

        const task = await taskDbProcedures.getTasksByIdsProcedure(taskId)

        return res.status(200).json({
            success: true,
            msg: "complete Task",
            data: task
        });

    } catch (error) {
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
    };
}
export const reportTask = async (req: Request, res: Response) => {
    try {

        const { taskId } = req.body;

        const taskStates = await taskDbProcedures.getTaskStatesProcedure();
        const taskStateId = taskStates.find((taskState) => taskState.taskStateName == "Reportada")
        const data = { taskId, taskStateId: taskStateId!.taskStateId };
        const response = await taskDbProcedures.updateTaskProcedure(data);

        const task = await taskDbProcedures.getTasksByIdsProcedure(taskId)

        return res.status(200).json({
            success: true,
            msg: "Report Task",
            data: task
        });

    } catch (error) {
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
    };
}

export const exportTasksToXLSX = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' }; 
        let result = await taskDbProcedures.GetTaskDataToTask(data);
        console.log(result);
    
        interface TaskWithEmails {
            emails: emails[];
        }
        
        let resultWithEmails: TaskWithEmails = {
            ...result,
            emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ]
        };
    
        // Send 'result' to http://localhost:8080/client
        const postResponse = await axios.post('http://localhost:8080/task', resultWithEmails);
    
        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = await axios.get('http://localhost:8080/task/export-xls', { responseType: 'arraybuffer' });
    
        // Convert the response to a XLS
        const xls = Buffer.from(getResponse.data, 'binary').toString('base64');
    
        console.log(postResponse.data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);
    
        res.contentType("application/vnd.ms-excel");
        return res.send(Buffer.from(xls, 'base64'));
    } catch (error) {
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
    };
};
export const tasksXlsxReport = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' }; 
        let result = await taskDbProcedures.GetTaskDataReport(data);
        console.log(result);
    
        interface TaskWithEmails {
            emails: emails[];
        }
        
        let resultWithEmails: TaskWithEmails = {
            ...result,
            emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ]
        };
    
        // Send 'result' to http://localhost:8080/task
        const postResponse = await axios.post('http://localhost:8080/report', resultWithEmails);
    
        // GET request to http://localhost:8080/task/export-pdf
        const getResponse = await axios.get('http://localhost:8080/report/export-xls', { responseType: 'arraybuffer' });
    
        // Convert the response to a XLS
        const xls = Buffer.from(getResponse.data, 'binary').toString('base64');
    
        console.log(postResponse.data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);
    
        res.contentType("application/vnd.ms-excel");
        return res.send(Buffer.from(xls, 'base64'));
    } catch (error) {
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
    };
};

export const exportTasksToPDF = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' }; 
        let result = await taskDbProcedures.GetTaskDataToTask(data);
        console.log(result);

        interface TaskWithEmails {
            emails: emails[];
        }
        
        let resultWithEmails: TaskWithEmails = {
            ...result,
            emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ]
        };
    
        // Send 'result' to http://localhost:8080/client
        const postResponse = await axios.post('http://localhost:8080/task', resultWithEmails);

        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = await axios.get('http://localhost:8080/task/export-pdf', { responseType: 'arraybuffer' });

        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');

        console.log(postResponse.data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);

        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
    } catch (error) {
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
    };
};
export const tasksPdfReport = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' }; 
        let result = await taskDbProcedures.GetTaskDataReport(data);
        console.log(result);

        interface TaskWithEmails {
            emails: emails[];
        }
        
        let resultWithEmails: TaskWithEmails = {
            ...result,
            emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ]
        };
    
        // Send 'result' to http://localhost:8080/client
        const postResponse = await axios.post('http://localhost:8080/report', resultWithEmails);

        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = await axios.get('http://localhost:8080/report/export-pdf', { responseType: 'arraybuffer' });

        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');

        console.log(postResponse.data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - User Data Report Generated: `);

        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
    } catch (error) {
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
    };
};