import { pickRandom } from "./comics";
import { FetchCharacters, fetchCharactersList } from "./fetch-functions";
import { renderCharacters, renderError } from "./render-functions/char-render";


const fetchCharactersAndFilter = async (params: FetchCharacters = {}) => {
    const res =  await fetchCharactersList(params);
    if (!res) {
        return;
    }
    
   return res.filter((character) => !character.thumbnail.path.includes("image_not_available"))
    
};

const main = async () => {
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

        // const characterRes = await fetchcharacter(Number(id));
        // if (!characterRes) {
        //     renderError(characterModalDiv, "Error retriving data for this character.");
        //     return;
        // }
        // rendercharacterModal(characterModalDiv, characterRes);
        // console.log(characterRes);

        characterModalDiv.style.display = "block";
    });

    // const searchForm = document.querySelector<HTMLFormElement>("#search")!;
    // searchForm.addEventListener("submit", async (e) => {
    //     e.preventDefault();
    //     const { title } = Object.fromEntries(new FormData(searchForm));
    //     const characters = await fetchcharactersAndFilter({ title: title as string });
    //     if (!characters) {
    //         renderError(charactersDiv, "Error retrieving character list.");
    //     } else if (!characters.length) {
    //         renderError(charactersDiv, "No characters found.");
    //     } else {
    //         rendercharacters(charactersDiv, characters);
    //     }

    //     searchForm.reset();
    // });

    const characters = await fetchCharactersAndFilter({limit: 50});
    if (!characters) {
        renderError(charactersDiv, "Error retrieving character list.");
    } else {
        renderCharacters(charactersDiv, pickRandom((characters), 14));
        console.log(characters);
    }
};

main();
