// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

let placesList = document.querySelector('.places__list');
let cardTemplate = document.querySelector('#card-template').content;

let cardDelete = () => (e) =>{
    let parentCard = e.target.closest('.card');
    parentCard.remove();
}

function cardRender(item){
    let card = cardTemplate.querySelector('.card').cloneNode(true);
    let cardImage = card.querySelector('.card__image');
    let cardTitle = card.querySelector('.card__title');
    let cardDeleteButton = card.querySelector('.card__delete-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;

    cardDeleteButton.addEventListener('click', cardDelete(true));

    console.log(card)
    return card
}

initialCards.forEach(function(item){
    placesList.append(cardRender(item));
})