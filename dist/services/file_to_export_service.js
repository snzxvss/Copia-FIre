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
exports.FileToEexport = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
class FileToEexport {
    generateXlsxFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = [{ "client_id": 1001, "client_name": "Ludycom", "client_tag_id": null, "client_address": { "state_name": "Alabama", "address_city": "Ciudad Ejemplo", "borough_name": "Montgomery", "address_zip_code": "12345", "address_street_name": "Calle 321", "address_type_accommodation": "Casa" }, "client_contacts": [{ "email_email": ["example@example.com", "Segundo email", "Tercero email"], "contact_name": "Jonathan", "contact_phone_number": ["1234567890", "1234569870"] }, { "email_email": ["example222@example.com"], "contact_name": "Jonathan 2", "contact_phone_number": ["phone213123"] }], "client_creation_date": "2023-06-21", "client_building_count": 2 }, { "client_id": 1001, "client_name": "Ludycom", "client_tag_id": null, "client_address": { "state_name": "Alabama", "address_city": "Ciudad Ejemplo", "borough_name": "Montgomery", "address_zip_code": "12345", "address_street_name": "Calle 321", "address_type_accommodation": "Casa" }, "client_contacts": [{ "email_email": ["example@example.com", "Segundo email", "Tercero email"], "contact_name": "Jonathan", "contact_phone_number": ["1234567890", "1234569870"] }, { "email_email": ["example222@example.com"], "contact_name": "Jonathan 2", "contact_phone_number": ["phone213123"] }], "client_creation_date": "2023-06-21", "client_building_count": 2 }, { "client_id": 1001, "client_name": "Ludycom", "client_tag_id": null, "client_address": { "state_name": "Alabama", "address_city": "Ciudad Ejemplo", "borough_name": "Montgomery", "address_zip_code": "12345", "address_street_name": "Calle 321", "address_type_accommodation": "Casa" }, "client_contacts": [{ "email_email": ["example@example.com", "Segundo email", "Tercero email"], "contact_name": "Jonathan", "contact_phone_number": ["1234567890", "1234569870"] }, { "email_email": ["example222@example.com"], "contact_name": "Jonathan 2", "contact_phone_number": ["phone213123"] }], "client_creation_date": "2023-06-21", "client_building_count": 2 }, { "client_id": 1004, "client_name": "Ludycom - sas", "client_tag_id": "Tag_id", "client_address": { "state_name": "Alabama", "address_city": "Ciudad Ejemplo", "borough_name": "Montgomery", "address_zip_code": "12345", "address_street_name": "Calle 321", "address_type_accommodation": "Casa" }, "client_contacts": [{ "email_email": null, "contact_name": "Jonathan 3", "contact_phone_number": ["1234567890"] }], "client_creation_date": "2023-07-12", "client_building_count": 0 }];
                // const browser = await puppeteer.launch({
                //     headless: 'new'
                // });
                // const page = await browser.newPage();
                // // Ruta del archivo HTML a convertir
                // const rutaHtml = 'C:/Users/esteban.diaz/Desktop/fec_service/src/email/estados-USA.xlsx';
                // await page.goto(rutaHtml);
                // // Ruta de salida del archivo PDF
                // const rutaPdf = 'C:/Users/esteban.diaz/Desktop/fec_service/src/email/html.pdf';
                // await page.pdf({ path: rutaPdf, printBackground:true});
                // await browser.close();
                // console.log(`El archivo PDF se ha creado correctamente en: ${rutaPdf}`);
                const workbook = new exceljs_1.default.Workbook();
                workbook.creator = 'Alba';
                workbook.lastModifiedBy = 'Alba - Sas';
                workbook.created = new Date(1985, 8, 30);
                workbook.modified = new Date();
                workbook.lastPrinted = new Date(2016, 9, 27);
                workbook.calcProperties.fullCalcOnLoad = true;
                // workbook.views = [
                //     {
                //         x: 0, y: 0, width: 10000, height: 20000,
                //         firstSheet: 0, activeTab: 1, visibility: 'visible'
                //     }
                // ];
                const worksheet = workbook.addWorksheet('Sheet 1');
                worksheet.pageSetup.orientation = "landscape";
                worksheet.pageSetup.fitToPage = true;
                worksheet.autoFilter = {
                    from: 'A1',
                    to: 'G1',
                };
                // Agregar filas con datos
                // Obtener las claves del primer objeto para crear las cabeceras de columna
                const keys = Object.keys(jsonData[0]);
                let columns = [];
                keys.forEach((key) => {
                    columns.push({ header: key, key: key, wordWrap: true, alignment: { wrapText: true, vertical: 'top', horizontal: 'justify' } });
                });
                // Agregar las cabeceras de columna
                worksheet.columns = columns;
                // Recorrer los objetos y agregar los datos a las filas
                jsonData.forEach((obj) => {
                    // Concatenar la dirección del cliente
                    const address = obj.client_address;
                    const fullAddress = `${address.address_street_name}, ${address.address_city}, ${address.borough_name}, ${address.state_name}, ${address.address_zip_code}`;
                    obj.client_address = fullAddress;
                    obj.client_tag_id = obj.client_tag_id == null ? 'NULL' : obj.client_tag_id;
                    const clients = obj.client_contacts;
                    let concatenated_clients = ``;
                    obj.client_contacts.forEach((element, index) => {
                        let emails = ``;
                        if (element.email_email) {
                            element.email_email.forEach((email, index) => {
                                emails = emails.concat(` ${email}${index != element.email_email.length - 1 ? "," : ""}`);
                            });
                        }
                        else {
                            emails = emails.concat(` NULL`);
                        }
                        let phoneNumbers = ``;
                        if (element.contact_phone_number) {
                            element.contact_phone_number.forEach((number, index) => {
                                phoneNumbers = phoneNumbers.concat(` ${number}${index != element.contact_phone_number.length - 1 ? "," : ""}`);
                            });
                        }
                        else {
                            phoneNumbers = phoneNumbers.concat(` NULL`);
                        }
                        concatenated_clients = concatenated_clients.concat(`Contacto #${index + 1}: ${element.contact_name} - emails:${emails} - phone numbers:${phoneNumbers}${index != obj.client_contacts.length - 1 ? "\n" : ""}`);
                    });
                    obj.client_contacts = concatenated_clients;
                    const values = keys.map((key) => {
                        if (typeof obj[key] === 'object' && obj[key] !== null) {
                            return JSON.stringify(obj[key]);
                        }
                        return obj[key];
                    });
                    worksheet.addRow(values);
                    worksheet.columns.forEach((column) => {
                        let maxWidth = 0;
                        column.eachCell({ includeEmpty: true }, (cell) => {
                            const textLines = cell.value ? cell.value.toString().split('\n') : [''];
                            const maxLineLength = Math.max(...textLines.map((line) => line.length));
                            maxWidth = Math.max(maxWidth, maxLineLength);
                        });
                        column.width = maxWidth;
                        // column.width = 0
                        column.alignment = { wrapText: true, vertical: 'top', horizontal: 'left' };
                    });
                    worksheet.eachRow((row, rowNum) => {
                        row.eachCell((cell, num) => {
                            cell.border = {
                                top: { style: 'thin' },
                                left: { style: 'thin' },
                                bottom: { style: 'thin' },
                                right: { style: 'thin' },
                            };
                            row.font = { size: 11.5 };
                        });
                    });
                });
                workbook.xlsx.writeFile(`C:/Users/esteban.diaz/Desktop/fec_service/src/temp/Report.xlsx`);
                return 'yes';
            }
            catch (error) {
                console.log(error);
                return 'no';
            }
        });
    }
}
exports.FileToEexport = FileToEexport;
//# sourceMappingURL=file_to_export_service.js.map