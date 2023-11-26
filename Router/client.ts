import { Router } from "express";
import { uploadPicture } from "../controllers/Client/createProfile";

 const router = Router()

router.post('/uploadImage',uploadPicture)
router.post('/')
export default router