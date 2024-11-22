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

import { openPopup, close } from './components/popup';
import { createCard, deleteCard, likeCard } from './components/cardCreate';
import { enableValidation, clearValidation } from './components/validation';
import { getInitialCards, getUserInfo, userInfoUpdate, postNewCard, userAvatarUpdate } from './components/api';

let myDataId;
let myData;

// Получение информации о пользователе и карточках
const loadInitialData = () => {
    Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cardList]) => {
            myDataId = userData.id;
            myData = userData;

            personName.textContent = userData.name;
            personDescr.textContent = userData.about;
            profileImage.style.backgroundImage = `url('${userData.avatar}')`;

            cardList.forEach((post) => {
                placesList.append(createCard(post, cardTemplate, deleteCard, likeCard, openPlacePopup, myDataId, myData));
            });
        })
        .catch((err) => console.error(`Ошибка загрузки данных: ${err}`));
};

loadInitialData();



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
    openPopup(popupTypeAvatar);
});

// Обработка формы аватара
formTypeAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonLoading(true, popupTypeAvatar);

    const newPersonAvatar = popupInputTypeAvatarUrl.value;
    userAvatarUpdate({ avatar: newPersonAvatar })
        .then(() => {
            profileImage.style.backgroundImage = `url('${newPersonAvatar}')`;
            close(popupTypeAvatar);
        })
        .catch((err) => console.error(`Ошибка обновления аватара: ${err}`))
        .finally(() => toggleButtonLoading(false, popupTypeAvatar));
});

// Открытие попапа редактирования профиля
btnPopupTypeEdit.addEventListener('click', () => {
    inputPersonName.value = personName.textContent;
    inputPersonDescr.value = personDescr.textContent;
    clearValidation(popupTypeEdit, validationConfig);
    openPopup(popupTypeEdit);
});

// Обработка формы профиля
formPerson.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonLoading(true, popupTypeEdit);

    const newPersonName = inputPersonName.value;
    const newPersonDescr = inputPersonDescr.value;

    userInfoUpdate({ name: newPersonName, about: newPersonDescr })
        .then(() => {
            personName.textContent = newPersonName;
            personDescr.textContent = newPersonDescr;
            close(popupTypeEdit);
        })
        .catch((err) => console.error(`Ошибка обновления профиля: ${err}`))
        .finally(() => toggleButtonLoading(false, popupTypeEdit));
});

// Открытие попапа добавления карточки
btnPopupPlaceAdd.addEventListener('click', () => {
    inputPlaceName.value = '';
    inputPlaceUrl.value = '';
    clearValidation(popupNewCard, validationConfig);
    openPopup(popupNewCard);
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
            // console.log(post);
            placesList.prepend(createCard(post, cardTemplate, deleteCard, likeCard, openPlacePopup, myDataId, myData));
            close(popupNewCard);
        })
        .catch((err) => console.error(`Ошибка добавления карточки: ${err}`))
        .finally(() => toggleButtonLoading(false, popupNewCard));
});

// Открытие попапа просмотра карточки
const openPlacePopup = (item) => {
    popupTypeImageImg.src = item.link;
    popupTypeImageImg.alt = item.name;
    popupTypeImageDescr.textContent = item.name;
    openPopup(popupTypeImage);
};









