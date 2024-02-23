import { Router } from 'express'
import { exportReportsMiddlewares } from '../middlewares/report_middlewares';
import { exportReportsToPDF, exportReportsToXLSX, reportsPdfReport, reportsXlsxReport } from '../controller/report_controller';

const router = Router()

router.post("/exportReportsToPDF", exportReportsMiddlewares, exportReportsToPDF);
router.post("/exportReportsToXLSX", exportReportsMiddlewares, exportReportsToXLSX);

router.get("/reportsPdfReport", reportsPdfReport);
router.get("/reportsXlsxReport", reportsXlsxReport);

export default router;