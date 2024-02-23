import { Request } from 'express'

export const isStringOrNull = (value: null | string) => value === null || typeof value === 'string';

export const isBooleanValue = (value: boolean | number | string) => value == true || value == false || value == "true" || value == "false" || value == 1 || value == 0;

export const validateFile: any = async (value: any, { req }: { req: Request }) => {

    try {

        if (req.files && req.files.profilePhoto) {
            const { profilePhoto }: any = req.files;
            const allowedExtensions = ['.jpg', '.png'];
            // 1000000 = 1mb
            if (profilePhoto.size > 1000000) throw new Error('El archivo es demasiado grande (El tamaño máximo permitido es de 1 MB)');

            const fileExt = '.' + profilePhoto.name.split('.').pop().toLowerCase();
            req.body.fileExt = fileExt;

            if (allowedExtensions.includes(fileExt) != true) throw new Error('El archivo no es válido (Solamente se aceptan archivos .png y .jpg)');

        }
    } catch (error: any) {
        if (error.message == "Cannot destructure property 'profilePhoto' of 'req.files' as it is null.") throw new Error("No se puede enviar un parametro null para la imagen de perfil");
        console.log(error.message);
        throw new Error(error);
    }
};

export const isArrayOfEmails: any = async (value: Array<any>, { req }: { req: Request }) => {
    if (value.length < 1) throw new Error("El array no puede ser nulo")
    const uniqueEmails = new Set(); // Utilizamos un Set para mantener un conjunto de direcciones únicas
    value.forEach((item) => {

        if (typeof item != "string") throw new Error("El array debe ser solo de strings")
        if (uniqueEmails.has(item)) {
            throw new Error("El array contiene direcciones de correo duplicadas");
        } else {
            uniqueEmails.add(item); // Agregamos el correo al conjunto si no existe
        }
        if (!item.match(/^(\w+[.,\-,+,_]?\w+)+@(\w+[.,\-]?\w+).\w{2,}$/)) throw new Error("El array contiene un email invalido")
    })
}

export const isArrayOfPhoneNumbers: any = async (value: Array<any>, { req }: { req: Request }) => {
    if (value.length < 1) throw new Error("El array no puede ser nulo")
    const uniqueNumbers = new Set(); // Utilizamos un Set para mantener un conjunto de direcciones únicas
    value.forEach((item) => {
        if (typeof item != "string") throw new Error("El array debe ser solo de strings")
        if (uniqueNumbers.has(item)) {
            throw new Error("El array contiene numeros duplicadas");
        } else {
            uniqueNumbers.add(item); // Agregamos el correo al conjunto si no existe
        }
        if (!item.match(/^(?:\+1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/gm)) throw new Error("El array contiene un numero de telefeono invalido")
    })
}