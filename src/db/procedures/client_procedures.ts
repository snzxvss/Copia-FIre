import db from "../connection";
import { Client } from '../../interfaces/client_interface';

export class ClientDbProcedures {
    private db: typeof db;

    constructor() {
        this.db = db;
    }
    public async getClientsDataProcedure(filter?: { searchKey?: any, finalDate?: any, startDate?: any }): Promise<Array<Client>> {
        const [clients]: any = await this.db.query('CALL GetClientsData(:filter)', {
            replacements: {
                filter: JSON.stringify(filter) || JSON.stringify({})
            }
        }) as { clients: Array<any> }[];
        

        if (!clients.clients) clients.clients = []

        if (clients.length) clients.forEach((client: Client) => {
            if (!client.clientContacts) client.clientContacts = [];
            client.clientContacts.forEach((contact) => {
                if (!contact.contactEmails) contact.contactEmails = []
                if (!contact.contactPhoneNumbers) contact.contactPhoneNumbers = []
            })
        })

        return clients.clients;
    }

    public async createClientProcedure(newClientData: object): Promise<any> {
        const [response]: any = await this.db.query('CALL CreateClient(:newClientData)', {
            replacements: {
                newClientData: JSON.stringify(newClientData) || JSON.stringify({})
            }
        }) as { response: string, clientId: number }[]

        return {response :response.response, clientId: response.clientId};
    }

    public async updateClientDataProcedure(newClientData: object): Promise<String> {
        const [response] = await this.db.query('CALL UpdateClientData(:newClientData)', {
            replacements: {
                newClientData: JSON.stringify(newClientData) || JSON.stringify({})
            }
        }) as { response: string }[];

        return response.response;
    }

    public async getClientsDataByIdsProcedure(ids?: Array<number> | number): Promise<Client> {

        const isArray = Array.isArray(ids)
        const arrayOfIds = [];

        if (!isArray) {
            arrayOfIds.push(ids)
        } else { arrayOfIds.push(...ids) }

        const [clients]: any = await this.db.query('CALL GetClientsDataByIds(:ids)', {
            replacements: {
                ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
            }
        }) as { clients: Array<any> }[]

        if (clients.clients) clients.clients = clients.clients.length == 1 ? clients.clients[0] : clients.clients

        return clients.clients;
    }

    public async GetClientsDataToReport(jsonFilter: { startDate: string, finalDate: string, searchKey: string }): Promise<Client[]> {
        const { startDate, finalDate, searchKey } = jsonFilter;
    
        const [clients]: any = await this.db.query('CALL GetClientsDataToReport(:jsonFilter)', {
            replacements: {
                jsonFilter: JSON.stringify({ startDate, finalDate, searchKey })
            }
        }) as Client[];
    
        return clients;
    }

    public async createClientContactProcedure(newClientContact: object): Promise<any> {
        const [response] = await this.db.query('CALL CreateClientContact(:newClientContact)', {
            replacements: {
                newClientContact: JSON.stringify(newClientContact) || JSON.stringify({})
            }
        }) as { response: any, new_client_contact_id: any }[];

        return { response: response.response, client_contact_id: response.new_client_contact_id };
    }
    //?============================<MODULO DE ACTUALIZACION DEL CONTACTO DE UN CLIENTE>============================?
    //? ACTUALIZACION DE LOS NOMBRES DEL CONTACTO DEL CLIENTE
    public async updateClientContactProcedure(newClientContactData: object): Promise<any> {
        const [response] = await this.db.query('CALL UpdateClientContact(:newClientContactData)', {
            replacements: {
                newClientContactData: JSON.stringify(newClientContactData) || JSON.stringify({})
            }
        }) as { response: any }[];


        return { response: response.response };
    }
    //? ACTUALIZACION DEL NUMERO DE TELEFONO DEL CONTACTO DEL CLIENTE
    public async updateClientContactPhoneProcedure(newClientContactPhone: object): Promise<any> {
        const [response] = await this.db.query('CALL UpdateClientContactPhone(:newClientContactPhone)', {
            replacements: {
                newClientContactPhone: JSON.stringify(newClientContactPhone) || JSON.stringify({})
            }
        }) as { response: any }[];


        return { response: response.response };
    }
    //? ACTUALIZACION DEL EMAIL DEL CONTACTO DEL CLIENTE
    public async updateClientContactEmailProcedure(newClientContactEmail: object): Promise<any> {
        const [response] = await this.db.query('CALL UpdateClientContactEmail(:newClientContactEmail)', {
            replacements: {
                newClientContactEmail: JSON.stringify(newClientContactEmail) || JSON.stringify({})
            }
        }) as { response: any }[];


        return { response: response.response };
    }


