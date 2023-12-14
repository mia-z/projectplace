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
