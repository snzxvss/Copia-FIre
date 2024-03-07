"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_middlewares_1 = require("../middlewares/report_middlewares");
const report_controller_1 = require("../controller/report_controller");
const router = (0, express_1.Router)();
router.post("/exportReportsToPDF", report_middlewares_1.exportReportsMiddlewares, report_controller_1.exportReportsToPDF);
router.post("/exportReportsToXLSX", report_middlewares_1.exportReportsMiddlewares, report_controller_1.exportReportsToXLSX);
router.post("/report", report_middlewares_1.exportReportsMiddlewares, report_controller_1.report);
router.get("/reportsPdfReport", report_controller_1.reportsPdfReport);
router.get("/reportsXlsxReport", report_controller_1.reportsXlsxReport);
exports.default = router;
//# sourceMappingURL=report.routes.js.map