    //? CREACION DE NUMEROS DE CONTACTO DE UN CLIENTE
    public async createClientContactNumberProcedure(newClientContactNumber: object): Promise<any> {
        const [response] = await this.db.query('CALL CreateClientContactNumber(:newClientContactNumber)', {
            replacements: {
                newClientContactNumber: JSON.stringify(newClientContactNumber) || JSON.stringify({})
            }
        }) as { response: any }[];

        console.log(JSON.stringify(newClientContactNumber));

        return { response: response.response };
    }
    //? CREACION DE EMAIL DE CONTACTO DE UN CLIENTE
    public async createClientContactEmailProcedure(newClientContactEmail: object): Promise<any> {
        const [response] = await this.db.query('CALL CreateClientContactEmail(:newClientContactEmail)', {
            replacements: {
                newClientContactEmail: JSON.stringify(newClientContactEmail) || JSON.stringify({})
            }
        }) as { response: any }[];

        return { response: response.response };
    }
    //? DELETE DE NUMERO DE CONTACTO DE UN CLIENTE
    public async deleteClientContactNumberProcedure(clientContactNumberToDelete: object): Promise<any> {
        console.log(clientContactNumberToDelete);
        console.log(`${JSON.stringify(clientContactNumberToDelete)}`);

        const [response] = await this.db.query('CALL DeleteClientContactNumber(:clientContactNumberToDelete)', {
            replacements: {
                clientContactNumberToDelete: JSON.stringify(clientContactNumberToDelete) || JSON.stringify({})
            }
        }) as { response: any }[];
        return { response: response.response };
    }
    //? DELETE DE EMAIL DE CONTACTO DE UN CLIENTE
    public async deleteClientContactEmailProcedure(newClientContactEmail: object): Promise<any> {
        const [response] = await this.db.query('CALL DeleteClientContactEmail(:newClientContactEmail)', {
            replacements: {
                newClientContactEmail: JSON.stringify(newClientContactEmail) || JSON.stringify({})
            }
        }) as { response: any }[];


        return { response: response.response };
    }
    //? DELETE DE EMAIL DE CONTACTO DE UN CLIENTE
    public async deleteClientContactProcedure(clientContact: object): Promise<any> {
        const [response] = await this.db.query('CALL DeleteClientContact(:clientContact)', {
            replacements: {
                clientContact: JSON.stringify(clientContact) || JSON.stringify({})
            }
        }) as { response: any }[];


        return { response: response.response };
    }
    //? ================================<MODULO DEL INFO CONTROLLER>================================
    //? OBTENER LOS CONTACTOS DE UN CLIENTE
    public async GetClientContactProcedure(clientContactId: number): Promise<any> {

        const isArray = Array.isArray(clientContactId)
        const arrayOfIds = [];

        if (!isArray) {
            arrayOfIds.push(clientContactId)
        } else { arrayOfIds.push(...clientContactId) }

        const [response] = await this.db.query('CALL GetClientsContacts(:clientContactId)', {
            replacements: {
                clientContactId: JSON.stringify(arrayOfIds) || JSON.stringify([])
            }
        }) as { response: any }[];

        if (response.response) response.response = response.response.length == 1 ? response.response[0] : response.response

        return response.response;
    }

    public async getClientBuildingsProcedure(clientId?: object): Promise<any> {

        const [response] = await this.db.query('CALL GetClientBuildings(:clientId)',
            {
                replacements: {
                    clientId: JSON.stringify(clientId) || JSON.stringify({})
                }
            }) as { buildings: any }[];

        if (response.buildings) response.buildings = response.buildings.length == 1 ? response.buildings[0] : response.buildings

        return response.buildings;
    }

    public async createClientBuildingProcedure(clientBuildingData: object): Promise<string> {
        const [response] = await this.db.query("CALL CreateClientBuilding(:clientBuildingData)", {
            replacements: {
                clientBuildingData: JSON.stringify(clientBuildingData) || JSON.stringify({})
            }
        }) as { response: string }[]

        return response.response
    }

    public async updateClientBuildingProcedure(clientBuildingData: object): Promise<string> {
        const [response] = await this.db.query("CALL UpdateClientBuilding(:clientBuildingData)", {
            replacements: {
                clientBuildingData: JSON.stringify(clientBuildingData) || JSON.stringify({})
            }
        }) as { response: string }[]

        return response.response
    }

}