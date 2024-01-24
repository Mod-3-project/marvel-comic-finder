const API_KEY = import.meta.env.VITE_API_KEY;
const API_HOST = "https://gateway.marvel.com:443";

export type Comic = {
    id: number;
    title: string;
    issueNumber: number;
    description: string;
    resourceURI: string;
    images: { path: string; extension: string }[];
    characters: {
        available: number;
        collectionURI: string;
        items: { name: string; resourceURI: string }[];
        returned: number;
    };
};

export type ComicDataWrapper = {
    code: number;
    message?: string;
    data?: {
        results: Comic[];
    };
};

const fetchJson = async <T>(url: RequestInfo | URL, params?: RequestInit) => {
    try {
        return (await fetch(url, params).then((resp) => resp.json())) as T;
    } catch (error) {
        console.warn(error);
        return;
    }
};

export type FetchComics = {
    limit?: number;
    offset?: number;
    title?: string;
};

export const fetchComicList = async ({ limit, offset, title }: FetchComics = {}) => {
    const url = new URL("/v1/public/comics", API_HOST);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("limit", String(limit ?? 50));
    url.searchParams.set("offset", String(offset ?? 0));
    if (title) {
        url.searchParams.set("title", title);
    }

    return await fetchJson<ComicDataWrapper>(url);
};

export const fetchComic = async (id: number) => {
    const url = new URL(`/v1/public/comics/${id}`, API_HOST);
    url.searchParams.set("apikey", API_KEY);
    return (await fetchJson<ComicDataWrapper>(url))?.data?.results?.[0];
};
