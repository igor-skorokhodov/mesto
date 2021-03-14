export class Api {
    constructor (config) {
        this._url = config.url;
        this._headers = config.headers;
    }

setUserInfo() { //подгрузили инфу о пользователе из сервера
    return fetch(this._url+'users/me', {
        method: "GET",
        headers: this._headers
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

PostUserInfo(name, about) { //загрузили инфу о пользователе на сервер
    return fetch(this._url+'users/me', {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            about: about
          })
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

getAllCards() { //загрузили все карточки
   return fetch(this._url+'cards', {
        method: "GET",
        headers: this._headers
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

addNewCard(name, link) { //добавили карточку
    return fetch(this._url+'cards', {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
          })
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

removeCard(id) { //удалили карточку
    return fetch(`${this._url}cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

setLike (id) { //загрузили лайк на сервер
    return fetch(`${this._url}cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

deleteLike (id) { //удалили лайк с сервера
    return fetch(`${this._url}cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

userAvatarUpdate(link) { //загрузили новый аватар
    return fetch(this._url+'users/me/avatar', {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar: link
          })
    }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

userAvatarGet() { 
    return fetch(this._url+'users/me', {
         method: "GET",
         headers: this._headers
     }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
 }
 

}
