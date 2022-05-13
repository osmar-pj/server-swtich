import { Router } from "express";
const router = Router();

import * as detectorCtrl from "../controllers/detector.controller";

router.post('/', detectorCtrl.createDetector)
router.get('/', detectorCtrl.getDetectors)
router.get('/:id', detectorCtrl.getDetector)
router.put('/:id', detectorCtrl.updateDetector)

export default router;