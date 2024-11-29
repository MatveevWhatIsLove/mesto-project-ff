import '../pages/index.css';
import {
    personName,
    personDescr,
    popupTypeEdit,
    popupNewCard,
    popupTypeImage,
    popupTypeImageImg,
    popupTypeImageDescr,
    formPerson,
    inputPersonName,
    inputPersonDescr,
    formPlace,
    inputPlaceName,
    inputPlaceUrl,
    btnPopupTypeEdit,
    btnPopupPlaceAdd,
    placesList,
    cardTemplate,
    profileImage,
    headerBtn,
    popupTypeAvatar,
    formTypeAvatar,
    popupInputTypeAvatarUrl,
    validationConfig,
    userInfo
} from './components/variables';

import { openModal, closeModal, initCloseX} from './components/modal';
import { createCard} from './components/card';
import { enableValidation, clearValidation } from './components/validation';
import { getInitialCards, getUserInfo, userInfoUpdate, postNewCard, userAvatarUpdate, deleteCardById, likeCardUser, likeCardUserDel } from './components/api';

// Получение информации о пользователе и карточках
const loadInitialData = () => {
    Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cardList]) => {
            const myDataId = userData._id;
            personName.textContent = userData.name;
            personDescr.textContent = userData.about;
            profileImage.style.backgroundImage = `url('${userData.avatar}')`;

            cardList.forEach((post) => {
                // placesList.append(createCard(post, cardTemplate, deleteCard, likeCard, openPlacePopup, myDataId));
                placesList.append(createCard(post, cardTemplate, deleteCardById, likeCardUser, likeCardUserDel, openPlacePopup, myDataId));
            });
        })
        .catch((err) => console.error(`Ошибка загрузки данных: ${err}`));
};

loadInitialData();
initCloseX();


// Включение валидации
enableValidation(validationConfig);

// Управление текстом кнопок
const toggleButtonLoading = (isLoading, popup) => {
    const btn = popup.querySelector('.popup__button');
    btn.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};


// Открытие попапа для аватара
headerBtn.addEventListener('click', () => {
    popupInputTypeAvatarUrl.value = '';
    clearValidation(popupTypeAvatar, validationConfig);
    openModal(popupTypeAvatar);
});

// Обработка формы аватара
formTypeAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonLoading(true, popupTypeAvatar);

    const newPersonAvatar = popupInputTypeAvatarUrl.value;
    userAvatarUpdate({ avatar: newPersonAvatar })
        .then((data) => {
            profileImage.style.backgroundImage = `url('${data.avatar}')`;
            closeModal(popupTypeAvatar);
        })
        .catch((err) => console.error(`Ошибка обновления аватара: ${err}`))
        .finally(() => toggleButtonLoading(false, popupTypeAvatar));
});

// Открытие попапа редактирования профиля
btnPopupTypeEdit.addEventListener('click', () => {
    inputPersonName.value = personName.textContent;
    inputPersonDescr.value = personDescr.textContent;
    clearValidation(popupTypeEdit, validationConfig);
    openModal(popupTypeEdit);
});

// Обработка формы профиля
formPerson.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonLoading(true, popupTypeEdit);

    const newPersonName = inputPersonName.value;
    const newPersonDescr = inputPersonDescr.value;

    userInfoUpdate({ name: newPersonName, about: newPersonDescr })
        .then((data) => {
            personName.textContent = data.name;
            personDescr.textContent = data.about;
            closeModal(popupTypeEdit);
        })
        .catch((err) => console.error(`Ошибка обновления профиля: ${err}`))
        .finally(() => toggleButtonLoading(false, popupTypeEdit));
});

// Открытие попапа добавления карточки
btnPopupPlaceAdd.addEventListener('click', () => {
    inputPlaceName.value = '';
    inputPlaceUrl.value = '';
    clearValidation(popupNewCard, validationConfig);
    openModal(popupNewCard);
});

// Обработка формы добавления карточки
formPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonLoading(true, popupNewCard);

    const newPlace = {
        name: inputPlaceName.value,
        link: inputPlaceUrl.value,
    };

    postNewCard(newPlace)
        .then((post) => {
            // (userData)
            const dataID = post.owner._id;
            //  (post);
            // placesList.prepend(createCard(post, cardTemplate, deleteCard, likeCard, openPlacePopup, dataID));
            placesList.prepend(createCard(post, cardTemplate, deleteCardById, likeCardUser, likeCardUserDel, openPlacePopup, dataID));
            closeModal(popupNewCard);
        })
        .catch((err) => console.error(`Ошибка добавления карточки: ${err}`))
        .finally(() => toggleButtonLoading(false, popupNewCard));
});

// Открытие попапа просмотра карточки
const openPlacePopup = (item) => {
    popupTypeImageImg.src = item.link;
    popupTypeImageImg.alt = item.name;
    popupTypeImageDescr.textContent = item.name;
    openModal(popupTypeImage);
};









