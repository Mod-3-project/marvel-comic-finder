const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = "https://gateway.marvel.com:443";

export type Comic = {
    id: number;
    title: string;
    issueNumber: number;
    description: string;
    resourceURI: string;
    images: { path: string, extension: string}[];// host/v1/public/comics/{id}
};

export type ComicDataWrapper = {
    data: {
        results: Comic[];
    };
};

const fetchJsonOrNull = async <T>(url: string, params?: RequestInit) => {
    try {
        return (await fetch(url, params).then((resp) => resp.json())) as T;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn(error.message);
        }
        return null;
    }
};

export const fetchInitialComics = async (limit: number = 20, offset: number = 0) => {
    return await fetchJsonOrNull<ComicDataWrapper>(
        `${API_HOST}/v1/public/comics?apikey=${API_KEY}&limit=${limit}&offset=${offset}`,
    );
};

export const fetchComic = async (id: number) => {
    const obj = await fetchJsonOrNull<ComicDataWrapper>(
        `${API_HOST}/v1/public/comics/${id}?apikey=${API_KEY}`,
    );
    return obj?.data.results?.[0];
};
