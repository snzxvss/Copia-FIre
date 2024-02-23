export interface TaskExtinguisher {
    taskId: number;
    oldTag: string;
    newTag: string;
    latitude: string;
    longitude: string;
    coordinate?: string;
    creationDate: string;
    serialNumber: string;
    agentComments: string;
    adminCommments?: string;
    typeSizeExtinguisherId?: number;
}