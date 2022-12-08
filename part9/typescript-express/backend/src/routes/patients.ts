import express from "express";
import toNewPatientEntry from "../../utils/toNewPatientEntry";
import patientService from "../services/patientService";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(patientService.getPatients());
});

router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient: Patient = toNewPatientEntry(patientService.getPatientToAdd(req.body));
        const newPatients = patientService.writePatientToFile(newPatient);
        res.json({ addedPatient: newPatient, patientsInDb: newPatients });
    } catch (error: unknown) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
