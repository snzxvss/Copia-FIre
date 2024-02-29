import { Router } from "express";
import {
    createClient, exportClientsToPDF, exportClientsToXLSX, updateClient,
    createClientContact, updateClientContact,
    getClientInfo, deleteClientContact, createClientBuilding, updateClientBuilding, clientsPdfReport, clientsXlsxReport, ClientDetailPDF, ClientDetailXLSX, exportClientDetailToPDF, exportClientDetailToXLSX
} from "../controller/client_controller";
import {
    createClientMiddlewares, updateClientMiddlewares,
    createClientContactMiddlewares, updateClientContactMiddlewares,
    getClientInfoMiddewares, deleteClientcontactMiddlewares, createClientBuildingMiddlewares, updateClientBuildingMiddlewares, exportClientsMiddlewares, exportClientDetailMiddlewares, getClientMiddewaresPdf
} from "../middlewares/client_middlewares";

const router = Router();

router.post("/getClientInfo", getClientInfoMiddewares, getClientInfo);
router.post("/clientsPdfReport", getClientMiddewaresPdf, clientsPdfReport);
router.get("/clientsXlsxReport", clientsXlsxReport);
router.get("/clientDetailPdfReport", ClientDetailPDF);
router.get("/clientDetailXlsxReport", ClientDetailXLSX);

router.post("/exportClientsToPDF", exportClientsMiddlewares, exportClientsToPDF);
router.post("/exportClientsToXLSX", exportClientsMiddlewares, exportClientsToXLSX);
router.post("/exportClientDetailToPDF", exportClientDetailMiddlewares, exportClientDetailToPDF);
router.post("/exportClientDetailToXLSX", exportClientDetailMiddlewares, exportClientDetailToXLSX);
router.post("/createClient", createClientMiddlewares, createClient);
router.post("/createClientContact", createClientContactMiddlewares, createClientContact);
router.post("/createClientbuilding", createClientBuildingMiddlewares, createClientBuilding);

router.put("/updateClient", updateClientMiddlewares, updateClient);
router.put("/updateClientContact", updateClientContactMiddlewares, updateClientContact);
router.put("/updateClientBuilding", updateClientBuildingMiddlewares, updateClientBuilding); 

router.delete("/deleteClientContact", deleteClientcontactMiddlewares, deleteClientContact);

export default router;
