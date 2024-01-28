export const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const pickRandom = <T>(arr: T[], count: number) => {
    const result = Array<T>(count);
    for (let i = 0; i < count; i++) {
        if (!arr.length) {
            return result.slice(0, i);
        }

        result[i] = arr.splice(randInt(0, arr.length), 1)[0];
    }
    return result;
};
