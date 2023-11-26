import { Router } from "express";
import { createClient, fileClientDetails } from "../controllers/Client/createProfile";
import { createInvoice } from "../controllers/Client/Invoice";

 const router = Router()

router.post('/uploadImage',createClient)
router.post('/createClient',fileClientDetails)
router.post('/createInvoice',createInvoice)
export default router