import { Request, Response } from "express";
import moment from "moment";
import fs from 'fs';
import { User } from "../interfaces/user_interface";
import { TaskDbProcedures } from "../db/procedures/task_procedures";



export const exportReportsToPDF = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    res.status(200).json({
        success:true,
        msg:"Iformacion obtenida correctamente",
        data:'http://3.80.189.150:9000/api/report/reportsPdfReport'
    })
};

export const reportsPdfReport = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;

    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    // Lee el archivo en un buffer
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        } else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_REPORT_REPORT.pdf`);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(data);
        };
    });
};


export const exportReportsToXLSX = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;
    const { usuario }: { usuario: User } = req.body

    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = moment().format("DD-MM-YYYY");

    res.status(200).json({
        success:true,
        msg:"Iformacion obtenida correctamente",
        data:'http://3.80.189.150:9000/api/report/reportsXlsxReport'
    })
};

export const reportsXlsxReport = async (req: Request, res: Response) => {

    const { startDate, finalDate } = req.body;

    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = moment().format("DD-MM-YYYY");


    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        } else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_REPORT_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        };
    });
};

export const report = async (req: Request, res: Response) => {
    try {
        const { startDate, finalDate } = req.body;
        const { usuario }: { usuario: User } = req.body

        // Crear una instancia de TaskDbProcedures
        const taskDbProceduresInstance = new TaskDbProcedures();

        // Llamada al procedimiento
        const taskData = await taskDbProceduresInstance.GetTaskDataComplete({ startDate, finalDate, searchKey: ''});

        res.status(200).json({
            success:true,
            msg:"Informacion obtenida correctamentee",
            taskData
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
    }
};