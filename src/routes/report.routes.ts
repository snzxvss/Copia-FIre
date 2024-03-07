import { Router } from 'express'
import { exportReportsMiddlewares } from '../middlewares/report_middlewares';
import { exportReportsToPDF, exportReportsToXLSX, reportsPdfReport, reportsXlsxReport, report } from '../controller/report_controller';

const router = Router()

router.post("/exportReportsToPDF", exportReportsMiddlewares, exportReportsToPDF);
router.post("/exportReportsToXLSX", exportReportsMiddlewares, exportReportsToXLSX);
router.post("/report", exportReportsMiddlewares, report);
router.get("/reportsPdfReport", reportsPdfReport);
router.get("/reportsXlsxReport", reportsXlsxReport);

export default router;