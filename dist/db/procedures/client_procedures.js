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
exports.ClientDbProcedures = void 0;
const connection_1 = __importDefault(require("../connection"));
class ClientDbProcedures {
    constructor() {
        this.db = connection_1.default;
    }
    getClientsDataProcedure(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const [clients] = yield this.db.query('CALL GetClientsData(:filter)', {
                replacements: {
                    filter: JSON.stringify(filter) || JSON.stringify({})
                }
            });
            if (!clients.clients)
                clients.clients = [];
            if (clients.length)
                clients.forEach((client) => {
                    if (!client.clientContacts)
                        client.clientContacts = [];
                    client.clientContacts.forEach((contact) => {
                        if (!contact.contactEmails)
                            contact.contactEmails = [];
                        if (!contact.contactPhoneNumbers)
                            contact.contactPhoneNumbers = [];
                    });
                });
            return clients.clients;
        });
    }
    createClientProcedure(newClientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateClient(:newClientData)', {
                replacements: {
                    newClientData: JSON.stringify(newClientData) || JSON.stringify({})
                }
            });
            return { response: response.response, clientId: response.clientId };
        });
    }
    updateClientDataProcedure(newClientData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateClientData(:newClientData)', {
                replacements: {
                    newClientData: JSON.stringify(newClientData) || JSON.stringify({})
                }
            });
            return response.response;
        });
    }
    getClientsDataByIdsProcedure(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const isArray = Array.isArray(ids);
            const arrayOfIds = [];
            if (!isArray) {
                arrayOfIds.push(ids);
            }
            else {
                arrayOfIds.push(...ids);
            }
            const [clients] = yield this.db.query('CALL GetClientsDataByIds(:ids)', {
                replacements: {
                    ids: JSON.stringify(arrayOfIds) || JSON.stringify([])
                }
            });
            if (clients.clients)
                clients.clients = clients.clients.length == 1 ? clients.clients[0] : clients.clients;
            return clients.clients;
        });
    }
    createClientContactProcedure(newClientContact) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateClientContact(:newClientContact)', {
                replacements: {
                    newClientContact: JSON.stringify(newClientContact) || JSON.stringify({})
                }
            });
            return { response: response.response, client_contact_id: response.new_client_contact_id };
        });
    }
    //?============================<MODULO DE ACTUALIZACION DEL CONTACTO DE UN CLIENTE>============================?
    //? ACTUALIZACION DE LOS NOMBRES DEL CONTACTO DEL CLIENTE
    updateClientContactProcedure(newClientContactData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateClientContact(:newClientContactData)', {
                replacements: {
                    newClientContactData: JSON.stringify(newClientContactData) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? ACTUALIZACION DEL NUMERO DE TELEFONO DEL CONTACTO DEL CLIENTE
    updateClientContactPhoneProcedure(newClientContactPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateClientContactPhone(:newClientContactPhone)', {
                replacements: {
                    newClientContactPhone: JSON.stringify(newClientContactPhone) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? ACTUALIZACION DEL EMAIL DEL CONTACTO DEL CLIENTE
    updateClientContactEmailProcedure(newClientContactEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL UpdateClientContactEmail(:newClientContactEmail)', {
                replacements: {
                    newClientContactEmail: JSON.stringify(newClientContactEmail) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? CREACION DE NUMEROS DE CONTACTO DE UN CLIENTE
    createClientContactNumberProcedure(newClientContactNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateClientContactNumber(:newClientContactNumber)', {
                replacements: {
                    newClientContactNumber: JSON.stringify(newClientContactNumber) || JSON.stringify({})
                }
            });
            console.log(JSON.stringify(newClientContactNumber));
            return { response: response.response };
        });
    }
    //? CREACION DE EMAIL DE CONTACTO DE UN CLIENTE
    createClientContactEmailProcedure(newClientContactEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL CreateClientContactEmail(:newClientContactEmail)', {
                replacements: {
                    newClientContactEmail: JSON.stringify(newClientContactEmail) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? DELETE DE NUMERO DE CONTACTO DE UN CLIENTE
    deleteClientContactNumberProcedure(clientContactNumberToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(clientContactNumberToDelete);
            console.log(`${JSON.stringify(clientContactNumberToDelete)}`);
            const [response] = yield this.db.query('CALL DeleteClientContactNumber(:clientContactNumberToDelete)', {
                replacements: {
                    clientContactNumberToDelete: JSON.stringify(clientContactNumberToDelete) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? DELETE DE EMAIL DE CONTACTO DE UN CLIENTE
    deleteClientContactEmailProcedure(newClientContactEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL DeleteClientContactEmail(:newClientContactEmail)', {
                replacements: {
                    newClientContactEmail: JSON.stringify(newClientContactEmail) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? DELETE DE EMAIL DE CONTACTO DE UN CLIENTE
    deleteClientContactProcedure(clientContact) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL DeleteClientContact(:clientContact)', {
                replacements: {
                    clientContact: JSON.stringify(clientContact) || JSON.stringify({})
                }
            });
            return { response: response.response };
        });
    }
    //? ================================<MODULO DEL INFO CONTROLLER>================================
    //? OBTENER LOS CONTACTOS DE UN CLIENTE
    GetClientContactProcedure(clientContactId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isArray = Array.isArray(clientContactId);
            const arrayOfIds = [];
            if (!isArray) {
                arrayOfIds.push(clientContactId);
            }
            else {
                arrayOfIds.push(...clientContactId);
            }
            const [response] = yield this.db.query('CALL GetClientsContacts(:clientContactId)', {
                replacements: {
                    clientContactId: JSON.stringify(arrayOfIds) || JSON.stringify([])
                }
            });
            if (response.response)
                response.response = response.response.length == 1 ? response.response[0] : response.response;
            return response.response;
        });
    }
    getClientBuildingsProcedure(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query('CALL GetClientBuildings(:clientId)', {
                replacements: {
                    clientId: JSON.stringify(clientId) || JSON.stringify({})
                }
            });
            if (response.buildings)
                response.buildings = response.buildings.length == 1 ? response.buildings[0] : response.buildings;
            return response.buildings;
        });
    }
    createClientBuildingProcedure(clientBuildingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query("CALL CreateClientBuilding(:clientBuildingData)", {
                replacements: {
                    clientBuildingData: JSON.stringify(clientBuildingData) || JSON.stringify({})
                }
            });
            return response.response;
        });
    }
    updateClientBuildingProcedure(clientBuildingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [response] = yield this.db.query("CALL UpdateClientBuilding(:clientBuildingData)", {
                replacements: {
                    clientBuildingData: JSON.stringify(clientBuildingData) || JSON.stringify({})
                }
            });
            return response.response;
        });
    }
}
exports.ClientDbProcedures = ClientDbProcedures;
//# sourceMappingURL=client_procedures.js.map