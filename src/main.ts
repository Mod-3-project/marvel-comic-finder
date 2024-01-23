import { fetchComic, fetchInitialComics } from "./fetch-functions";

const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const pickRandom = <T>(element: T[], count: number) => {
    const result = Array(count);
    for (let i = 0; i < count; i++) {
        result[i] = element.splice(randInt(0, element.length), 1);
    }
    return result;
};

const main = async () => {
    const initialComics = pickRandom((await fetchInitialComics())!.data.results, 6);
    // TODO: display the comics
    console.log(initialComics);

    console.log(await fetchComic(331));
};

main();
