class Api{
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    // проверка ответа
    _checkResponse(res) {
        if (res.ok){
            return res.json();}
        return Promise.reject('Произошла ошибка')
    }

    _getHeaders() {
        const jwt = localStorage.getItem("jwt");
        return {
            "Authorization" : `Bearer ${jwt}`,
            ...this._headers
        }
    }

    //Рендер всех карточек на страницу с сервера
    getAllCards() {
        return fetch(`${this._url}cards/`, {
            method: 'GET',
            headers: this._getHeaders()
        })
            .then(this._checkResponse)
    }
    //Добавление карточки из формы
    addCard(data) {
        return fetch(`${this._url}cards/`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._checkResponse)
    }
//Сменить аватар
    changeAvatar(data) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }
//Имя и работа с сервера
    getApiUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse)
    }
//Имя и работа из формы на страницу
    patchUserInfo(data) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
            .then(this._checkResponse)
    }
//Удалить карточку
    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        }).then(this._checkResponse)
    }
//Добавить лайк
    addLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: "PUT",
            headers: this._getHeaders(),
        }).then(this._checkResponse)
    }

    //Убрать лайк
    disLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: "DELETE",
            headers: this._getHeaders(),
        }).then(this._checkResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.disLike(id);
        } else {
            return this.addLike(id);
        }
    }

}

//Экземпляр API
const api = new Api({
    url: "https://a.kutuzova.mesto.students.nomoredomains.work/",
    // url: "http://localhost:3001/",
    headers: {
        "content-type": "application/json"
    }
});

export default api;
