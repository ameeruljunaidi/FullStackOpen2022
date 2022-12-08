// calculates a BMI based on a given height (in centimeters) and weight (in kilograms)

type bmiInputs = {
    heightCm: number;
    weightKg: number;
};

export const parseBmiCalculatorArguments = (args: string[]): bmiInputs => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return { heightCm: Number(args[2]), weightKg: Number(args[3]) };
    } else {
        throw new Error("Provided values were not numbers");
    }
};

export const bmiCalculator = (heightCm: number, weightKg: number): string => {
    try {
        const bmi = weightKg / Math.pow(heightCm / 100, 2);

        if (bmi < 18.5) {
            return "underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            return "healthy";
        } else if (bmi >= 25 && bmi < 30) {
            return "overweight";
        } else {
            return "obese";
        }
    } catch (error) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }

        throw new Error(errorMessage);
    }
};
