export interface Task {
    taskId: number;
    taskState: string;
    clientName: string;
    taskCreator: string;
    assignedUser: string | null;
    buildingFloors: number;
    buildingAddress: {
        zipCode: string;
        stateName: string;
        streetName: string;
        addressBorough: string;
        cityName: string;
        accommodationType: string;
    };
    taskDescription: string;
    buildingTypeName: string;
    taskCreationDate: string;
    taskExpectedEndDate: string;
    buildingSurfaceSquareMeters: number;
    taskStartNewExtinguisherCount: number;
    taskStartRechargedExtinguisherCount: number;
    taskEndNewExtinguisherCount: number;
    taskEndRechargedExtinguisherCount: number;
    extinguisherType: number; // Agregar esta propiedad para el tipo de extintor
    extinguisherSize: number; // Agregar esta propiedad para el tamaño del extintor
}
