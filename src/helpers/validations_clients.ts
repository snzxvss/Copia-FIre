import { Request, RequestHandler, Response } from "express";
import { ClientDbProcedures } from "../db/procedures/client_procedures";



const clientDbProcedures = new ClientDbProcedures;
export const isValidClientId: any = async (clientId: number, { req }: { req: Request }) => {
    const data = await clientDbProcedures.getClientsDataByIdsProcedure(clientId);

    if (!clientId) throw new Error('El clientId es obligatorio')
    if (!data) throw new Error('No es un id de cliente valido')
    if (Array.isArray(clientId)) throw new Error('Solo se permiten valores numericos');
}

export const isValidClientContactId: any = async (contactId: number, { req }: { req: Request }) => {


    const { clientId } = req.body
    if (!contactId) throw new Error(`El contactId es obligatorio`)
    const data = await clientDbProcedures.getClientsDataByIdsProcedure(clientId);
    if (data) {
        let equal = false;

        data.clientContacts.forEach((contac: any) => {
            if (contac.contactId == contactId) return equal = true;
        });

        if (!equal) throw new Error('No es un id de contacto valido');
    }



}

export const emailsClientContactExists: any = async (emails: Array<any>, { req }: { req: Request }) => {

    const { contactId } = req.body
    const match: Array<any> = [];
    let misMatch: Array<any> = [];
    let equal = 0;

    const contact = await clientDbProcedures.GetClientContactProcedure(contactId);

    emails.forEach((element: any, indexElement) => {

        if (!contact.contactEmails) contact.contactEmails = []

        contact.contactEmails.forEach((item: any, indexItem: any) => {
            if (element == item) {
                equal += 1;
                match.push(element);
            } else if (element != item && !misMatch.includes(element) && !match.includes(element)) misMatch.push(element);

        });
    });

    misMatch = misMatch.filter((item) => !match.includes(item))
    if (!misMatch.length) misMatch.push(...emails)

    if (equal < emails.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los correos" : "El correo"} ${misMatchToShow} no existen en el contacto seleccionado`);
    }
}

export const phoneNumbersClientContactExits: any = async (numbers: Array<any>, { req }: { req: Request }) => {
    const { contactId } = req.body
    const match: Array<any> = [];
    let misMatch: Array<any> = [];
    let equal = 0;

    const contact = await clientDbProcedures.GetClientContactProcedure(contactId);
    numbers.forEach((element: any) => {
        if (!contact.contactPhoneNumbers) contact.contactPhoneNumbers = []
        contact.contactPhoneNumbers.forEach((item: any) => {
            if (element == item) {
                equal += 1;
                match.push(element);
            } else if (element != item && !misMatch.includes(element) && !match.includes(element)) misMatch.push(element);

        });
    });

    misMatch = misMatch.filter((item) => !match.includes(item));
    
    if (!misMatch.length) misMatch.push(...numbers);

    if (equal < numbers.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los numeros" : "El numero"} ${misMatchToShow} no existen en el contacto seleccionado`);
    }
}

export const emailsClientContactToUpdate: any = async (updateEmails: Array<any>, { req }: { req: Request }) => {

    const { contactId } = req.body
    const match: Array<any> = [];
    const newEmailSet = new Set
    let misMatch: Array<any> = [];
    let equal = 0;

    const contact = await clientDbProcedures.GetClientContactProcedure(contactId);

    const newPhoneExistPromises = updateEmails.map(async (element: { oldEmail: string, newEmail: string }) => {
        const newEmailExist = await clientDbProcedures.getClientsDataProcedure({ searchKey: element.newEmail });
        if (newEmailExist.length) throw new Error(`El email a actualizar '${element.newEmail}' ya existe`)
    });
    const newPhoneExistResults = await Promise.all(newPhoneExistPromises);
    // const exist = newPhoneExistResults.some((exist) => exist);

    if (!contact.contactEmails) contact.contactEmails = []

    updateEmails.forEach((element: { oldEmail: string, newEmail: string }, indexElement) => {


        if (newEmailSet.has(element.newEmail)) {
            throw new Error(`El nuevo correo ${element.newEmail} ya existe en la lista de correos a actualizar`);
        } else {
            newEmailSet.add(element.newEmail);
        }

        contact.contactEmails.forEach((item: any, indexItem: any) => {
            if (element.oldEmail == item) {
                equal += 1;
                match.push(element.oldEmail);

                if (element.newEmail == item) throw new Error("El nuevo correo no puede ser igual al anterior")
                if (!element.newEmail.match(/^(\w+[.,\-,+,_]?\w+)+@(\w+[.,\-]?\w+).\w{2,}$/)) throw new Error("El nuevo correo no es un correo valido")
            } else if (element.oldEmail != item && !misMatch.includes(element.oldEmail) && !match.includes(element.oldEmail)) misMatch.push(element.oldEmail);
        });
    });

    misMatch = misMatch.filter((item) => !match.includes(item))


    if (!misMatch.length) updateEmails.forEach((emails, index) => {
        return misMatch.push(emails.oldEmail)
    });

    if (equal < updateEmails.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los correos" : "El correo"} ${misMatchToShow} no existen en el contacto seleccionado`);
    };
}

export const phoneNumbersClientContactToUpdate: any = async (updateNumbers: Array<any>, { req }: { req: Request }) => {
    const { contactId } = req.body
    const match: Array<any> = [];
    const newNumberSet = new Set;
    let misMatch: Array<any> = [];
    let equal = 0;

    const contact = await clientDbProcedures.GetClientContactProcedure(contactId);


    const newPhoneExistPromises = updateNumbers.map(async (element: { oldNumber: string, newNumber: string }) => {
        const newNumberExist = await clientDbProcedures.getClientsDataProcedure({ searchKey: element.newNumber });
        if (newNumberExist.length) throw new Error(`El numero a actualizar '${element.newNumber}' ya existe`)
    });
    const newPhoneExistResults = await Promise.all(newPhoneExistPromises);
    // const exist = newPhoneExistResults.some((exist) => exist);

    if (!contact.contactPhoneNumbers) contact.contactPhoneNumbers = []

    updateNumbers.forEach((element: { oldNumber: string, newNumber: string }, indexElement) => {

        if (newNumberSet.has(element.newNumber)) {
            throw new Error(`El nuevo número ${element.newNumber} ya existe en la lista de números a actualizar`);
        } else {
            newNumberSet.add(element.newNumber);
        }

        contact.contactPhoneNumbers.forEach((item: any, indexItem: any) => {

            if (element.oldNumber == item) {
                equal += 1;
                match.push(element.oldNumber);

                if (element.newNumber == item) throw new Error("El nuevo numero no puede ser igual al anterior");
                if (!element.newNumber.match(/^(?:\+1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/gm)) throw new Error("El nuevo numero no es un numero valido");
            } else if (element.oldNumber != item && !misMatch.includes(element.oldNumber) && !match.includes(element.oldNumber)) misMatch.push(element.oldNumber);

        });
    });

    misMatch = misMatch.filter((item) => !match.includes(item))

    console.log({ match, misMatch });

    if (!misMatch.length) updateNumbers.forEach((numbers, index) => {
        return misMatch.push(numbers.oldNumber)
    });

    if (equal < updateNumbers.length) {
        const misMatchToShow = `'${misMatch.join("', '")}'`;
        throw new Error(`${misMatch.length > 1 ? "Los numeros" : "El numero"} ${misMatchToShow} no existe${misMatch.length > 1 ? "n" : ""} en el contacto seleccionado`);
    }
}