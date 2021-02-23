export class Card {
    constructor (name, link, tempalte, handleCardClick) {
        this._name = name;
        this._link = link;
        this._template = tempalte;
        this._element;
        this._handleCardClick = handleCardClick;
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

     _likeCard(evt) {
        evt.target.classList.toggle('element__heart_anabled');
    }
    _deleteCard(evt) {
        evt.target.closest('.element').remove();
    }

    _addEventListeners() {
        const likeButton = this._element.querySelector('.element__heart');
        const deleteButton = this._element.querySelector('.element__trash');
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
          });
        likeButton.addEventListener('click', this._likeCard);
        deleteButton.addEventListener('click', this._deleteCard);
    }

}