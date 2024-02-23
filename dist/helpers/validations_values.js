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
exports.isArrayOfPhoneNumbers = exports.isArrayOfEmails = exports.validateFile = exports.isBooleanValue = exports.isStringOrNull = void 0;
const isStringOrNull = (value) => value === null || typeof value === 'string';
exports.isStringOrNull = isStringOrNull;
const isBooleanValue = (value) => value == true || value == false || value == "true" || value == "false" || value == 1 || value == 0;
exports.isBooleanValue = isBooleanValue;
const validateFile = (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files && req.files.profilePhoto) {
            const { profilePhoto } = req.files;
            const allowedExtensions = ['.jpg', '.png'];
            // 1000000 = 1mb
            if (profilePhoto.size > 1000000)
                throw new Error('El archivo es demasiado grande (El tamaño máximo permitido es de 1 MB)');
            const fileExt = '.' + profilePhoto.name.split('.').pop().toLowerCase();
            req.body.fileExt = fileExt;
            if (allowedExtensions.includes(fileExt) != true)
                throw new Error('El archivo no es válido (Solamente se aceptan archivos .png y .jpg)');
        }
    }
    catch (error) {
        if (error.message == "Cannot destructure property 'profilePhoto' of 'req.files' as it is null.")
            throw new Error("No se puede enviar un parametro null para la imagen de perfil");
        console.log(error.message);
        throw new Error(error);
    }
});
exports.validateFile = validateFile;
const isArrayOfEmails = (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (value.length < 1)
        throw new Error("El array no puede ser nulo");
    const uniqueEmails = new Set(); // Utilizamos un Set para mantener un conjunto de direcciones únicas
    value.forEach((item) => {
        if (typeof item != "string")
            throw new Error("El array debe ser solo de strings");
        if (uniqueEmails.has(item)) {
            throw new Error("El array contiene direcciones de correo duplicadas");
        }
        else {
            uniqueEmails.add(item); // Agregamos el correo al conjunto si no existe
        }
        if (!item.match(/^(\w+[.,\-,+,_]?\w+)+@(\w+[.,\-]?\w+).\w{2,}$/))
            throw new Error("El array contiene un email invalido");
    });
});
exports.isArrayOfEmails = isArrayOfEmails;
const isArrayOfPhoneNumbers = (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (value.length < 1)
        throw new Error("El array no puede ser nulo");
    const uniqueNumbers = new Set(); // Utilizamos un Set para mantener un conjunto de direcciones únicas
    value.forEach((item) => {
        if (typeof item != "string")
            throw new Error("El array debe ser solo de strings");
        if (uniqueNumbers.has(item)) {
            throw new Error("El array contiene numeros duplicadas");
        }
        else {
            uniqueNumbers.add(item); // Agregamos el correo al conjunto si no existe
        }
        if (!item.match(/^(?:\+1)?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/gm))
            throw new Error("El array contiene un numero de telefeono invalido");
    });
});
exports.isArrayOfPhoneNumbers = isArrayOfPhoneNumbers;
//# sourceMappingURL=validations_values.js.map