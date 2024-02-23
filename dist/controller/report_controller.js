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
exports.reportsXlsxReport = exports.exportReportsToXLSX = exports.reportsPdfReport = exports.exportReportsToPDF = void 0;
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const exportReportsToPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/report/reportsPdfReport'
    });
});
exports.exportReportsToPDF = exportReportsToPDF;
const reportsPdfReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const filePath = './src/temp/ClientReport.pdf';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    // Lee el archivo en un buffer
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_REPORT_REPORT.pdf`);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(data);
        }
        ;
    });
});
exports.reportsPdfReport = reportsPdfReport;
const exportReportsToXLSX = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const { usuario } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    res.status(200).json({
        success: true,
        msg: "Iformacion obtenida correctamente",
        data: 'http://3.80.189.150:9000/api/report/reportsXlsxReport'
    });
});
exports.exportReportsToXLSX = exportReportsToXLSX;
const reportsXlsxReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, finalDate } = req.body;
    const filePath = './src/temp/ClientReport.xlsx';
    const fechaFormateada = (0, moment_1.default)().format("DD-MM-YYYY");
    fs_1.default.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'Error al leer el archivo.' });
        }
        else {
            res.setHeader('Content-Disposition', `attachment; filename=${fechaFormateada}_REPORT_REPORT.xlsx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            return res.status(200).send(data);
        }
        ;
    });
});
exports.reportsXlsxReport = reportsXlsxReport;
//# sourceMappingURL=report_controller.js.map