import express from "express";

import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
    console.log("Getting diagnoses");
    res.json(diagnoseService.getDiagnoses());
});

router.post("/", (_req, res) => {
    res.json(diagnoseService.addDiagnosis());
});

export default router;
