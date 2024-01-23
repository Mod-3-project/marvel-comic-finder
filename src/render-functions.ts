import { Comic } from "./fetch-functions"

export const comicsDiv = document.getElementById('comics-display')!
export const comicModalDiv = document.getElementById('comic-dialog')!

export const renderModalForComic = (div: HTMLElement, card: Comic) => {
    if (div) div.innerHTML = `
    <img class="close" src="/cross.png" width="30px">
    `

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

    characters.innerHTML = charactersContent.join('<br>')
    console.log(characters.textContent)
    characters.style.width = '100%'
    div?.append(title, issueNumber, charactersTitle, characters)

}
export const renderInitial = (div: HTMLElement, comics: Array<Comic>) => {
    comics.forEach((comic: Comic) => {
        const cardDiv = document.createElement('div')
        cardDiv.className = 'comic-card', cardDiv.id = String(comic.id)

        const h2 = document.createElement('h2')
        h2.textContent = comic.title, h2.className = 'comic-text'

        const img = document.createElement('img')
        img.setAttribute('width', '200px'), img.setAttribute('width', '150px'), img.className = 'comicPic'

        const comicImages = comic.images[0]
        const imgURL = comicImages.path + '.' + comicImages.extension
        img.src = imgURL


        cardDiv.append(h2, img)
        div.append(cardDiv)
    })
}

