import {deleteCardById, likeCardUser, likeCardUserDel} from './api'

export function createCard(item, template, deleteCard, likeCard, openPlacePopup, myDataId){
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardLikeBtn = card.querySelector('.card__like-button');
    const cardLikeScore = card.querySelector('.card__like-score');


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
        deleteCard(e, item)
    });

    // лайк
    cardLikeBtn.addEventListener('click', (e)=>{
        likeCard(e, item, cardLikeScore, myDataId);
    })

    return card
}

export const deleteCard = (e, card) =>{

    deleteCardById(card._id)
    .then(() =>
    {
        const cardToDelete = e.target.closest('.card');
        cardToDelete.remove();
    })
    .catch((err) => console.error('Ошибка при удалении карточки:', err));
}

//лайк карточки
export function likeCard(e, card, cardLikeScore, myDataId){

    const isLiked = e.target.classList.contains('card__like-button_is-active');

        
    if(isLiked){
        likeCardUserDel(card._id)
        .then((item) => 
        {
            cardLikeScore.textContent = item.likes.length; // Обновляем счётчик лайков
            e.target.classList.toggle('card__like-button_is-active', item.likes.some(user => user._id === myDataId));

        })
        .catch((err) => console.error('Ошибка при обновлении лайка:', err));
    }
    else{
        likeCardUser(card._id)
        .then((item) => {
            cardLikeScore.textContent = item.likes.length; // Обновляем счётчик лайков
            e.target.classList.toggle('card__like-button_is-active', item.likes.some(user => user._id === myDataId));
        })
        .catch((err) => console.error('Ошибка при обновлении лайка:', err));
    }
}