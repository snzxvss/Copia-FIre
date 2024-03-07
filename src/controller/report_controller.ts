import { Request, Response } from "express";
import moment from "moment";
import fs from 'fs';
import { User } from "../interfaces/user_interface";



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
    
        const { startDate, finalDate } = req.body;
        const { usuario }: { usuario: User } = req.body
    
        res.status(200).json({
            success:true,
            msg:"Iformacion obtenida correctamente",
            data:'http://example.com'
        });
};
