import { Gender, Patient } from "../src/types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (name: string, required: boolean, something: unknown): string => {
    if ((!something && required) || !isString(something)) {
        throw new Error(`${name} must be a string`);
    }

    return something;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect gender value");
    }

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

const toNewPatientEntry = (object: Fields): Patient => {
    let newPatient: Patient = {
        id: parseString("id", true, object.id),
        name: parseString("name", true, object.name),
        occupation: parseString("occupation", true, object.occupation),
        gender: parseGender(object.gender),
    };

    if (object.ssn) {
        newPatient = { ...newPatient, ssn: parseString("ssn", false, object.ssn) };
    }

    if (object.dateOfBirth) {
        newPatient = { ...newPatient, dateOfBirth: parseString("dataOfBirth", false, object.dateOfBirth) };
    }

    return newPatient;
};

export default toNewPatientEntry;
