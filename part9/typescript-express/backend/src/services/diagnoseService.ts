import diagnosesData from "../data/diagnoses.json";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default { getDiagnoses, addDiagnosis };
