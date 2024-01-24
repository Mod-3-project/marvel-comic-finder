import type { Comic } from "./fetch-functions"

const el = (
    tag: keyof HTMLElementTagNameMap,
    attrs: Record<string, string> = {},
    children: (string | Node)[] = [],
) => {
    const el = document.createElement(tag);
    for (const attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
    }
    el.append(...children);
    return el;
};

export const renderComics = (div: HTMLElement, comics: Comic[]) => {
    div.innerHTML = "";
    div.append(
        ...comics.map(({ id, title, images: [image] }) => {
            return el("div", { class: "comic-card", "data-comic-id": String(id) }, [
                el("h2", { class: "comic-text" }, [title]),
                el("img", {
                    class: "comic-pic",
                    width: "200px",
                    src: image ? `${image.path}.${image.extension}` : "",
                }),
            ]);
        }),
    );
};

export const renderError = (div: HTMLElement, message: string) => {
    div.innerHTML = "";
    div.append(el("h3", { class: "error" }, [message]));
};

export const renderComicModal = (div: HTMLElement, { title, issueNumber, characters }: Comic) => {
    div.innerHTML = "";
    div.append(
        el("img", { class: "close", src: "/cross.png", width: "30px"}),
        el("h2", {}, [title]),
        el("h2", {}, [`Issue Number: ${issueNumber}`]),
        el("h2", {}, ["Characters"]),
        el("textarea", { class: "modal-chars", readOnly: 'true'}, [
            characters.items.map(({ name }) => name).join('\n'),
        ]),
    );
};
