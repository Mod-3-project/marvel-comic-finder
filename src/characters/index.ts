import { pickRandom } from "../utils";
import { FetchCharacters, fetchCharacter, fetchCharactersList } from "./fetch";
import { renderCharacters, renderError, renderCharacterModal } from "./render";
import AOS from "aos";

const fetchCharactersAndFilter = async (params: FetchCharacters = {}) => {
    const res = await fetchCharactersList(params);
    console.log(res);
    if (!res) {
        return;
    }

    return res.filter((character) => !character.thumbnail.path.includes("image_not_available"));
};

const main = async () => {
    AOS.init();

    const characterModalDiv = document.querySelector<HTMLDivElement>("#character-dialog")!;
    characterModalDiv.addEventListener("click", (e) => {
        if (!(e.target as HTMLElement).classList.contains("close")) {
            return;
        }

        characterModalDiv.style.display = "none";
    });

    const charactersDiv = document.querySelector<HTMLDivElement>("#characters-display")!;
    charactersDiv.addEventListener("click", async (e) => {
        const id = (e.target as HTMLElement)?.dataset.characterId;
        if (!id) {
            return;
        }

        const characterRes = await fetchCharacter(Number(id));
        if (!characterRes) {
            renderError(characterModalDiv, "Error retriving data for this character.");
            return;
        }
        renderCharacterModal(characterModalDiv, characterRes);
        console.log(characterRes);

        characterModalDiv.style.display = "block";
    });

    const searchForm = document.querySelector<HTMLFormElement>("#search-char")!;
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const { name } = Object.fromEntries(new FormData(searchForm));
        if (name !== "") {
            const characters = await fetchCharactersAndFilter({ name: name as string, limit: 50 });
            if (!characters) {
                renderError(charactersDiv, "Error retrieving character list.");
            } else if (!characters.length) {
                renderError(charactersDiv, "No characters found.");
            } else {
                renderCharacters(charactersDiv, characters);
            }

            searchForm.reset();
        }
    });

    const characters = await fetchCharactersAndFilter();
    if (!characters) {
        renderError(charactersDiv, "Error retrieving character list.");
    } else {
        renderCharacters(charactersDiv, pickRandom(characters, 30));
    }
};

main();
