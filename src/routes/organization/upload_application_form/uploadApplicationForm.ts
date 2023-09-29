import { Request, RequestHandler, Response } from "express";
import verifyAndDecryptFileUploadToken from "../../../utils/fileUploadToken/verifyAndDecryptFileUploadToken.js";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import { NextFunction } from "express-serve-static-core";







const UploadApplicationForm : RequestHandler = (req,res) => {
    const fileUploadToken = req.header('authorization');
    if(!fileUploadToken) {
        res.status(406).json('no_upload_token');
        return;
    }
    const fileUploadData = verifyAndDecryptFileUploadToken(fileUploadToken);
    if(!fileUploadData) {
        res.status(401).json('invalid_upload_token');
        return;
    }

    

}

