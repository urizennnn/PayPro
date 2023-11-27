import { Router } from "express";
import { createClient, fileClientDetails } from "../controllers/Client/createProfile";
import { createInvoice } from "../controllers/Client/Invoice";
import { showclients } from "../controllers/Client/showClient";
import { addPayment, update } from "../controllers/Client/payment";

 const router = Router()

router.post('/uploadImage',createClient)
router.post('/createClient',fileClientDetails)
router.post('/createInvoice',createInvoice)
router.get('/showClients',showclients)
router.post('/addpayment',addPayment)
router.post('/updatepayment',update)
export default router