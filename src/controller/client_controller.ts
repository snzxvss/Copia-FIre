import { Request, Response } from "express";
import { FileToEexport } from "../services/file_to_export_service";
import { ClientDbProcedures } from "../db/procedures/client_procedures";
import { Client } from "../interfaces/client_interface";
import moment from "moment";
import fs from 'fs';
import axios from 'axios';
import { User } from "../interfaces/user_interface";
import { emails } from "../interfaces/email_interface";

const fileToExport = new FileToEexport;
const clientDbProcedures = new ClientDbProcedures;

export const getClientInfo = async (req: Request, res: Response) => {
    try {
        const { clientId } = req.body
        const client = await clientDbProcedures.getClientsDataByIdsProcedure(clientId);
        const buildings = await clientDbProcedures.getClientBuildingsProcedure({ clientId });

        const { clientBuildings } = buildings
        const { clientBuildingCount, clientCreationDate, ...rest } = client;
        const data = { ...rest, clientBuildings, clientCreationDate };

        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - cliente con id ${clientId} obtenido correctamente.`);

        res.status(200).json({
            success: true,
            msg: `Data obtenida correctamente`,
            data
        });

    } catch (error) {
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
    };
};

export const createClient = async (req: Request, res: Response) => {

    try {
        const { clientTagId, streetName, accommodationType,
            addressBorough, zipCode, clientName, stateId, cityId } = req.body;

        const data = {
            clientTagId, streetName, accommodationType,
            addressBorough, zipCode, clientName, stateId, cityId
        }

        const { response, clientId } = await clientDbProcedures.createClientProcedure(data);
        const client = await clientDbProcedures.getClientsDataByIdsProcedure(clientId)

        res.status(200).json({
            success: true,
            msg: response,
            data: client

        })



    } catch (error) {
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
    };
};

export const createClientContact = async (req: Request, res: Response) => {

    const { clientId, contactFirstName, contactLastName } = req.body;

    const data = { clientId, contactFirstName, contactLastName }

    try {
        const { response } = await clientDbProcedures.createClientContactProcedure(data);

        res.status(200).json({
            success: true,
            msg: response
        })

    } catch (error) {
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
    };
};

export const updateClientContact = async (req: Request, res: Response) => {

    const { clientId, contactFirstName, contactLastName,
        contactId, addEmails, addNumbers, deleteEmails, deleteNumbers,
        updateEmails, updateNumbers } = req.body;

    try {

        const data = await clientDbProcedures.updateClientContactProcedure({ contactId, contactFirstName, contactLastName })
        // *ADD=====================================================================================================================================================
        if (addNumbers) await addNumbers.forEach((number: any) => clientDbProcedures.createClientContactNumberProcedure({ contactId, number }));
        if (addEmails) await addEmails.forEach((email: any) => clientDbProcedures.createClientContactEmailProcedure({ contactId, email }));
        // ?UPDATE==================================================================================================================================================
        if (updateNumbers) await updateNumbers.forEach((phonesData: any) => clientDbProcedures.updateClientContactPhoneProcedure({ contactId, oldNumber: phonesData.oldNumber, newNumber: phonesData.newNumber }));
        if (updateEmails) await updateEmails.forEach((emailsData: any) => clientDbProcedures.updateClientContactEmailProcedure({ contactId, oldEmail: emailsData.oldEmail, newEmail: emailsData.newEmail }));
        // !DELETE==================================================================================================================================================
        if (deleteNumbers) await deleteNumbers.forEach((number: any) => clientDbProcedures.deleteClientContactNumberProcedure({ contactId, number }));
        if (deleteEmails) await deleteEmails.forEach((email: any) => clientDbProcedures.deleteClientContactEmailProcedure({ contactId, email }));
        const client: Client = await clientDbProcedures.getClientsDataByIdsProcedure(clientId);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Client Contact Updated By contactId ${clientId}`);

        // const data = { clientId, contactFirstName, contactLastName };


        // const response = await clientDbProcedures.createClientContactProcedure(data);

        res.status(200).json({
            success: true,
            msg: "Respuesta del enpoint de creación del contacto del cliente",
            response: "Respuesta de la Api",
            client
        })



    } catch (error) {
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
    };
};

