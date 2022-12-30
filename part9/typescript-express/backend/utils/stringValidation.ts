export const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

export const parseString = (name: string, required: boolean, something: unknown): string => {
    if ((!something && required) || !isString(something)) {
        throw new Error(`${name} must be a string`);
    }

    return something;
};

export const parseStringList = (name: string, required: boolean, something: unknown[]): string[] => {
    return something.map((item: unknown) => parseString(name, required, item));
};
