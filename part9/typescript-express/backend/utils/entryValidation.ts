import { Discharge, HealthCheckRating, SickLeave } from "../src/types";

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
    return typeof rating === "number" && rating in HealthCheckRating;
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isHealthCheckRating(rating)) throw new Error("Invalid health check rating");
    return rating;
};

const isDischarge = (something: unknown): something is Discharge => {
    return typeof something === "object"
        && !!something
        && "date" in something
        && "criteria" in something
        && typeof something.date === "string"
        && typeof something.criteria === "string"
        && something.date !== ""
        && something.criteria !== "";
};

export const parseDischarge = (something: unknown): Discharge => {
    if (!isDischarge(something)) throw new Error("Invalid discharge date and/or criteria");
    return something;
};

const isSickLeave = (something: unknown): something is SickLeave => {
    return typeof something === "object"
        && !!something
        && "startDate" in something
        && "endDate" in something
        && typeof something.startDate === "string"
        && typeof something.endDate === "string";
};

export const parseSickLeave = (something: unknown): SickLeave => {
    if (!isSickLeave(something)) throw new Error("Invalid sick leave");
    return something;
};

const isValidEntryType = (type: unknown): type is string => {
    return typeof type === "string"
        && (type === "Hospital"
            || type === "HealthCheck"
            || type === "OccupationalHealthcare");
};

export const parseEntryType = (type: unknown): void => {
    if (!isValidEntryType(type)) throw new Error("Invalid entry type");
};