export default class Section {
    constructor({ items,renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._cardElements = document.querySelector(containerSelector);
    }

    renderAll() {
        this._items.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(card) {
        this._cardElements.append(card);
    }
}