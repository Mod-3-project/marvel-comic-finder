import { Comic } from "./fetch-functions"
import { fetchComic } from "./fetch-functions"
export const comicsDiv = document.getElementById('comics-display')
export const comicModalDiv = document.getElementById('comic-dialog')
export const renderInitial = (div: HTMLElement, comics: Array<Comic>) => {
    comics.forEach((comic: Comic) => {
        const cardDiv = document.createElement('div')
        cardDiv.addEventListener('click', async () => {
            const comicRes = await fetchComic(Number(comic.id))
            renderModalForComic(comicModalDiv, comicRes)
            console.log(comicRes)
            return comicRes
        })

        cardDiv.className = 'comic-card'
        cardDiv.id = String(comic.id)
        const h2 = document.createElement('h2');
        h2.textContent = comic.title
        h2.className = 'comic-text'

        const img = document.createElement('img')
        img.setAttribute('width', '200px')
        img.setAttribute('width', '150px')
        img.className = 'comicPic'
        const comicImages = comic.images[0]
        const imgURL = comicImages ? comic.images[0].path + '.' + comic.images[0].extension : ''
        img.src = imgURL

        cardDiv.append(h2, img)
        div.append(cardDiv)
    })
}

export const renderModalForComic = (div: HTMLElement, card: Comic) => {
    if (comicModalDiv) comicModalDiv.innerHTML = ''
    const title = document.createElement('h2');
    title.textContent = card.title

    const issueNumber = document.createElement('h2');
    issueNumber.textContent = `Issue Number: ${String(card.issueNumber)}`;

    const charactersTitle = document.createElement('h2')
    charactersTitle.textContent = 'Characters'
    const characters = document.createElement('h3')
    const charactersContent = card.characters.items.map((character: { name: string, resourceURI: string }) => {
        return character.name
    })
    characters.textContent = charactersContent.join()
    comicModalDiv?.append(title, issueNumber, charactersTitle, characters)

}