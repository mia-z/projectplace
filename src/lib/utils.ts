export const colourStrings = [
    "red",
    "blue",
    "orange",
    "purple",
    "black",
    "green",
    "yellow",
    "pink",
] as const;

import colours from "$assets/colours.json";

const colourNames = colours.map((x) => x.name);

export const randomColourName = (): string => {
    return colourNames[Math.floor(Math.random() * colourNames.length)];
};

export const lerp = (a1: number, a2: number, t: number) => a1 * (1 - t) + a2 * t;