export default class Api {

    constructor(server) {
      this._server = server;      
    }

    getCards() {

        return fetch(this._server,
                     {method: 'GET'}
                    )
                .then(res => res.json())

    }

    addCard(body) {
        return fetch(this._server,
            {method: 'POST',
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
             body: body}
           )
       .then(res => res.json())
    }

    deleteCard(id) {
        return fetch(this._server + '/' + id,
            {method: 'DELETE',
             headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
           )
       .then(res => res.json())
    }

}