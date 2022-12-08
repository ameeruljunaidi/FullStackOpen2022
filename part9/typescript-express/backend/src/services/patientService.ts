import { v4 as uuid } from "uuid";
import patientsData from "../data/patients.json";
import fs from "fs";

import { Patient } from "../types";

const patients: Patient[] = patientsData as Patient[];

const getPatients = (): Omit<Patient, "ssn">[] => {
    return patients.map(patient => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, ...rest }: Patient = patient;
        return rest;
    });
};

const getPatientToAdd = (newPatient: Omit<Patient, "id">): Patient => {
    const id: string = uuid();
    const newPatientToAdd = { ...newPatient, id: id };

    return newPatientToAdd;
};

const writePatientToFile = (newPatient: Patient): Patient[] => {
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

export default { getPatients, getPatientToAdd, writePatientToFile };
