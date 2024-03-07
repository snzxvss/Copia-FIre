import { Request } from "express";
import { TaskDbProcedures } from "../db/procedures/task_procedures";
import { TypeSizeExtinguisher } from "../interfaces/typeSizeExtinguisher_interface";
import { Task } from "../interfaces/task_interface";
import { TaskExtinguisher } from "../interfaces/extinguisher_interface";

const taskDbProcedures = new TaskDbProcedures

export const isValidTaskStateId: any = async (taskStateId: any, { req }: { req: Request }) => {
    const data = await taskDbProcedures.getTaskStatesProcedure()

    const equal = data.find((taskState) => taskStateId == taskState.taskStateId) || false;

    if (!equal) throw new Error("No es un fecdb_task_state_id válido");

}
export const isValidTaskExtinguishers: any = async (taskExtinguishers: Array<TypeSizeExtinguisher>) => {

    const types = await taskDbProcedures.getTaskTypesProcedure();
    const sizes = await taskDbProcedures.getTaskSizesProcedure();
    const bolleanValus = [true, false, 1, 0, "true", "false"]

    if (!taskExtinguishers) throw new Error(`La lista de taskExtinguishers es obligatoria.`)
    if (taskExtinguishers.length < 1) throw new Error(`La lista de taskExtinguishers No puede estar vacía.`)

    taskExtinguishers.forEach((extinguisher) => {
        if (extinguisher.isNewPFE && extinguisher.isService) throw new Error(`La tarea asignada al extintor no puede pertenecer a newPFE y service a la vez.`)
        if (!extinguisher.isNewPFE && !extinguisher.isService) throw new Error(`La tarea asignada al extintor es obligatoria.`)

        if (!extinguisher.extinguisherTypeId) throw new Error(`Falta el extinguisherTypeId en uno de los extintores nuevos.`);
        if (!extinguisher.extinguisherSizeId) throw new Error(`Falta el extinguisherSizeId en uno de los extintores nuevos.`);

        if (!types.find((type) => type.extinguisherTypeId == extinguisher.extinguisherTypeId || false)) throw new Error(`El extinguisherTypeId no es válido.`);
        if (!sizes.find((size) => size.extinguisherSizeId == extinguisher.extinguisherSizeId || false)) throw new Error(`El extinguisherSizeId no es válido.`);
        if (extinguisher.isNewPFE && !bolleanValus.includes(extinguisher.isNewPFE)) throw new Error(`El isNewPFE debe ser un valor booleano.`);
        if (extinguisher.isService && !bolleanValus.includes(extinguisher.isService)) throw new Error(`El isService debe ser un valor booleano.`);
    })
}

export const isValidTaskId: any = async (taskId: Array<number> | number, { req }: { req: Request }) => {
    if (!taskId) throw new Error("El taskId es obligatorio");

    const data = await taskDbProcedures.getTasksByIdsProcedure(taskId);

    if (!data) throw new Error("No es un taskId válido");

    req.body.task = data;
}

export const isValidToEditTask: any = async (state: string, { req }: { req: Request }) => {

    const { clientId, taskDescription, taskStartNewExtinguisherCount,
        taskStartRechargedExtinguisherCount, taskExpectedEndDate, buildingId, } = req.body;

    const { task }: { task: Task } = req.body;
    const invalidValue = ['Creada', 'Asignada'];

    if (!invalidValue.includes(task.taskState)) throw new Error(`Estas tratando de editar una tarea ${task.taskState}.`)

    if (task.taskState == "Asignada" && (clientId || taskDescription || taskStartNewExtinguisherCount || taskStartRechargedExtinguisherCount || taskExpectedEndDate || buildingId)) {
        throw new Error(`Estás tratando de editar una tarea que ha sido asignada.`);
    };
}

export const isValidToAssign: any = async (state: string, { req }: { req: Request }) => {
    const { task }: { task: Task } = req.body;
    const invalidValue = ['Creada', 'Asignada'];
    if (!invalidValue.includes(task.taskState)) throw new Error(`No se puede asignar la tarea.`)
}
export const isValidToComplete: any = async (state: string, { req }: { req: Request }) => {
    const { task }: { task: Task } = req.body;
    if (task.taskState != "Asignada") throw new Error(`No se puede completar la tarea.`)
}
export const isValidToCancel: any = async (state: string, { req }: { req: Request }) => {
    const { task }: { task: Task } = req.body;
    if (!(task.taskState == "Asignada" || task.taskState == "Creada")) throw new Error(`No se puede cancelar la tarea.`)
}
export const isValidToReport: any = async (state: string, { req }: { req: Request }) => {
    const { task }: { task: Task } = req.body;
    if (task.taskState != "Completada") throw new Error(`No se puede reportar la tarea.`)
}

export const isValidArrayOfTaskExtinguisher: any = async (array: Array<TaskExtinguisher>, { req }: { req: Request }) => {

    const { task }: { task: Task } = req.body;

    array.forEach((taskExtinguisher, index) => {

        if (task.taskId != taskExtinguisher.taskId) throw new Error(`La tarea asignada no coincide con el extintor #${index} a realizar servicio.`);
        if (!taskExtinguisher.oldTag) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.newTag) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.latitude) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.longitude) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.serialNumber) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.agentComments) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);
        if (!taskExtinguisher.oldTag) throw new Error(`El OldTag en el exintor #${index} es obligatorio`);


    });
};