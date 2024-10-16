// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = e =>{
    const cardToDelete = e.target.closest('.card');
    cardToDelete.remove();
}

function createCard(item, deleteCard){
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardDeleteButton.addEventListener('click', deleteCard);
    
    return card
}

initialCards.forEach(function(item){
    placesList.append(createCard(item, deleteCard));
})