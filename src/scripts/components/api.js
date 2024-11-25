const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-27",
    headers: {
        authorization: "b6f12e95-8f39-44d8-87c1-e031bcbb2cd7",
        'Content-Type': 'application/json'
    }
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

const nomorepartiesUrlBase = 'https://nomoreparties.co/v1/wff-cohort-27';

// Получение данных пользоватпеля
export const getUserInfo = () =>{
    return fetch(`${nomorepartiesUrlBase}/users/me`, {
            headers: config.headers
    })
    // Проверка на результат запроса
    .then(res =>{
       return getResponseData(res);
    })
    // Преобразование в промис объекта
    .then((data) => 
        {
            return data;
        })
}

export const userInfoUpdate = (userInfo) =>
{
    return fetch(`${nomorepartiesUrlBase}/users/me`, 
    {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(userInfo)
    })

    .then((res) => 
    {
        return getResponseData(res);
    })


}

export const userAvatarUpdate = (userInfo) => 
{
    return fetch(`${nomorepartiesUrlBase}/users/me/avatar`,
        {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify(userInfo)
        }
    )
    .then((res) => 
        {
            return getResponseData(res);
        })
}

// Получение карточек
export const getInitialCards = () =>{
    return fetch(`${config.baseUrl}/cards`,{
        headers: config.headers
    })
    // проверка, ок ли результат
    .then(res =>{
        return getResponseData(res);        
    })

    .then((cardData) => 
        {
            return cardData;
        })
}

export const postNewCard = (newCard) =>
{
    return fetch(`${nomorepartiesUrlBase}/cards`,
    {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCard)
    })
    
    .then((res) => 
        {
            return getResponseData(res);
        })
}

export const deleteCardById = (cardId) => 
{
    return fetch(`${nomorepartiesUrlBase}/cards/${cardId} `,
        {
            method: 'DELETE',
            headers: config.headers
        }
    )
    .then((res) => {
        return getResponseData(res);
    })
}

export const likeCardUser = (cardId) => 
{
    return fetch(`${nomorepartiesUrlBase}/cards/likes/${cardId} `,
        {
            method: 'PUT',
            headers: config.headers
        }
    )
    .then((res) =>
        {
            return getResponseData(res);
        })
}

export const likeCardUserDel = (cardId) => 
{
    return fetch(`${nomorepartiesUrlBase}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then((res) =>
        {
            return getResponseData(res);
        })
}