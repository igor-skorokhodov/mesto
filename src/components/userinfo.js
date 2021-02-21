export class UserInfo {
    constructor (userNameSelector, jobSelector) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._jobSelector = document.querySelector(jobSelector);
    }

    getUserInfo () {
        return {
        name: this._userNameSelector.textContent,
        job: this._jobSelector.textContent
        }
    }

    setUserInfo (name, job) {
            this._userNameSelector.textContent = name;
            this._jobSelector.textContent = job;
         }
}