export class Card {
    constructor (user, data, tempalte, handleCardClick, removeCardFunction, likeCardFunction) {
        this._name = data.name;
        this._link = data.link;
        this._template = tempalte;
        this._element = this._template.cloneNode(true);;
        this._handleCardClick = handleCardClick;        
        this._id = data._id;
        this._idCardOwner = data.owner._id;
        this._idUser = user._id;
        this._countLikes = data.likes.length;
        this._removeCardFunction = removeCardFunction;
        this._likeCardFunction = likeCardFunction;
        this._card = this._element.querySelector('.element');
        this._heart = this._element.querySelector('.element__heart');
        this._likes =this._element.querySelector('.element__likes');
    }
    createCard(data) {
        const elementTitle = this._element.querySelector('.element__title');
        const elementPicture = this._element.querySelector('.element__picture');
        elementTitle.textContent = this._name;
        elementPicture.src = this._link;
        elementPicture.alt = 'Картинка карточки ' + this._name;
        ;
        if (this.isLiked(data)) {
            this._heart.classList.remove('element__heart_anabled');
            this._likes.textContent = data.likes.length;
        }
        else {
            this._heart.classList.add('element__heart_anabled');
            this._likes.textContent = data.likes.length;
        }
        this._addEventListeners(data);
        
        return this._element;
    }

     likeCard (data) {
        this._heart.classList.add('element__heart_anabled');
        this._likes.textContent = data.likes.length + 1;
     }
     
     dislikeCard (data) {
        this._heart.classList.remove('element__heart_anabled');
        this._likes.textContent = data.likes.length - 1;
     }
    deleteCard() {
        this._card.remove();
    }

    isLiked (data) {
        let i = 0;
        data.likes.forEach ((like) => {
            if (like._id !== this._idUser || like._id !== this._idUser) {
                i = i + 0;
            } 
            else {
              i = i + 1;
        }
        })
        if (i === 0) {
            return true;
        }
        else {
            return false;
         }
    }

    _addEventListeners(data) {
        const likeButton = this._element.querySelector('.element__heart');
        const deleteButton = this._element.querySelector('.element__trash')
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
          });
        likeButton.addEventListener('click', () =>  {
            this._likeCardFunction();
        });
        if (this._idCardOwner === this._idUser) {
        deleteButton.addEventListener('click', () => {
            this._removeCardFunction(data);
           })}
            else {
                deleteButton.remove();
            }
    }

}