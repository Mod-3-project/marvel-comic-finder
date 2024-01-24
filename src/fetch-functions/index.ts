export * from "./character-fetch";
export * from "./comic-fetch";

export type DataContainer<T> = {
    offset?: number;
    limit?: number;
    total?: number;
    count?: number;
    results?: T[];
}

export type ResponseWrapper<T> = {
    code: number;
    message?: string;
    data?: DataContainer<T>;
};

export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_HOST = "https://gateway.marvel.com:443";

export const fetchJson = async <T>(url: RequestInfo | URL, params?: RequestInit) => {
    try {
        return (await fetch(url, params).then((resp) => resp.json())) as T;
    } catch (error) {
        console.warn(error);
        return;
    }
};
