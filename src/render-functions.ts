import { Comic } from "./fetch-functions"

export const comicsDiv = document.getElementById('comics-display')

export const renderInitial = (div: HTMLElement | null, comics: Array<Comic>) => {
    comics.forEach((comic: Comic) => {
        const cardDiv = document.createElement('div')
        cardDiv.className = 'comic-card'
        const h2 = document.createElement('h2');
        h2.textContent = comic.title
        h2.className = 'comic-text'

        const img = document.createElement('img')
        img.setAttribute('width', '200px') 
        img.setAttribute('width', '150px')
        img.className = 'comicPic'
        const comicImages = comic.images[0] 
        const imgURL = comicImages? comic.images[0].path + '.' + comic.images[0].extension : ''
        img.src = imgURL

       cardDiv.append(h2, img)
       div.append(cardDiv)
    })
}
