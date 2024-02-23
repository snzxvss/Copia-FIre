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
exports.phoneNumbersClientContactToUpdate = exports.emailsClientContactToUpdate = exports.phoneNumbersClientContactExits = exports.emailsClientContactExists = exports.isValidClientContactId = exports.isValidClientId = void 0;
const client_procedures_1 = require("../db/procedures/client_procedures");
const clientDbProcedures = new client_procedures_1.ClientDbProcedures;
const isValidClientId = (clientId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield clientDbProcedures.getClientsDataByIdsProcedure(clientId);
    if (!clientId)
        throw new Error('El clientId es obligatorio');
    if (!data)
        throw new Error('No es un id de cliente valido');
    if (Array.isArray(clientId))
        throw new Error('Solo se permiten valores numericos');
});
exports.isValidClientId = isValidClientId;
const isValidClientContactId = (contactId, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId } = req.body;
    if (!contactId)
        throw new Error(`El contactId es obligatorio`);
    const data = yield clientDbProcedures.getClientsDataByIdsProcedure(clientId);
    if (data) {
        let equal = false;
        data.clientContacts.forEach((contac) => {
            if (contac.contactId == contactId)
                return equal = true;
        });
        if (!equal)
            throw new Error('No es un id de contacto valido');
    }
});
exports.isValidClientContactId = isValidClientContactId;
const emailsClientContactExists = (emails, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.body;
    const match = [];
    let misMatch = [];
    let equal = 0;
    const contact = yield clientDbProcedures.GetClientContactProcedure(contactId);
    emails.forEach((element, indexElement) => {
        if (!contact.contactEmails)
            contact.contactEmails = [];
        contact.contactEmails.forEach((item, indexItem) => {
            if (element == item) {
                equal += 1;
                match.push(element);
            }
            else if (element != item && !misMatch.includes(element) && !match.includes(element))
                misMatch.push(element);
        });
    });
    misMatch = misMatch.filter((item) => !match.includes(item));
    if (!misMatch.length)
        misMatch.push(...emails);
    if (equal < emails.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los correos" : "El correo"} ${misMatchToShow} no existen en el contacto seleccionado`);
    }
});
exports.emailsClientContactExists = emailsClientContactExists;
const phoneNumbersClientContactExits = (numbers, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.body;
    const match = [];
    let misMatch = [];
    let equal = 0;
    const contact = yield clientDbProcedures.GetClientContactProcedure(contactId);
    numbers.forEach((element) => {
        if (!contact.contactPhoneNumbers)
            contact.contactPhoneNumbers = [];
        contact.contactPhoneNumbers.forEach((item) => {
            if (element == item) {
                equal += 1;
                match.push(element);
            }
            else if (element != item && !misMatch.includes(element) && !match.includes(element))
                misMatch.push(element);
        });
    });
    misMatch = misMatch.filter((item) => !match.includes(item));
    if (!misMatch.length)
        misMatch.push(...numbers);
    if (equal < numbers.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los numeros" : "El numero"} ${misMatchToShow} no existen en el contacto seleccionado`);
    }
});
exports.phoneNumbersClientContactExits = phoneNumbersClientContactExits;
const emailsClientContactToUpdate = (updateEmails, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.body;
    const match = [];
    const newEmailSet = new Set;
    let misMatch = [];
    let equal = 0;
    const contact = yield clientDbProcedures.GetClientContactProcedure(contactId);
    const newPhoneExistPromises = updateEmails.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const newEmailExist = yield clientDbProcedures.getClientsDataProcedure({ searchKey: element.newEmail });
        if (newEmailExist.length)
            throw new Error(`El email a actualizar '${element.newEmail}' ya existe`);
    }));
    const newPhoneExistResults = yield Promise.all(newPhoneExistPromises);
    // const exist = newPhoneExistResults.some((exist) => exist);
    if (!contact.contactEmails)
        contact.contactEmails = [];
    updateEmails.forEach((element, indexElement) => {
        if (newEmailSet.has(element.newEmail)) {
            throw new Error(`El nuevo correo ${element.newEmail} ya existe en la lista de correos a actualizar`);
        }
        else {
            newEmailSet.add(element.newEmail);
        }
        contact.contactEmails.forEach((item, indexItem) => {
            if (element.oldEmail == item) {
                equal += 1;
                match.push(element.oldEmail);
                if (element.newEmail == item)
                    throw new Error("El nuevo correo no puede ser igual al anterior");
                if (!element.newEmail.match(/^(\w+[.,\-,+,_]?\w+)+@(\w+[.,\-]?\w+).\w{2,}$/))
                    throw new Error("El nuevo correo no es un correo valido");
            }
            else if (element.oldEmail != item && !misMatch.includes(element.oldEmail) && !match.includes(element.oldEmail))
                misMatch.push(element.oldEmail);
        });
    });
    misMatch = misMatch.filter((item) => !match.includes(item));
    if (!misMatch.length)
        updateEmails.forEach((emails, index) => {
            return misMatch.push(emails.oldEmail);
        });
    if (equal < updateEmails.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los correos" : "El correo"} ${misMatchToShow} no existen en el contacto seleccionado`);
    }
    ;
});
exports.emailsClientContactToUpdate = emailsClientContactToUpdate;
const phoneNumbersClientContactToUpdate = (updateNumbers, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.body;
    const match = [];
    const newNumberSet = new Set;
    let misMatch = [];
    let equal = 0;
    const contact = yield clientDbProcedures.GetClientContactProcedure(contactId);
    const newPhoneExistPromises = updateNumbers.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const newNumberExist = yield clientDbProcedures.getClientsDataProcedure({ searchKey: element.newNumber });
        if (newNumberExist.length)
            throw new Error(`El numero a actualizar '${element.newNumber}' ya existe`);
    }));
    const newPhoneExistResults = yield Promise.all(newPhoneExistPromises);
    // const exist = newPhoneExistResults.some((exist) => exist);
    if (!contact.contactPhoneNumbers)
        contact.contactPhoneNumbers = [];
    updateNumbers.forEach((element, indexElement) => {
        if (newNumberSet.has(element.newNumber)) {
            throw new Error(`El nuevo número ${element.newNumber} ya existe en la lista de números a actualizar`);
        }
        else {
            newNumberSet.add(element.newNumber);
        }
        contact.contactPhoneNumbers.forEach((item, indexItem) => {
            if (element.oldNumber == item) {
                equal += 1;
                match.push(element.oldNumber);
                if (element.newNumber == item)
                    throw new Error("El nuevo numero no puede ser igual al anterior");
                if (!element.newNumber.match(/^(?:\+1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/gm))
                    throw new Error("El nuevo numero no es un numero valido");
            }
            else if (element.oldNumber != item && !misMatch.includes(element.oldNumber) && !match.includes(element.oldNumber))
                misMatch.push(element.oldNumber);
        });
    });
    misMatch = misMatch.filter((item) => !match.includes(item));
    console.log({ match, misMatch });
    if (!misMatch.length)
        updateNumbers.forEach((numbers, index) => {
            return misMatch.push(numbers.oldNumber);
        });
    if (equal < updateNumbers.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los numeros" : "El numero"} ${misMatchToShow} no existe${misMatch.length > 1 ? "n" : ""} en el contacto seleccionado`);
    }
});
exports.phoneNumbersClientContactToUpdate = phoneNumbersClientContactToUpdate;
//# sourceMappingURL=validations_clients.js.map