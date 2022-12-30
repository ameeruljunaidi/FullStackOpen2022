import { Gender, Patient } from "../src/types";
import { parseString } from "./stringValidation";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) throw new Error("Incorrect gender value");

    return gender;
};

type Fields = {
    id: unknown;
    name: unknown;
    occupation: unknown;
    gender: unknown;
    ssn?: unknown;
    dateOfBirth?: unknown;
};

const toNewPatient = (object: Fields): Patient => {
    let newPatient: Partial<Patient> = {
        id: parseString("id", true, object.id),
        name: parseString("name", true, object.name),
        occupation: parseString("occupation", true, object.occupation),
        gender: parseGender(object.gender),
        entries: [],
    };

    if (object.ssn) {
        newPatient = { ...newPatient, ssn: parseString("ssn", false, object.ssn) };
    }

    if (object.dateOfBirth) {
        newPatient = { ...newPatient, dateOfBirth: parseString("dataOfBirth", false, object.dateOfBirth) };
    }

    return newPatient as Patient;
};

export default toNewPatient;
