import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator, exerciseInputs } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Fullstack!");
});

app.get("/bmi", (req, res) => {
    const height = req.query.height;
    const weight = req.query.weight;

    if (!weight || !height || isNaN(Number(height)) || isNaN(Number(weight))) {
        res.send({ error: "malformatted parameters" });
        return;
    }

    res.send(bmiCalculator(Number(height), Number(weight)));
});

app.post("/exercises", (req, res) => {
    const { days, target }: exerciseInputs = req.body;

    const isNumbersArray = (array: number[]): boolean => {
        return array.reduce((acc, element) => !isNaN(element) && acc, true);
    };

    if (!days || !target || !Array.isArray(days) || !isNumbersArray(days) || isNaN(target)) {
        res.send({ error: "malformatted inputs need { days: number[], target: number }" });
    }

    res.json(exerciseCalculator(days, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
