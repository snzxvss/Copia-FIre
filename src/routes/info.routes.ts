import { Response, Router, Request } from "express";
import { getBuildingTypeInfo, getClientBuildingsInfo, getClientsInfo, getLocationInfo, getOrganizationInfo, getTaskStatesInfo, getTasksByAgentIdInfo, getTasksInfo, getUsersInfo } from "../controller/info_controller";
import { getBuildingTypeInfoMiddlewares, getClientBuildingsInfoMiddlewares, getClientsInfoMiddlewares, getLocationInfoMiddlewares, getOrganizationInfoMiddlewares, getTaskStatesInfoMiddlewares, getTasksByAgentIdInfoMiddlewares, getTasksInfoMiddlewares, getUsersInfoMiddlewares, testMiddlewares } from "../middlewares/info_middlewares";
import { S3Management } from "../s3/S3Management";

const router = Router();

router.post("/getOrganizationInfo", getOrganizationInfoMiddlewares, getOrganizationInfo);
router.post("/getLocationsListInfo", getLocationInfoMiddlewares, getLocationInfo);
router.post("/getClientsListInfo", getClientsInfoMiddlewares, getClientsInfo);
router.post("/getClientBuildingsListInfo", getClientBuildingsInfoMiddlewares, getClientBuildingsInfo);
router.post("/getUsersListInfo", getUsersInfoMiddlewares, getUsersInfo);
router.post("/getBuildingTypesListInfo", getBuildingTypeInfoMiddlewares, getBuildingTypeInfo);
router.post("/getTaskStatesListInfo", getTaskStatesInfoMiddlewares, getTaskStatesInfo);
router.post("/getTasksListInfo", getTasksInfoMiddlewares, getTasksInfo);
router.post("/getTasksListByAgentIdInfo", getTasksByAgentIdInfoMiddlewares, getTasksByAgentIdInfo);







router.get("/test", testMiddlewares, async (req: Request, res: Response) => {

    const s3 = new S3Management();
    const data = await s3.getBucketData();
    

    res.status(200).json({
        data,
    })

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

});

export default router;


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
