import { type Image, API_HOST, API_KEY, ResponseWrapper, fetchJson } from ".";

export type Character = {
    data: any;
    id: number;
    name: string;
    thumbnail: { path: string; extension: string };
    comics: { available: number, items: { resurceURI: string, name: string }[] }
};

export type CharacterData = ResponseWrapper<Character>;

export const fetchCharacter = async (id: number) => {
    const url = new URL(`/v1/public/characters/${id}`, API_HOST);
    url.searchParams.set("apikey", API_KEY);
    return (await fetchJson<CharacterData>(url, { cache: "force-cache" }))?.data?.results?.[0];
};

export type FetchCharacters = {
    limit?: number;
    offset?: number;
    name?: string;
};

export const fetchCharactersList = async ({ limit, offset, name }: FetchCharacters) => {
    const url = new URL("/v1/public/characters", API_HOST);
    url.searchParams.set("apikey", API_KEY);
    url.searchParams.set("limit", String(limit ?? 50));
    url.searchParams.set("offset", String(offset ?? 0));
    if (name) url.searchParams.set("name", name);
    //Wrapper the same as comic wrapper
    const res = (await fetchJson<CharacterData>(url, { cache: "force-cache" }))?.data?.results;
    console.log(res);
    return res;
};
