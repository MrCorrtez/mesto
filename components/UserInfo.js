export default class UserInfo {
    constructor({ userNameSelector,occupationSelector}) {

        this._profileName = document.querySelector(userNameSelector);
        this._profileOccupation = document.querySelector(occupationSelector);

    }

    getUserInfo() {
        return {name: this._profileName.textContent,
                occupation: this._profileOccupation.textContent}
    }

    setUserInfo({ name,occupation }) {
        this._profileName.textContent = name;
        this._profileOccupation.textContent = occupation;
    }
}