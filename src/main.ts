import { fetchComic, fetchInitialComics } from "./fetch-functions";

const main = async () => {
    console.log(await fetchInitialComics());
    console.log(await fetchComic(331));
};

main();
