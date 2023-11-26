import { NextFunction, Request, Response } from "express";
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import { FileArray, UploadedFile } from "express-fileupload";
import { uploadClientDetails } from "../../utils/clientQueries";
import { promises as fsPromises } from 'fs';
import { generateOTP, uploadtoCloud } from "../../utils/helper";

export const createClient = async (req: Request, res: Response) => {
    try {
        const pictures = (req.files as FileArray)?.picture;

        if (!pictures) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'No picture file uploaded' });
        }

        const pictureArray = Array.isArray(pictures) ? pictures : [pictures];

        let uploadPath: string = '';

        for (const picture of pictureArray) {
            if (!picture.mimetype.startsWith('image')) {
                return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Please upload an image' });
            }

            uploadPath = path.join(__dirname, '/../../Profile/pictures/', picture.name);

             
             await   fsPromises.mkdir(path.dirname(uploadPath), { recursive: true }),
            await    picture.mv(uploadPath)
        }

        
        
        
      const file = await uploadtoCloud(uploadPath)

        res.status(StatusCodes.OK).json({ success: true, message: file });
    } catch (error: any) {
        console.error('Error uploading picture:', error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
};




export const fileClientDetails = async (req: Request, res: Response) => {
    const { fName, lName, Email, Address, Phone, file } = req.body;

    if (![fName, lName, Email, Address, Phone, file].every((value) => !!value)) {
        return res.status(400).json({
            success: false,
            message: 'Incomplete data. Please fill in all fields and try again.'
        });
    }
    const id = '#' + generateOTP()
    const date: string = new Date().toISOString().split('T')[0].replace(/-/g, '/');

    try {
        await uploadClientDetails(fName, lName, Email, Address, Phone, file, date,id);
        res.status(200).json({ success: true, message: 'Client details and file uploaded successfully' });
    } catch (error: any) {
        console.error('Error uploading client details:', error);
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
};
