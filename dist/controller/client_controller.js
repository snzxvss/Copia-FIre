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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientDetailXLSX = exports.ClientDetailPDF = exports.exportClientDetailToXLSX = exports.exportClientDetailToPDF = exports.clientsPdfReport = exports.exportClientsToPDF = exports.clientsXlsxReport = exports.exportClientsToXLSX = exports.updateClientBuilding = exports.createClientBuilding = exports.deleteClientContact = exports.updateClient = exports.updateClientContact = exports.createClientContact = exports.createClient = exports.getClientInfo = void 0;
const file_to_export_service_1 = require("../services/file_to_export_service");
const client_procedures_1 = require("../db/procedures/client_procedures");
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const fileToExport = new file_to_export_service_1.FileToEexport;
const clientDbProcedures = new client_procedures_1.ClientDbProcedures;
const getClientInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.body;
        const client = yield clientDbProcedures.getClientsDataByIdsProcedure(clientId);
        const buildings = yield clientDbProcedures.getClientBuildingsProcedure({ clientId });
        const { clientBuildings } = buildings;
        const { clientBuildingCount, clientCreationDate } = client, rest = __rest(client, ["clientBuildingCount", "clientCreationDate"]);
        const data = Object.assign(Object.assign({}, rest), { clientBuildings, clientCreationDate });
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - cliente con id ${clientId} obtenido correctamente.`);
        res.status(200).json({
            success: true,
            msg: `Data obtenida correctamente`,
            data
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.getClientInfo = getClientInfo;
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientTagId, streetName, accommodationType, addressBorough, zipCode, clientName, stateId, cityId } = req.body;
        const data = {
            clientTagId, streetName, accommodationType,
            addressBorough, zipCode, clientName, stateId, cityId
        };
        const { response, clientId } = yield clientDbProcedures.createClientProcedure(data);
        const client = yield clientDbProcedures.getClientsDataByIdsProcedure(clientId);
        res.status(200).json({
            success: true,
            msg: response,
            data: client
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.createClient = createClient;
const createClientContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, contactFirstName, contactLastName } = req.body;
    const data = { clientId, contactFirstName, contactLastName };
    try {
        const { response } = yield clientDbProcedures.createClientContactProcedure(data);
        res.status(200).json({
            success: true,
            msg: response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.createClientContact = createClientContact;
const updateClientContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientId, contactFirstName, contactLastName, contactId, addEmails, addNumbers, deleteEmails, deleteNumbers, updateEmails, updateNumbers } = req.body;
    try {
        const data = yield clientDbProcedures.updateClientContactProcedure({ contactId, contactFirstName, contactLastName });
        // *ADD=====================================================================================================================================================
        if (addNumbers)
            yield addNumbers.forEach((number) => clientDbProcedures.createClientContactNumberProcedure({ contactId, number }));
        if (addEmails)
            yield addEmails.forEach((email) => clientDbProcedures.createClientContactEmailProcedure({ contactId, email }));
        // ?UPDATE==================================================================================================================================================
        if (updateNumbers)
            yield updateNumbers.forEach((phonesData) => clientDbProcedures.updateClientContactPhoneProcedure({ contactId, oldNumber: phonesData.oldNumber, newNumber: phonesData.newNumber }));
        if (updateEmails)
            yield updateEmails.forEach((emailsData) => clientDbProcedures.updateClientContactEmailProcedure({ contactId, oldEmail: emailsData.oldEmail, newEmail: emailsData.newEmail }));
        // !DELETE==================================================================================================================================================
        if (deleteNumbers)
            yield deleteNumbers.forEach((number) => clientDbProcedures.deleteClientContactNumberProcedure({ contactId, number }));
        if (deleteEmails)
            yield deleteEmails.forEach((email) => clientDbProcedures.deleteClientContactEmailProcedure({ contactId, email }));
        const client = yield clientDbProcedures.getClientsDataByIdsProcedure(clientId);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Client Contact Updated By contactId ${clientId}`);
        // const data = { clientId, contactFirstName, contactLastName };
        // const response = await clientDbProcedures.createClientContactProcedure(data);
        res.status(200).json({
            success: true,
            msg: "Respuesta del enpoint de creación del contacto del cliente",
            response: "Respuesta de la Api",
            client
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.updateClientContact = updateClientContact;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientTagId, streetName, accommodationType, clientId, addressBorough, zipCode, clientName, stateId, cityId } = req.body;
    const data = {
        clientTagId, streetName, accommodationType, clientId,
        addressBorough, zipCode, clientName, stateId, cityId
    };
    const response = yield clientDbProcedures.updateClientDataProcedure(data);
    const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
    console.log(`${fechaFormateada} - Client Updated By Id: ${clientId}`);
    res.status(200).json({
        success: true,
        msg: response,
    });
});
exports.updateClient = updateClient;
const deleteClientContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, contactId } = req.body;
        const data = { contactId };
        const { response } = yield clientDbProcedures.deleteClientContactProcedure(data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Client Contact With ID ${contactId} Deleted`);
        res.status(200).json({
            success: true,
            response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.deleteClientContact = deleteClientContact;
const createClientBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, buildingName, buildingFloors, buildingSurfaceSquareMeters, buildingTypeId, streetName, accommodationType, addressBorough, zipCode, stateId, cityId, } = req.body;
        const data = {
            clientId, buildingName, buildingFloors,
            buildingSurfaceSquareMeters, buildingTypeId,
            streetName, accommodationType, addressBorough,
            zipCode, stateId, cityId,
        };
        const response = yield clientDbProcedures.createClientBuildingProcedure(data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Client Building Created By Name: ${buildingName}`);
        res.status(200).json({
            success: true,
            msg: `Client Building Contact Created`,
            response
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.createClientBuilding = createClientBuilding;
const updateClientBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, buildingId, buildingName, buildingTypeId, buildingFloors, buildingSurfaceSquareMeters, } = req.body;
        const data = {
            clientId, buildingId, buildingName, buildingTypeId,
            buildingFloors, buildingSurfaceSquareMeters,
        };
        const response = yield clientDbProcedures.updateClientBuildingProcedure(data);
        let building = yield clientDbProcedures.getClientBuildingsProcedure({ clientId });
        building = building.clientBuildings.find((item) => item.buildingId == buildingId);
        res.status(200).json({
            success: true,
            msg: `${response != null ? response : "Error al actualizar la edificación"}`,
            data: building
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.updateClientBuilding = updateClientBuilding;
const exportClientsToXLSX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientsXlsxReport'
    });
});
exports.exportClientsToXLSX = exportClientsToXLSX;
const clientsXlsxReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_CLIENT_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        }
        ;
    });
});
exports.clientsXlsxReport = clientsXlsxReport;
const exportClientsToPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientsPdfReport'
    });
});
exports.exportClientsToPDF = exportClientsToPDF;
const clientsPdfReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' };
        let result = yield clientDbProcedures.GetClientsDataToReport(data);
        let resultWithEmails = Object.assign(Object.assign({}, result), { emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ] });
        // Send 'result' to http://localhost:8080/client
        const postResponse = yield axios_1.default.post('http://localhost:8080/client', resultWithEmails);
        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = yield axios_1.default.get('http://localhost:8080/client/export-pdf', { responseType: 'arraybuffer' });
        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');
        console.log(postResponse.data);
        const fechaFormateada = (0, moment_1.default)().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Clients Data Report Generated: `);
        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            errors: [
                {
                    msg: 'Error, comunicarse con el administrador',
                    path: 'service',
                    error
                },
            ],
        });
    }
    ;
});
exports.clientsPdfReport = clientsPdfReport;
const exportClientDetailToPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion del cliente obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientDetailPdfReport'
    });
});
exports.exportClientDetailToPDF = exportClientDetailToPDF;
const exportClientDetailToXLSX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion del cliente obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientDetailXlsxReport'
    });
});
exports.exportClientDetailToXLSX = exportClientDetailToXLSX;
const ClientDetailPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    return fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_CLIENT_DETAIL_REPORT.pdf`);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(data);
        }
        ;
    });
});
exports.ClientDetailPDF = ClientDetailPDF;
const ClientDetailXLSX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    return fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_CLIENT_DETAIL_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        }
        ;
    });
});
exports.ClientDetailXLSX = ClientDetailXLSX;
//# sourceMappingURL=client_controller.js.map