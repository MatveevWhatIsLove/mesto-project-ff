export function createCard(item, template, deleteCardById, likeCardUser, likeCardUserDel, openPlacePopup, myDataId) {
    const card = template.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const cardDeleteButton = card.querySelector('.card__delete-button');
    const cardLikeBtn = card.querySelector('.card__like-button');
    const cardLikeScore = card.querySelector('.card__like-score');

    // Проверка на владельца карточки
    if (myDataId !== item.owner._id) {
        cardDeleteButton.style.display = 'none';
    }

    const isLiked = item.likes.some(user => user._id === myDataId);

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardLikeScore.textContent = item.likes.length;
    if (isLiked) {
        cardLikeBtn.classList.add('card__like-button_is-active');
    }

    cardTitle.textContent = item.name;

    // Открытие карточки
    cardImage.addEventListener('click', () => {
        openPlacePopup(item);
    });

    // Удаление карточки
    cardDeleteButton.addEventListener('click', (e) => {
        deleteCardById(item._id)
            .then(() => {
                e.target.closest('.card').remove();
            })
            .catch(err => console.error('Ошибка при удалении карточки:', err));
    });

    // Лайк карточки
    cardLikeBtn.addEventListener('click', (e) => {
        const isLiked = e.target.classList.contains('card__like-button_is-active');
        const likeAction = isLiked ? likeCardUserDel : likeCardUser;

        likeAction(item._id)
            .then((data) => {
                cardLikeScore.textContent = data.likes.length;
                e.target.classList.toggle('card__like-button_is-active', data.likes.some(user => user._id === myDataId));
            })
            .catch(err => console.error('Ошибка при обновлении лайка:', err));
    });

    return card;
}
