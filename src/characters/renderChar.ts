import type { Character } from "./fetchChar";

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

export const renderCharacters = (div: HTMLElement, characters: Character[]) => {
    div.innerHTML = "";
    div.append(
        ...characters.map(({ id, name, thumbnail }) => {
            return el("div", { class: "character-card", "data-character-id": String(id) }, [
                el("h2", { class: "character-text" }, [name]),
                el("img", {
                    class: "character-pic",
                    width: "200px",
                    height: '200px',
                    src: thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : "",
                }),
            ]);
        }),
    );
};

export const renderError = (div: HTMLElement, message: string) => {
    div.innerHTML = "";
    div.append(el("h3", { class: "error" }, [message]));
};

export const rendercharacterModal = (div: HTMLElement, { name, comics }: Character) => {
    div.innerHTML = "";
    div.append(
        el("img", { class: "close", src: "/cross.png", width: "30px" }),
        el("h2", {}, [name]),
        el("h2", {}, ["Featured Comics"]),
        el(
            "ul",
            { class: "modal-chars", readOnly: "true" },
            comics.items.map(({ name }) => el("li", {}, [el("a", { href: "" }, [name])])),
        ),
    );
};
