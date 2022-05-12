export default class Popup {
    constructor(formSelector) {
        this._popup = document.querySelector('.popup');
        this._form = document.querySelector(formSelector);
        this._handleEscClose = evt => {
            if (evt.key==="Escape") {
                this.close();
            }
        }
    }

    open() {
        this._popup.classList.remove('hidden');
        this._popup.classList.add('visible');
        this._form.classList.remove('hidden');
        this._form.classList.add('visible');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.add('hidden');
        this._popup.classList.remove('visible');
        this._form.classList.add('hidden');
        this._form.classList.remove('visible');
        document.removeEventListener('keydown', this._handleEscClose);
    }    

    setEventListeners() {
        document.addEventListener('click', evt => {
            if (evt.target.classList.contains("popup")) {
                this.close();
            } 
        });
        this._form.addEventListener('click', evt => {
            if (evt.target.classList.contains("exitButton")) {
                this.close();
            } 
        });
    }
}