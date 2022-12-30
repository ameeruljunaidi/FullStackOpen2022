import express from "express";
import toNewPatient from "../../utils/toNewPatient";
import * as patientService from "../services/patientService";
import { Patient } from "../types";
import toNewPatientEntry from "../../utils/toNewPatientEntry";

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(patientService.getPatients() as Patient[]);
});

router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient: Patient = toNewPatient(patientService.getPatientToAdd(req.body));
        const newPatients = patientService.addPatient(newPatient);
        res.json({ addedPatient: newPatient, patientsInDb: newPatients });
    } catch (error: unknown) {
        let errorMessage = "Something bad happened. ";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }

        res.send(errorMessage);
    }
});


router.get("/:id", (req, res) => {
    // returns all the patient information for one patient, including the array of patient entries that is still empty
    // for all the patients.
    const patient = patientService.getPatientById(req.params.id);

    if (!patient) res.sendStatus(404);
    else res.json(patient);
});

router.post("/:id/entries", (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
        res.sendStatus(404);
        return;
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = toNewPatientEntry(patientService.getEntryToAdd(req.body));
        const updatedPatient = patientService.addPatientEntry(newEntry, patient);
        res.send(updatedPatient);

    } catch (error: unknown) {
        let errorMessage = "Something bad happened: ";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.send(errorMessage);
    }
});

export default router;
