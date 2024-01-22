
const API_KEY = import.meta.env.VITE_API_KEY

 export const fetchInitialComics = async() : Promise<object | null> => {
    const url = `https://gateway.marvel.com:443/v1/public/comics?apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const comics = await response.json();
        console.log(comics)
        return comics
    } catch(error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message)
        }
        return null
    }
}
