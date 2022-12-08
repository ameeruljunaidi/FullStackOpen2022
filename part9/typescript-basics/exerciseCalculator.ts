export type statistics = {
    periodLength: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
};

export type exerciseInputs = {
    days: number[];
    target: number;
};

export const parseExerciseCalculatorArguments = (args: string[]): exerciseInputs => {
    if (args.length < 9) throw new Error("Not enough arguments");
    if (args.length > 9) throw new Error("Too many arguments");

    let days: number[] = [];
    for (let i = 2; i < 8; ++i) {
        if (isNaN(Number(args[i]))) throw new Error("Days be a number");
        days.push(Number(args[i]));
    }

    if (isNaN(Number(args[8]))) throw new Error("Target must be a number");
    const target = Number(args[8]);

    return { days, target };
};

export const exerciseCalculator = (exercises: number[], target: number): statistics => {
    try {
        const periodLength = exercises.reduce((total, exercise) => total + exercise, 0);
        const trainingDays = exercises.reduce((total, exercise) => (exercise ? total + 1 : total), 0);
        const average = periodLength / trainingDays;
        const success = average < target ? false : true;
        const rating = Math.floor(Math.random() * 4);
        const ratingDescription = "You did good mate";

        return { periodLength, success, rating, ratingDescription, target, average };
    } catch (error) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        throw new Error(errorMessage);
    }
};
