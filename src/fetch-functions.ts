const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = "https://gateway.marvel.com:443";

export type Comic = {
    id: number;
    title: string;
    issueNumber: number;
    description: string;
    resourceURI: string; // host/v1/public/comics/{id}
};

export type ComicDataWrapper = {
    data: {
        results: Comic[];
    };
};

export const fetchInitialComics = async () => {
    const url = `${API_HOST}/v1/public/comics?apikey=${API_KEY}`;
    try {
        return await fetch(url).then(resp => resp.json()) as Comic;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message);
        }
        return null;
    }
};
