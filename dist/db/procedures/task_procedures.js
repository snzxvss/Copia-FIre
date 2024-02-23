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
exports.TaskDbProcedures = void 0;
const connection_1 = __importDefault(require("../connection"));
class TaskDbProcedures {
    constructor() {
        this.db = connection_1.default;
    }
    ;
    createTaskProcedure(newTaskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateTask(:newTaskData)', {
                replacements: {
                    newTaskData: JSON.stringify(newTaskData) || JSON.stringify({})
                }
            });
            return { response: response.response, taskId: response.taskId };
        });
    }
    ;
    getTaskTypesProcedure() {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL GetTaskExtinguisherTypes()');
            return response.taskExtinguisherTypes;
        });
    }
    ;
    getTaskSizesProcedure() {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL GetTaskExtinguisherSizes()');
            return response.taskExtinguisherSizes;
        });
    }
    ;
    getTaskStatesProcedure() {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL GetTaskStates()');
            return response.taskStates;
        });
    }
    ;
    getTasksProcedure(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL GetTasksData(:filters)', {
                replacements: {
                    filters: JSON.stringify(filters) || JSON.stringify({})
                }
            });
            return response.tasks;
        });
    }
    ;
    getTasksByIdsProcedure(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const isArray = Array.isArray(ids);
            const arrayOfIds = [];
            if (!isArray) {
                arrayOfIds.push(ids);
            }
            else {
                arrayOfIds.push(...ids);
            }
            ;
            const [tasks] = yield this.db.query('CALL GetTasksDataByIds(:ids)', {
                replacements: {
                    ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
                }
            });
            if (tasks.tasks)
                tasks.tasks = tasks.tasks.length == 1 ? tasks.tasks[0] : tasks.tasks;
            return tasks.tasks;
        });
    }
    ;
    getTasksByAgnetIdsProcedure(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const isArray = Array.isArray(ids);
            const arrayOfIds = [];
            if (!isArray) {
                arrayOfIds.push(ids);
            }
            else {
                arrayOfIds.push(...ids);
            }
            ;
            const [tasks] = yield this.db.query('CALL GetTasksDataByAgentId(:ids)', {
                replacements: {
                    ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
                }
            });
            if (!tasks.tasks)
                tasks.tasks = [];
            // if (tasks.tasks) tasks.tasks = tasks.tasks.length == 1 ? tasks.tasks[0] : tasks.tasks;
            return tasks.tasks;
        });
    }
    ;
    createTaskTypeExtinguisher(taskExtinguisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateTaskExtinguisher(:taskExtinguisher)', {
                replacements: {
                    taskExtinguisher: JSON.stringify(taskExtinguisher) || JSON.stringify([])
                }
            });
            return response.response;
        });
    }
    ;
    updateTaskProcedure(newTaskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateTaskData(:newTaskData)', {
                replacements: {
                    newTaskData: JSON.stringify(newTaskData) || JSON.stringify([])
                }
            });
            return response.response;
        });
    }
    ;
}
exports.TaskDbProcedures = TaskDbProcedures;
;
//# sourceMappingURL=task_procedures.js.map