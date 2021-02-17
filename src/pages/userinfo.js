export class UserInfo {
    constructor (userNameSelector, jobSelector) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._jobSelector = document.querySelector(jobSelector);
    }

    getUserInfo () {
        const formElementName = document.querySelector('.popup__form_info_name');
        const formElementJob = document.querySelector('.popup__form_info_job');
        formElementName.value = this._userNameSelector.textContent;
        formElementJob.value = this._jobSelector.textContent;
    }

    setUserInfo () {
            const formElementName = document.querySelector('.popup__form_info_name');
            const formElementJob = document.querySelector('.popup__form_info_job');
            this._userNameSelector.textContent = formElementName.value;
            this._jobSelector.textContent = formElementJob.value;
         }
}