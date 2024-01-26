import {
    fetchCharacter,
} from "../characters/fetchChar";
import {FetchComics,
        fetchComic,
        fetchComicList} from '../comics/fetchComics'
import { renderComics, renderComicModal, renderError, renderCharModal } from './renderComics'

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

const fetchComicsAndFilter = async (params: FetchComics = {}) => {
    const result = await fetchComicList(params);
    if (!result || !result.data?.results) {
        return;
    }

    const comics = result.data.results.filter(({ characters }) => characters.available > 0);
    for (const comic of comics) {
        comic.images = comic.images.filter((img) => !img.path.includes("image_not_available"));
    }
    return comics.filter(({ images }) => images.length);
};

const main = async () => {
    if(document.getElementById('search')) {
        (document.getElementById('find') as HTMLElement).style.textDecoration = 'underline'
       }
    const modalDiv = document.querySelector<HTMLDivElement>("#comic-dialog")!;
    modalDiv.addEventListener("click", async (e) => {
        if (!(e.target as HTMLElement).classList.contains("close")) {
            const charId = (e.target as HTMLElement)?.dataset.charId;
            if (charId) {
                const character = await fetchCharacter(Number(charId));
                if (!character) {
                    renderError(modalDiv, "Error retriving data for this character.");
                    return;
                }
    
                    renderCharModal(modalDiv, character);
              
                
            }
        } else {
            modalDiv.style.display = "none";
        }
    });

    const comicsDiv = document.querySelector<HTMLDivElement>("#comics-display")!;
    comicsDiv.addEventListener("click", async (e) => {
        const id = (e.target as HTMLElement)?.dataset.comicId;
        if (!id) {
            return;
        }

        const comicRes = await fetchComic(Number(id));
        if (!comicRes) {
            renderError(modalDiv, "Error retriving data for this comic.");
            return;
        }
        renderComicModal(modalDiv, comicRes);
        console.log(comicRes);

        modalDiv.style.display = "block";
    });

    const searchForm = document.querySelector<HTMLFormElement>("#search")!;
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const { title } = Object.fromEntries(new FormData(searchForm));
        if (title != '') {
            const comics = await fetchComicsAndFilter({ title: title as string, limit: 63 });
            if (!comics) {
                renderError(comicsDiv, "Error retrieving comic list.");
            } else if (!comics.length) {
                renderError(comicsDiv, "No comics found.");
            } else {
                renderComics(comicsDiv, comics);
            }
    
            searchForm.reset();
        }
       
    });

    const comics = await fetchComicsAndFilter();
    if (!comics) {
        renderError(comicsDiv, "Error retrieving comic list.");
    } else {
        renderComics(comicsDiv, pickRandom(comics, 99));
        console.log(comics);
    }
};

main();
