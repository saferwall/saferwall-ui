export const isStringSHA256 = (str: string): boolean => {
    return typeof str === "string" && str.match(/\b[A-Fa-f0-9]{64}\b/) !== null;
}