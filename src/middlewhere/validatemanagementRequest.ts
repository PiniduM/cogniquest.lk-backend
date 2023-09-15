import { NextFunction, Request, Response } from "express";
import verifyAndDecodeJWT from "../utils/verifyAndDecodeJWT.js";

const validateManagementRequest = (req: Request,res:Response,next: NextFunction) =>  {
    const data = req.body;
    const {managementToken} = data;

    try {
        const payload = verifyAndDecodeJWT(managementToken) as {management_id: string,type: string};
        if(payload?.type !== 'managementToken') {
            res.status(401).json('unauthorized');
        }else{
            next();
        }
    } catch (error) {
        res.status(401).json('unauthorized');
    }
}

export default validateManagementRequest;