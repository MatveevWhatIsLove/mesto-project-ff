const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-27",
    headers: {
        authorization: "b6f12e95-8f39-44d8-87c1-e031bcbb2cd7",
        'Content-Type': 'application/json'
    }
}

// Получение данных пользоватпеля
export const getUserInfo = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
    })
    // Проверка на результат запроса
    .then(res =>{
        if(res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
    // Преобразование в промис объекта
    .then((data) => 
        {
            return {
                name: data.name,
                about: data.about,
                avatar: data.avatar,
                id: data._id,
                cohort:data.cohort
            };
           
        })
}

// обновление данных пользователя
// userInfo = {
//          name = name,
//          about = about
// }
export const userInfoUpdate = (userInfo) =>
{
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/users/me', 
    {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userInfo.name,
            about: userInfo.about
        })
    })

    .then((res) => 
    {
        if(res.ok){
            return res.json();
        }
        else{
            return Promise.reject(`Ошибка ${res.status}`);
        }
    })


}

export const userAvatarUpdate = (userInfo) => 
{
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/users/me/avatar`,
        {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar: userInfo.avatar
            })
        }
    )
    .then((res) => 
        {
            if(res.ok){
                return res.json();
            }
            else{
                return Promise.reject(`Ошибка ${res.status}`);
            }
        })
    
        // .then((data) => {
        //     console.log(data);
        // })
}

// Получение карточек
export const getInitialCards = () =>{
    return fetch(`${config.baseUrl}/cards`,{
        headers: config.headers
    })
    // проверка, ок ли результат
    .then(res =>{
        if(res.ok){
            return res.json();
        }else{
            return Promise.reject(`Ошибка ${res.status}`);
        }
        
    })

    .then((cardData) => 
        {
            return cardData;
        })
}

export const postNewCard = (newCard) =>
{
    return fetch('https://nomoreparties.co/v1/wff-cohort-27/cards',
    {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(
        {
            name: newCard.name,
            link: newCard.link
        })
    })
    
    .then((res) => 
        {
            if(res.ok){
                return res.json();
            }
            else{
                return Promise.reject(`Ошибка ${res.status}`);
            }
        })

    // .then(res => res.json())

    // .then((res) => {
    //     if(res.ok){
    //         console.log('ok')
    //     }
    // })
}

export const deleteCardById = (cardId) => 
{
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/${cardId} `,
        {
            method: 'DELETE',
            headers: config.headers
        }
    )
}

export const likeCardUser = (cardId) => 
{
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId} `,
        {
            method: 'PUT',
            headers: config.headers
        }
    )
    .then((res) =>
        {
            if(res.ok){
                return res.json();   
            }else{
                return Promise.reject(`Ошибка ${res.status}`);
            }
        })
}

export const likeCardUserDel = (cardId) => 
{
    return fetch(`https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) =>
        {
            if(res.ok){
                return res.json();   
            }else{
                return Promise.reject(`Ошибка ${res.status}`);
            }
        })
}