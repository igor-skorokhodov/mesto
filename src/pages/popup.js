export class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    _closeByEscape (evt) {
        if(evt.key === 'Escape') {
        this.close();}}

    open() {
        this._popup.classList.add('popup_active');
    }

    close() {
        this._popup.classList.remove('popup_active');
    }

    _handleEscClose(evt) {
        if(evt.key === 'Escape') {
            this.close();
    }
}

    setEventListeners() {
            this._popup.addEventListener('click', (evt) => {
                if (evt.target.classList.contains('popup_active')) {
                    this.close();
                }
                if (evt.target.classList.contains('popup__close-button')) {
                    this.close();
                  }
            })
            document.addEventListener('keydown', (evt) => {
                this._handleEscClose(evt)});
    }
}