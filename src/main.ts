import { type FetchComics, fetchComic, fetchComicList } from "./fetch-functions";
import { renderComics, renderComicModal } from "./render-functions";

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const pickRandom = <T>(arr: T[], count: number) => {
    const result = Array<T>(count);
    for (let i = 0; i < count; i++) {
        if (!arr.length) {
            return result.slice(0, i);
        }

        result[i] = arr.splice(randInt(0, arr.length), 1)[0];
    }
    return result;
};

const fetchComicsAndFilter = async (params: FetchComics = {}) => {
    const result = await fetchComicList(params);
    if (!result || !result.data) {
        console.log("fetch comic list failed, probably rate limited...");
        return [];
    }

    const comics = result.data.results.filter(({ characters }) => characters.available > 0);
    for (const comic of comics) {
        comic.images = comic.images.filter((img) => !img.path.includes("image_not_available"));
    }
    return comics.filter(({ images }) => images.length);
};

const main = async () => {
    const comicModalDiv = document.querySelector<HTMLDivElement>("#comic-dialog")!;
    comicModalDiv.addEventListener("click", (e) => {
        if (!(e.target as HTMLElement).classList.contains("close")) {
            return;
        }

        comicModalDiv.style.display = "none";
    });

    const comicsDiv = document.querySelector<HTMLDivElement>("#comics-display")!;
    comicsDiv.addEventListener("click", async (e) => {
        const id = (e.target as HTMLElement)?.dataset.comicId;
        if (!id) {
            return;
        }

        const comicRes = await fetchComic(Number(id));
        if (!comicRes) {
            console.log(`fetch comic ${id} failed, probably rate limited...`);
            return;
        }
        renderComicModal(comicModalDiv, comicRes);
        console.log(comicRes);

        comicModalDiv.style.display = "block";
    });

    const comics = pickRandom(await fetchComicsAndFilter(), 14);
    renderComics(comicsDiv, comics);
    console.log(comics);
};

main();
