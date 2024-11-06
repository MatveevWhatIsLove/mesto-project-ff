export function createCard(item, template, deleteCard, likeCard, openPlacePopup){
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardLikeBtn = card.querySelector('.card__like-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;

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
        likeCard(e);
    })

    return card
}

export const deleteCard = e =>{
    const cardToDelete = e.target.closest('.card');
    cardToDelete.remove();
}

//лайк карточки
export function likeCard(e){
    e.target.classList.toggle('card__like-button_is-active');
}