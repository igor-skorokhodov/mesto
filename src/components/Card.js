
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
    }
    createCard(data) {
        const elementTitle = this._element.querySelector('.element__title');
        const elementPicture = this._element.querySelector('.element__picture');
        const elementLike = this._element.querySelector('.element__likes');
        const heart = this._element.querySelector('.element__heart');
        elementTitle.textContent = this._name;
        elementPicture.src = this._link;
        elementPicture.alt = 'Картинка карточки ' + this._name;
        elementLike.textContent = this._countLikes
        ;
        let i = 0;
        data.likes.forEach ((like) => {
            if (like._id !== 'b7c08a2d642b994c394c506b') {
                i = i + 0;
            } 
            else {
              i = i + 1;
        }
        })
        if (i === 0) {
            heart.classList.remove('element__heart_anabled');

        }
        else {
            heart.classList.add('element__heart_anabled');
         }
        this._addEventListeners(data);
        
        return this._element;
    }

     _likeCard (evt) {
        evt.target.classList.toggle('element__heart_anabled');
     }
        
    _deleteCard() {
        this._card.remove();
    }

    _addEventListeners(data) {
        const likeButton = this._element.querySelector('.element__heart');
        const deleteButton = this._element.querySelector('.element__trash')
        const likes = this._element.querySelector('.element__likes');
        const yesButton = document.querySelector('#questionButton');
        this._element.querySelector('.element__picture').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link)
          });
        likeButton.addEventListener('click', (evt) =>  {
            this._likeCard(evt);
            this._likeCardFunction();
            let i = 0;
            data.likes.forEach ((like) => {
                if (like._id !== 'b7c08a2d642b994c394c506b') {
                    i = i + 0;
                } 
                else {
                  i = i + 1;
            }
            })
            if (i === 0) {
                likes.textContent = data.likes.length + 1;
    
            }
            else {
                likes.textContent = data.likes.length - 1;
             }

        });
        if (this._idCardOwner === this._idUser) {
        deleteButton.addEventListener('click', () => {
            this._removeCardFunction(data);
            yesButton.addEventListener('click', () => {
                this._deleteCard();
            })
           })}
            else {
                deleteButton.remove();
            }
    }

}