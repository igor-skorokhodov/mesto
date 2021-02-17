export class Card {
    constructor (name, link, tempalte, open) {
        this._name = name;
        this._link = link;
        this._template = tempalte;
        this._element;
        this._open = open;
    }
    createCard() {
        const element = this._template.cloneNode(true);
        const elementTitle = element.querySelector('.element__title');
        const elementPicture = element.querySelector('.element__picture');
        elementTitle.textContent = this._name;
        elementPicture.src = this._link;
        elementPicture.alt = 'Картинка карточки ' + this._name;
        this._element = element;
        this._addEventListeners();
        return this._element;
    }
    addCardClass(container) {
        const newCard = this.createCard();
        container.prepend(newCard);
     }

     _likeCard(evt) {
        evt.target.classList.toggle('element__heart_anabled');
    }
    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    _addEventListeners() {
        const elementPicture = this._element.querySelector('.element__picture');
        const likeButton = this._element.querySelector('.element__heart');
        const deleteButton = this._element.querySelector('.element__trash');
        elementPicture.addEventListener('click', () => {this._openPicturePopup()});
        likeButton.addEventListener('click', this._likeCard);
        deleteButton.addEventListener('click', this._deleteCard);
    }

    _openPicturePopup() {
        const fullPicture = document.querySelector('.popup__picture');
        const textPicture = document.querySelector('.popup__sign');
        fullPicture.src = this._link;
        fullPicture.alt = "Место крупным планом";
        textPicture.textContent = this._name;
        this._open();
}
}