export class UserInfo {
    constructor (userNameSelector, jobSelector) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._jobSelector = document.querySelector(jobSelector);
        this._id = 10;
        this._name = '';
        this._about = '';
        this._avatar = '';
    }

    getUserInfo () {
        return {
        name: this._userNameSelector.textContent,
        job: this._jobSelector.textContent
        }
    }

    setUserInfo (data) {
        this._id = data._id;
        this._name = data.name;
        this._about = data.about;
        
        this._userNameSelector.textContent = this._name;
        this._jobSelector.textContent = this._about;
    }

    setAvatar(data) {
        this._avatar = data.avatar;
        const avatarPic = document.querySelector('.profile__avatar');
        avatarPic.src = this._avatar;
    }
}
