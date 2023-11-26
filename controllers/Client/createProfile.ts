import { NextFunction, Request, Response } from "express";
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import { FileArray, UploadedFile } from "express-fileupload";
import { uploadClientDetails } from "../../utils/clientQueries";
import { promises as fsPromises } from 'fs';

export const createClient = async (req: Request, res: Response) => {
    try {
        const { fName, lName, Email, Address, Phone } = req.body;
        const pictures = (req.files as FileArray)?.picture;

        if (!pictures) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'No picture file uploaded' });
        }

        const pictureArray = Array.isArray(pictures) ? pictures : [pictures];

        for (const picture of pictureArray) {
            if (!picture.mimetype.startsWith('image')) {
                return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Please upload an image' });
            }

            const uploadPath = path.join(__dirname, '/../../Profile/pictures/', picture.name);
            
            await fsPromises.mkdir(path.dirname(uploadPath), { recursive: true });

            await picture.mv(uploadPath);
        }

        const pfpName = pictureArray.map(picture => picture.name).join(', '); 
        const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');
        // await uploadClientDetails(fName, lName, Email, Address, Phone, pfpName, date);
        res.status(StatusCodes.OK).json({ success: true, message: 'Image(s) uploaded successfully' });
    } catch (error: any) {
        console.error('Error uploading picture:', error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
};
