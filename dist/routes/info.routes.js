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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const info_controller_1 = require("../controller/info_controller");
const info_middlewares_1 = require("../middlewares/info_middlewares");
const S3Management_1 = require("../s3/S3Management");
const router = (0, express_1.Router)();
router.post("/getOrganizationInfo", info_middlewares_1.getOrganizationInfoMiddlewares, info_controller_1.getOrganizationInfo);
router.post("/getLocationsListInfo", info_middlewares_1.getLocationInfoMiddlewares, info_controller_1.getLocationInfo);
router.post("/getClientsListInfo", info_middlewares_1.getClientsInfoMiddlewares, info_controller_1.getClientsInfo);
router.post("/getClientBuildingsListInfo", info_middlewares_1.getClientBuildingsInfoMiddlewares, info_controller_1.getClientBuildingsInfo);
router.post("/getUsersListInfo", info_middlewares_1.getUsersInfoMiddlewares, info_controller_1.getUsersInfo);
router.post("/getBuildingTypesListInfo", info_middlewares_1.getBuildingTypeInfoMiddlewares, info_controller_1.getBuildingTypeInfo);
router.post("/getTaskStatesListInfo", info_middlewares_1.getTaskStatesInfoMiddlewares, info_controller_1.getTaskStatesInfo);
router.post("/getTasksListInfo", info_middlewares_1.getTasksInfoMiddlewares, info_controller_1.getTasksInfo);
router.post("/getTasksListByAgentIdInfo", info_middlewares_1.getTasksByAgentIdInfoMiddlewares, info_controller_1.getTasksByAgentIdInfo);
router.get("/test", info_middlewares_1.testMiddlewares, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new S3Management_1.S3Management();
    const data = yield s3.getBucketData();
    res.status(200).json({
        data,
    });
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).send('No se ha seleccionado ningún archivo para cargar.');
    //   }
    // let { format, files } = req.body
    // const { file }: any = req.files!
    // const nombreCortado = file.name.split('.')
    // const extension = nombreCortado[nombreCortado.length - 1]
    // const extensionesValidas = ['png', 'jpg', 'jpeg']
    // if (!extensionesValidas.includes(extension)) return res.status(400).json({ msg: "Extension no valida" })
    // const tempPath = path.join(__dirname, '../../../src/temp/', `${Date.now().toString()}.png`)
    // file.mv(tempPath, (err: Error) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json({
    //             success: false,
    //             errors: [
    //                 {
    //                     msg: 'Error, comunicarse con el administrador',
    //                     path: 'service',
    //                 },
    //             ],
    //         });
    //     }
    //     return res.json({ msg: `File uploaded to: ${tempPath}`, files });
    // })
    // console.log(archivo || 'none');
    // console.dir(req.ip)
    // const route = path.join(__dirname, `../../../src/temp/${Date.now()}-image-mv.${format || 'png'}`)
    // // const data = fs.readFileSync('C:/Users/esteban.diaz/Downloads/profile-icon-png-910.png')
    // // const { BYTES_PER_ELEMENT } = fs.readFileSync('C:/Users/esteban.diaz/Downloads/profile-icon-png-910.png')
    // // console.log(BYTES_PER_ELEMENT);
    // // const a = JSON.parse(JSON.stringify(data));
    // // console.log(a.data.length);
    // file = JSON.parse(file)
    // console.log(file.data.length);
    // file = Buffer.from(file)
    // console.log(file);
    // const data = {
    //     storageId: 'Ubicacion del archivo en S3AWS',
    //     blob: file, //Dato buffer ya en formato buffer
    // }
    // // console.log(Uint8Array.from(file));
    // // console.log(Uint8Array.from(file).buffer);
    // // console.log(Uint8Array.from(file).length);
    // // console.log(Uint8Array.from(file).byteLength);
    // // const blob = new Blob([Uint8Array.from(file)])
    // // console.log(blob);
    // sharp(file)
    //     .toFile(route, (err) => {
    //         if (err) throw err;
    //         console.log('Image saved!');
    //     });
    // return res.json({ data: 'data' })
}));
exports.default = router;
/*

http://3.80.189.150:9000/api/info/getOrganizationInfo
http://3.80.189.150:9000/api/info/getLocationsListInfo
http://3.80.189.150:9000/api/info/getClientsListInfo
http://3.80.189.150:9000/api/info/getBuildingTypesListInfo
http://3.80.189.150:9000/api/info/getClientBuildingsListInfo
http://3.80.189.150:9000/api/info/getUsersListInfo
http://3.80.189.150:9000/api/info/getTaskStatesListInfo
http://3.80.189.150:9000/api/info/getTasksListInfo

*/
//# sourceMappingURL=info.routes.js.map