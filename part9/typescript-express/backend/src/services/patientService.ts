import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import fs from "fs";

import { Entry, EntryWithoutId, Patient } from "../types";

export const getPatients = (): Omit<Patient, "ssn">[] => {
    return patients.map(patient => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, ...rest }: Patient = patient;
        return rest;
    });
};

export const getPatientToAdd = (newPatient: Omit<Patient, "id">): Patient => {
    const id: string = uuid();
    return { ...newPatient, id: id };
};

export const getEntryToAdd = (newEntry: EntryWithoutId): Entry => {
    const id: string = uuid();
    return { ...newEntry, id: id };
};

export const addPatientEntry = (newEntry: Entry, patientToUpdate: Patient) => {
    let updatedPatient = patientToUpdate;

    for (const patient of patients) {
        if (patient.id === patientToUpdate.id) {
            patient.entries.push(newEntry);
            updatedPatient = patient;
        }
    }
    return updatedPatient;
};

export const getPatientById = (patientId: string): Patient | undefined => {
    return  patients.find(patient => patient.id === patientId);
};

export const addPatient = (newPatient: Patient): Patient[] => {
    patients.push(newPatient);
    return patients;
};

export const writePatientToFile = (newPatient: Patient): Patient[] => {
    const updatedPatientsData = patients.concat(newPatient);

    fs.writeFile(
        "/Users/ajjunaidi/Dev/FullStackOpen2022/part9/typescript-express/backend/src/data/patients.json",
        JSON.stringify(updatedPatientsData),
        () => {
            console.log("Patient added");
        }
    );

    return updatedPatientsData;
};
