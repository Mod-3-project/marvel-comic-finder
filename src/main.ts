import { fetchComic, fetchInitialComics } from "./fetch-functions";
import { comicsDiv, renderInitial } from "./render-functions";

const randInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const pickRandom = <T>(element: T[], count: number) => {
    const result = Array(count);
    for (let i = 0; i < count; i++) {
        result[i] = element.splice(randInt(0, element.length), 1)[0];
    }
    return result;
};

const main = async () => {
    let comics = (await fetchInitialComics())!.data.results;
    for (const comic of comics) {
        comic.images = comic.images.filter((img) => !img.path.includes("image_not_available"));
    }
    comics = comics.filter(({ images }) => images.length);
    comics = pickRandom(comics, 6);
    // TODO: display the comics
    console.log(comics);
 
    renderInitial(comicsDiv, comics)
    console.log(await fetchComic(331));
};

main();
