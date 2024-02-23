import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import moment from 'moment';


export const validationChecks = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);

    const betterErrors = errors.array().map((error: any) => ({
        msg: error.msg,
        path: error.path,
        // value: error.value
    }));


    if (!errors.isEmpty()) {
        const fechaFormateada = moment().format("DD/MM/YYYY HH:mm:ss A");
        const url = req.originalUrl;
        betterErrors.forEach((error) => {
            console.error(`${fechaFormateada} - Valor invalido en el atributo ${error.path} (${error.msg} - ${url})`);
        })

        return res.status(400).json({
            success: false,
            errors: betterErrors
        });
    }
    next();
};