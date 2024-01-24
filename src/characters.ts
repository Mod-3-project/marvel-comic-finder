// import { FetchCharacters, Fetchcharacters, fetchCharacters, fetchcharacter, fetchcharacterList } from "./fetch-functions";
// import { rendercharacters, rendercharacterModal, renderError } from "./render-functions/character-render";

// const fetchCharactersAndFilter = async (params: FetchCharacters = {}) => {
//     const characters = await fetchCharacters(params);
//     if (!characters || !characters.data?.results) {
//         return;
//     }
    
//     for (const character of characters) {
//         character.images = character.images.filter((img) => !img.path.includes("image_not_available"));
//     }
//     return characters.filter(({ images }) => images.length);
// };

// const main = async () => {
//     const characterModalDiv = document.querySelector<HTMLDivElement>("#character-dialog")!;
//     characterModalDiv.addEventListener("click", (e) => {
//         if (!(e.target as HTMLElement).classList.contains("close")) {
//             return;
//         }

//         characterModalDiv.style.display = "none";
//     });

//     const charactersDiv = document.querySelector<HTMLDivElement>("#characters-display")!;
//     charactersDiv.addEventListener("click", async (e) => {
//         const id = (e.target as HTMLElement)?.dataset.characterId;
//         if (!id) {
//             return;
//         }

//         const characterRes = await fetchcharacter(Number(id));
//         if (!characterRes) {
//             renderError(characterModalDiv, "Error retriving data for this character.");
//             return;
//         }
//         rendercharacterModal(characterModalDiv, characterRes);
//         console.log(characterRes);

//         characterModalDiv.style.display = "block";
//     });

//     const searchForm = document.querySelector<HTMLFormElement>("#search")!;
//     searchForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const { title } = Object.fromEntries(new FormData(searchForm));
//         const characters = await fetchcharactersAndFilter({ title: title as string });
//         if (!characters) {
//             renderError(charactersDiv, "Error retrieving character list.");
//         } else if (!characters.length) {
//             renderError(charactersDiv, "No characters found.");
//         } else {
//             rendercharacters(charactersDiv, characters);
//         }

//         searchForm.reset();
//     });

//     const characters = await fetchcharactersAndFilter();
//     if (!characters) {
//         renderError(charactersDiv, "Error retrieving character list.");
//     } else {
//         rendercharacters(charactersDiv, pickRandom(characters, 14));
//         console.log(characters);
//     }
// };

// main();
