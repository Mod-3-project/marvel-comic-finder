import { fetchComic, fetchInitialComics } from "./fetch-functions";
import { comicsDiv, renderInitial, renderModalForComic } from "./render-functions";
import { comicModalDiv } from "./render-functions";
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
  let comics = (await fetchInitialComics())!.data.results.filter(result => {
    return result.characters.available > 0
  });
  for (const comic of comics) {
    comic.images = comic.images.filter((img) => !img.path.includes("image_not_available"));
  }
  comics = comics.filter(({ images }) => images.length);
  comics = pickRandom(comics, 14);

  //displaying more info about a card on click
  comicsDiv?.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    if (target.className === 'comic-card') {
      //Waiting a little to prevent sloppy rendering
      setTimeout(() => {
        comicModalDiv.style.display = 'block'
      }, 300)
      const comicRes = await fetchComic(Number(target.id));

      renderModalForComic(comicModalDiv, comicRes!);
      console.log(comicRes);

      const closeButton = document.querySelector('.close')!
      closeButton.addEventListener('click', () => {
        comicModalDiv.style.display = 'none'
        console.log('hi')
      })


    }
  });



  // TODO: display the comics
  console.log(comics);
  renderInitial(comicsDiv, comics)

  console.log(await fetchComic(331));
};

main();
