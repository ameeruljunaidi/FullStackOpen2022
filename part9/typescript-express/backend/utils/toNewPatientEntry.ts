import { Entry } from "../src/types";
import { parseString, parseStringList } from "./stringValidation";
import { parseDischarge, parseEntryType, parseHealthCheckRating, parseSickLeave } from "./entryValidation";

const toNewPatientEntry = (object: Partial<Entry>): Entry => {
    let newEntry: Partial<Entry> = {
        id: parseString("id", true, object.id),
        description: parseString("description", true, object.description),
        date: parseString("date", true, object.date),
        specialist: parseString("specialist", true, object.specialist),
    };

    if (object.diagnosisCodes) {
        newEntry = {
            ...newEntry,
            diagnosisCodes: parseStringList("diagnosisCodes", false, object.diagnosisCodes)
        };
    }

    if (object.type) {
        parseEntryType(object.type);
    }

    if (object.type === "Hospital") {
        newEntry = { ...newEntry, type: "Hospital", discharge: parseDischarge(object.discharge) };

    } else if (object.type === "HealthCheck") {
        newEntry = {
            ...newEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };

    } else if (object.type === "OccupationalHealthcare") {
        if (object.sickLeave) {
            newEntry = {
                ...newEntry,
                type: "OccupationalHealthcare",
                sickLeave: parseSickLeave(object.sickLeave),
            };
        }

        newEntry = {
            ...newEntry,
            type: "OccupationalHealthcare",
            employerName: parseString("employerName", true, object.employerName),
        };
    }

    return newEntry as Entry;
};

export default toNewPatientEntry;
