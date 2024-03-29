import { type Image, API_HOST, API_KEY, type ResponseWrapper, fetchJson } from "../fetch";

export type Comic = {
    id: number;
    title: string;
    issueNumber: number;
    description: string;
    resourceURI: string;
    images: Image[];
    characters: {
        available: number;
        collectionURI: string;
        items: { name: string; resourceURI: string }[];
        returned: number;
    };
};

export type ComicDataWrapper = ResponseWrapper<Comic>;

export const fetchComic = async (id: number) => {
    const url = new URL(`/v1/public/comics/${id}`, API_HOST);
    url.searchParams.set("apikey", API_KEY);
    return (await fetchJson<ComicDataWrapper>(url, { cache: "force-cache" }))?.data?.results?.[0];
};

export type FetchComics = {
    limit?: number;
    offset?: number;
    title?: string;
};

export const fetchComicList = async ({ limit, offset, title }: FetchComics = {}) => {
    const url = new URL("/v1/public/comics", API_HOST);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("limit", String(limit ?? 99));
    url.searchParams.set("offset", String(offset ?? 0));
    if (title) {
        url.searchParams.set("title", title);
    }
    return await fetchJson<ComicDataWrapper>(url, { cache: "force-cache" });
};
