import { Router } from "express";
const router = Router();

import * as setpointCtrl from "../controllers/setpoint.controller";

router.post('/', setpointCtrl.createSetpoint)

export default router;
