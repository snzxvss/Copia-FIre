export interface Client {
    clientId: number,
    clientName: string,
    clientTagId: string,
    clientAddress: {
        zipCode: string,
        stateName: string,
        streetName: string,
        addressBorough: string,
        cityName: string,
        accommodationType: string,
    },
    clientContacts: Array<{
        contactEmails: Array<string>,
        contactId: number,
        contactName: {
            contactLastName: string,
            contactFirstName: string
        },
        contactPhoneNumbers: Array<string>
    }>,
    clientCreationDate: Date,
    clientBuildingCount?: number,
    buildings?: Array<{
        building_id: number
        building_name: string
        building_fluors: number
        building_type_id: number
        building_surface_square_meters: number,
        buildingAddress: {
            zipCode: string,
            stateName: string,
            streetName: string,
            addressBorough: string,
            cityName: string,
            accommodationType: string
        },
    }>
}