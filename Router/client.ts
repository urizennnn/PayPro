import { Router } from "express";
import { createClient, fileClientDetails } from "../controllers/Client/createProfile";
import { createInvoice } from "../controllers/Client/Invoice";
import { showclients } from "../controllers/Client/showClient";

 const router = Router()

router.post('/uploadImage',createClient)
router.post('/createClient',fileClientDetails)
router.post('/createInvoice',createInvoice)
router.get('/showClients',showclients)
export default router