export const updateClient = async (req: Request, res: Response) => {

    const { clientTagId, streetName, accommodationType, clientId,
        addressBorough, zipCode, clientName, stateId, cityId } = req.body;

    const data = {
        clientTagId, streetName, accommodationType, clientId,
        addressBorough, zipCode, clientName, stateId, cityId
    };

    const response = await clientDbProcedures.updateClientDataProcedure(data);
    const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
    console.log(`${fechaFormateada} - Client Updated By Id: ${clientId}`);

    res.status(200).json({
        success: true,
        msg: response,
    });
};

export const deleteClientContact = async (req: Request, res: Response) => {
    try {
        const { clientId, contactId } = req.body;
        const data = { contactId };
        const { response } = await clientDbProcedures.deleteClientContactProcedure(data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Client Contact With ID ${contactId} Deleted`);

        res.status(200).json({
            success: true,
            response
        });

    } catch (error) {
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
    };
};

export const createClientBuilding = async (req: Request, res: Response) => {
    try {

        const {
            clientId, buildingName, buildingFloors,
            buildingSurfaceSquareMeters, buildingTypeId,
            streetName, accommodationType, addressBorough,
            zipCode, stateId, cityId,
        } = req.body

        const data = {
            clientId, buildingName, buildingFloors,
            buildingSurfaceSquareMeters, buildingTypeId,
            streetName, accommodationType, addressBorough,
            zipCode, stateId, cityId,
        }

        const response = await clientDbProcedures.createClientBuildingProcedure(data)
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Client Building Created By Name: ${buildingName}`);


        res.status(200).json({
            success: true,
            msg: `Client Building Contact Created`,
            response
        })
    } catch (error) {
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
    };
};

export const updateClientBuilding = async (req: Request, res: Response) => {
    try {

        const {
            clientId, buildingId, buildingName, buildingTypeId,
            buildingFloors, buildingSurfaceSquareMeters,
        } = req.body
        const data = {
            clientId, buildingId, buildingName, buildingTypeId,
            buildingFloors, buildingSurfaceSquareMeters,
        }

        const response = await clientDbProcedures.updateClientBuildingProcedure(data);
        let building = await clientDbProcedures.getClientBuildingsProcedure({ clientId })
        building = building.clientBuildings.find((item: any) => item.buildingId == buildingId)

        res.status(200).json({
            success: true,
            msg: `${response != null ? response : "Error al actualizar la edificación"}`,
            data: building
        })
    } catch (error) {
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
    };
}

export const exportClientsToXLSX = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientsXlsxReport'
    })
};
export const clientsXlsxReport = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        } else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_CLIENT_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        };
    });
};

export const exportClientsToPDF = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientsPdfReport'
    })
};


export const clientsPdfReport = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const data = { startDate, finalDate, searchKey: '' }; // Add the missing searchKey property
        let result = await clientDbProcedures.GetClientsDataToReport(data);

        interface ClientWithEmails {
            emails: emails[];
        }
        
        let resultWithEmails: ClientWithEmails = {
            ...result,
            emails: [
                {
                    email_pdf: "voss@gmail.com",
                    address_pdf: "street 1324"
                }
            ]
        };
    
        // Send 'result' to http://localhost:8080/client
        const postResponse = await axios.post('http://localhost:8080/client', resultWithEmails);

        // GET request to http://localhost:8080/client/export-pdf
        const getResponse = await axios.get('http://localhost:8080/client/export-pdf', { responseType: 'arraybuffer' });

        // Convert the response to a PDF
        const pdf = Buffer.from(getResponse.data, 'binary').toString('base64');

        console.log(postResponse.data);
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        console.log(`${fechaFormateada} - Clients Data Report Generated: `);

        res.contentType("application/pdf");
        return res.send(Buffer.from(pdf, 'base64'));
    } catch (error) {
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
    };
};

export const exportClientDetailToPDF = async (req: Request, res: Response) => {
    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion del cliente obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientDetailPdfReport'
    })
};

export const exportClientDetailToXLSX = async (req: Request, res: Response) => {
    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion del cliente obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/client/clientDetailXlsxReport'
    })
};
export const ClientDetailPDF = async (req: Request, res: Response) => {
    const { startDate, finalDate } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    return fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        } else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_CLIENT_DETAIL_REPORT.pdf`);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(data);
        };
    });
};

export const ClientDetailXLSX = async (req: Request, res: Response) => {
    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    return fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        } else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_CLIENT_DETAIL_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        };
    });
};