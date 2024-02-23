import { Request } from "express";
import { User } from "../interfaces/user_interface";

export const permissionModuleClient: any = async (usuario: User, { req }: { req: Request }) => {
    if (!usuario.userPermissions.clientPermission) throw new Error('No tiene permisos para modificar los clientes')
}

export const permissionModuleUser: any = async (usuario: User, { req }: { req: Request }) => {
    if (!usuario.userPermissions.userPermission) throw new Error('No tiene permisos para modificar los usuarios')
}

export const permissionModuleTask: any = async (usuario: User, { req }: { req: Request }) => {
    if (!usuario.userPermissions.taskPermission) throw new Error('No tiene permisos para modificar las tareas')
}

export const permissionModuleReportTask: any = async (usuario: User, { req }: { req: Request }) => {
    if (!usuario.userPermissions.reportTaskPermission) throw new Error('No tiene permisos para modificar los reportes de las tareas')
}

export const permissionModuleAuditLog: any = async (usuario: User, { req }: { req: Request }) => {
    if (!usuario.userPermissions.auditLogPermission) throw new Error('No tiene permisos para modificar los logs de auditoria')
}

export const permissionModuleOrganization: any = async (usuario: User, { req }: { req: Request }) => {
    if (!usuario.userPermissions.organizationPermission) throw new Error('No tiene permisos para modificar la organización')
}