import { Router } from "express";
import { main } from "../Bot/config";
const router = Router()


router.get('/:prompt',main)

export default router