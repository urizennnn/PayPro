import { Request, Response } from "express";
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import { FileArray, UploadedFile } from "express-fileupload";

export const uploadPicture = async (req: Request, res: Response) => {
    try {
        const pictures = (req.files as FileArray)?.picture;

        if (!pictures) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'No picture file uploaded' });
        }

        const pictureArray = Array.isArray(pictures) ? pictures : [pictures];

        for (const picture of pictureArray) {
            if (!picture.mimetype.startsWith('image')) {
                return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Please upload an image' });
            }

            const uploadPath = path.join(__dirname, '../../Profile/pictures', picture.name);
            await picture.mv(uploadPath);
        }

        res.status(StatusCodes.OK).json({ success: true, message: 'Image(s) uploaded successfully' });
    } catch (error:any) {
        console.error('Error uploading picture:', error);
        res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
    }
};
