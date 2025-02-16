import express from "express";
import {
    downloadPatientsExcel

} from "../controllers/downloadController.js";

const router = express.Router();

router.get("/exportexcel", downloadPatientsExcel);

export default router;
