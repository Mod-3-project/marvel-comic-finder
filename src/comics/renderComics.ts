import { Character } from "../Characters/characters";
import type { Comic } from "./fetchComics";

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

const renderModal = (div: HTMLElement, render: (div: HTMLElement) => void) => {
    div.innerHTML = "";

    const content = el("div", { class: "modal-content" });
    render(content);

    div.append(el("img", { class: "close", src: "/cross.png", width: "30px" }), content);
};

export const renderComicModal = (div: HTMLElement, { title, issueNumber, characters }: Comic) => {
    renderModal(div, (content) => {
        content.append(
            el("h2", {}, [title]),
            el("h2", {}, [`Issue Number: ${issueNumber}`]),
            el("h2", {}, ["Characters"]),
            el(
                "ul",
                { class: "modal-chars" },
                characters.items.map(({ name, resourceURI }) => {
                    const id = resourceURI.split("/");
                    return el("li", { "data-char-id": id[id.length - 1] }, [name]);
                }),
            ),
        );
    });
};

export const renderCharModal = (div: HTMLElement, { name, comics, thumbnail }: Character) => {
    renderModal(div, (content) => {
        content.append(
            el("h2", {}, [name]),
            el("img", { src: `${thumbnail.path}.${thumbnail.extension}`, width: "200px" }),
            el("h2", {}, ["Comics"]),
            el(
                "ul",
                { class: "modal-chars" },
                comics.items.map(({ name, resourceURI }) => {
                    return el("li", {}, [name]);
                }),
            ),
        );
    });
};
