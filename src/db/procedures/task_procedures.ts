import db from "../connection";
import { TaskState } from "../../interfaces/task_state_interface";
import { Task } from "../../interfaces/task_interface";
import { TypeSizeExtinguisher } from "../../interfaces/typeSizeExtinguisher_interface";
import { ExtinguisherSize } from "../../interfaces/extinguisher_size";
import { ExtinguisherType } from "../../interfaces/extinguisher_type";

export class TaskDbProcedures {
    private db: typeof db;

    constructor() {
        this.db = db;
    };
    public async createTaskProcedure(newTaskData: object): Promise<{ response: string, taskId: number }> {
        const [response] = await this.db.query('CALL CreateTask(:newTaskData)', {
            replacements: {
                newTaskData: JSON.stringify(newTaskData) || JSON.stringify({})
            }
        }) as { response: string, taskId: number }[];

        return { response: response.response, taskId: response.taskId };
    };

    public async getTaskTypesProcedure(): Promise<Array<ExtinguisherType>> {
        const [response] = await this.db.query('CALL GetTaskExtinguisherTypes()') as { taskExtinguisherTypes: Array<ExtinguisherType> }[]

        return response.taskExtinguisherTypes;
    };

    public async getTaskSizesProcedure(): Promise<Array<ExtinguisherSize>> {
        const [response] = await this.db.query('CALL GetTaskExtinguisherSizes()') as { taskExtinguisherSizes: Array<ExtinguisherSize> }[]

        return response.taskExtinguisherSizes;
    };

    public async getTaskStatesProcedure(): Promise<Array<TaskState>> {
        const [response] = await this.db.query('CALL GetTaskStates()') as { taskStates: Array<TaskState> }[]

        return response.taskStates;
    };

    public async getTasksProcedure(filters: { searchKey?: any, finalDate?: any, startDate?: any }): Promise<Array<Task>> {
        const [response] = await this.db.query('CALL GetTasksData(:filters)', {
            replacements: {
                filters: JSON.stringify(filters) || JSON.stringify({})
            }
        }) as { tasks: Array<Task> }[]

        return response.tasks;
    };

    public async getTasksByIdsProcedure(ids: Array<number> | number): Promise<Array<any> | any> {

        const isArray = Array.isArray(ids);
        const arrayOfIds = [];

        if (!isArray) {
            arrayOfIds.push(ids);
        } else { arrayOfIds.push(...ids) };

        const [tasks]: any = await this.db.query('CALL GetTasksDataByIds(:ids)', {
            replacements: {

                ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
            }
        }) as { tasks: Array<Task> | Task }[];

        if (tasks.tasks) tasks.tasks = tasks.tasks.length == 1 ? tasks.tasks[0] : tasks.tasks;

        return tasks.tasks;
    };
    
    public async getTasksByAgnetIdsProcedure(ids: Array<number> | number): Promise<Array<any> | any> {
        const agentData = Array.isArray(ids) ? { "agentIds": ids } : { "agentId": ids };
        const [response] = await this.db.query('CALL GetTasksDataByAgentId(:agentData)', {
            replacements: {
                agentData: JSON.stringify(agentData)
            }
        }) as { tasks: string }[];
    
        if (response && response.tasks) {
            const tasks = JSON.parse(response.tasks);
            return tasks;
        } else {
            return [];
        }
    }
    
    

    public async createTaskTypeExtinguisher(taskExtinguisher: TypeSizeExtinguisher): Promise<any> {

        const [response]: any = await this.db.query('CALL CreateTaskExtinguisher(:taskExtinguisher)', {
            replacements: {

                taskExtinguisher: JSON.stringify(taskExtinguisher) || JSON.stringify([])
            }
        }) as { tasks: Array<Task> }[];
        return response.response;
    };

    public async updateTaskProcedure(newTaskData: { taskId: string, taskDescription?: string, clientId?: number, buildingId?: number, taskEndDate?: string, assignedUser?: number, taskStateId?: number | null }): Promise<any> {

        const [response]: any = await this.db.query('CALL UpdateTaskData(:newTaskData)', {
            replacements: {
                newTaskData: JSON.stringify(newTaskData) || JSON.stringify([])
            }
        }) as { tasks: Array<Task> }[];
        return response.response;
    };
};