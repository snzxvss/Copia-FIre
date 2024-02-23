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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidArrayOfTaskExtinguisher = exports.isValidToReport = exports.isValidToCancel = exports.isValidToComplete = exports.isValidToAssign = exports.isValidToEditTask = exports.isValidTaskId = exports.isValidTaskExtinguishers = exports.isValidTaskStateId = void 0;
const task_procedures_1 = require("../db/procedures/task_procedures");
const taskDbProcedures = new task_procedures_1.TaskDbProcedures;
const isValidTaskStateId = (taskStateId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield taskDbProcedures.getTaskStatesProcedure();
    const equal = data.find((taskState) => taskStateId == taskState.taskStateId) || false;
    if (!equal)
        throw new Error("No es un fecdb_task_state_id válido");
});
exports.isValidTaskStateId = isValidTaskStateId;
const isValidTaskExtinguishers = (taskExtinguishers) => __awaiter(void 0, void 0, void 0, function* () {
    const types = yield taskDbProcedures.getTaskTypesProcedure();
    const sizes = yield taskDbProcedures.getTaskSizesProcedure();
    const bolleanValus = [true, false, 1, 0, "true", "false"];
    if (!taskExtinguishers)
        throw new Error(`La lista de taskExtinguishers es obligatoria.`);
    if (taskExtinguishers.length < 1)
        throw new Error(`La lista de taskExtinguishers No puede estar vacía.`);
    taskExtinguishers.forEach((extinguisher) => {
        if (extinguisher.isNewPFE && extinguisher.isService)
            throw new Error(`La tarea asignada al extintor no puede pertenecer a newPFE y service a la vez.`);
        if (!extinguisher.isNewPFE && !extinguisher.isService)
            throw new Error(`La tarea asignada al extintor es obligatoria.`);
        if (!extinguisher.extinguisherTypeId)
            throw new Error(`Falta el extinguisherTypeId en uno de los extintores nuevos.`);
        if (!extinguisher.extinguisherSizeId)
            throw new Error(`Falta el extinguisherSizeId en uno de los extintores nuevos.`);
        if (!types.find((type) => type.extinguisherTypeId == extinguisher.extinguisherTypeId || false))
            throw new Error(`El extinguisherTypeId no es válido.`);
        if (!sizes.find((size) => size.extinguisherSizeId == extinguisher.extinguisherSizeId || false))
            throw new Error(`El extinguisherSizeId no es válido.`);
        if (extinguisher.isNewPFE && !bolleanValus.includes(extinguisher.isNewPFE))
            throw new Error(`El isNewPFE debe ser un valor booleano.`);
        if (extinguisher.isService && !bolleanValus.includes(extinguisher.isService))
            throw new Error(`El isService debe ser un valor booleano.`);
    });
});
exports.isValidTaskExtinguishers = isValidTaskExtinguishers;
const isValidTaskId = (taskId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId)
        throw new Error("El taskId es obligatorio");
    const data = yield taskDbProcedures.getTasksByIdsProcedure(taskId);
    if (!data)
        throw new Error("No es un taskId válido");
    req.body.task = data;
});
exports.isValidTaskId = isValidTaskId;
const isValidToEditTask = (state, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, taskDescription, taskStartNewExtinguisherCount, taskStartRechargedExtinguisherCount, taskExpectedEndDate, buildingId, } = req.body;
    const { task } = req.body;
    const invalidValue = ['Creada', 'Asignada'];
    if (!invalidValue.includes(task.taskState))
        throw new Error(`Estas tratando de editar una tarea ${task.taskState}.`);
    if (task.taskState == "Asignada" && (clientId || taskDescription || taskStartNewExtinguisherCount || taskStartRechargedExtinguisherCount || taskExpectedEndDate || buildingId)) {
        throw new Error(`Estás tratando de editar una tarea que ha sido asignada.`);
    }
    ;
});
exports.isValidToEditTask = isValidToEditTask;
const isValidToAssign = (state, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    const invalidValue = ['Creada', 'Asignada'];
    if (!invalidValue.includes(task.taskState))
        throw new Error(`No se puede completar la tarea.`);
});
exports.isValidToAssign = isValidToAssign;
const isValidToComplete = (state, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    if (task.taskState != "Asignada")
        throw new Error(`No se puede completar la tarea.`);
});
exports.isValidToComplete = isValidToComplete;
const isValidToCancel = (state, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    if (!(task.taskState == "Asignada" || task.taskState == "Creada"))
        throw new Error(`No se puede cancelar la tarea.`);
});
exports.isValidToCancel = isValidToCancel;
const isValidToReport = (state, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    if (task.taskState != "Completada")
        throw new Error(`No se puede reportar la tarea.`);
});
exports.isValidToReport = isValidToReport;
const isValidArrayOfTaskExtinguisher = (array, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    array.forEach((taskExtinguisher, index) => {
        if (task.taskId != taskExtinguisher.taskId)
            throw new Error(`La tarea asignada no coincide con el extintor #${index} a realizar servicio.`);
        if (!taskExtinguisher.oldTag)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.newTag)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.latitude)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.longitude)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.serialNumber)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.agentComments)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.oldTag)
            throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
    });
});
exports.isValidArrayOfTaskExtinguisher = isValidArrayOfTaskExtinguisher;
//# sourceMappingURL=validations_tasks.js.map