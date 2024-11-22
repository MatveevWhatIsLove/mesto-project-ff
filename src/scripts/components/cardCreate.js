import {deleteCardById, likeCardUser, likeCardUserDel} from './api'

export function createCard(item, template, deleteCard, likeCard, openPlacePopup, myDataId, myData){
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardLikeBtn = card.querySelector('.card__like-button');
    const cardLikeScore = card.querySelector('.card__like-score');

    // console.log(item);

    // моя ли карточка
    if(myDataId !== item.owner._id){
        cardDeleteButton.style.display = 'none';
    }

    const isLiked = item.likes.some(user=> user._id === myDataId);

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardLikeScore.textContent = item.likes.length;
    if(isLiked){
        cardLikeBtn.classList.add('card__like-button_is-active')
    }

    cardTitle.textContent = item.name;
    // открытие карточки
    cardImage.addEventListener('click', () => {
        openPlacePopup(item);
    })
    // удаление карточки
    cardDeleteButton.addEventListener('click', (e)=>{
        deleteCard(e, item._id)
    });

    // лайк
    cardLikeBtn.addEventListener('click', (e)=>{
        likeCard(e, item._id, cardLikeScore, myDataId, myData, item);
    })

    return card
}

export const deleteCard = (e, cardId, ) =>{

    deleteCardById(cardId)
    .then((res) =>
    {
        if(res.ok){
            const cardToDelete = e.target.closest('.card');
            cardToDelete.remove();
        }
        else{
            console.log(`Ошибка ${res.status}`);
        }
    })
}

//лайк карточки
export function likeCard(e, cardId, cardLikeScore, myDataId, myData, item){

    const isLiked = e.target.classList.contains('card__like-button_is-active');

        
    if(isLiked){
        likeCardUserDel(cardId)
        .then((item) => 
        {
            cardLikeScore.textContent = item.likes.length; // Обновляем счётчик лайков
            e.target.classList.remove('card__like-button_is-active', item.likes.some(user => user._id === myDataId));
            // console.log(item);

        })
    }
    else{
        likeCardUser(cardId)
        .then((item) => {
            // console.log('Обновлённые данные карточки:', item);
            cardLikeScore.textContent = item.likes.length; // Обновляем счётчик лайков
            e.target.classList.add('card__like-button_is-active', item.likes.some(user => user._id === myDataId));
        })
        .catch((err) => console.error('Ошибка при обновлении лайка:', err));
    }
}