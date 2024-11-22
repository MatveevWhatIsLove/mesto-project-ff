// import '../pages/index.css';

// import {personName,personDescr, popupTypeEdit,popupNewCard,popupTypeImage,popupTypeImageImg,popupTypeImageDescr,formPerson,inputPersonName,inputPersonDescr,formPlace,inputPlaceName,inputPlaceUrl,btnPopupTypeEdit,btnPopupPlaceAdd, placesList, cardTemplate, userInfo} from './components/variables';

// import {initialCards} from './components/cards';

// import { openPopup, close} from './components/popup';

// import{createCard, deleteCard, likeCard} from './components/cardCreate';

// import {enableValidation, clearValidation} from './components/validation';

// import {getInitialCards, getUserInfo, userInfoUpdate, postNewCard, userAvatarUpdate} from './components/api';

// const profileImage = document.querySelector('.profile__image');
// // Заполение профайл
// // const userInfoInsert = () =>
// // {
// //     // получение промис обекта
// //     getUserInfo()
// //         .then((userData)=>
// //             {
// //                 return userData
// //             })
// //         .catch((err) => 
// //             {
// //             console.error(err); // Обработка ошибки
// //             });
// // }

// // Построение карточек начальное
// // const cardInitialStart = () => 
// // {
// //     getInitialCards()
// //         .then((cardList) => 
// //             {
// //                 return cardList
// //             })
// //         .catch((error) => 
// //         {
// //             return error
// //         })
// // }
// // cardInitialStart();

// let myDataId;
// let myData;

// const getUserInfoAndCardBuild = () => 
// {
//     Promise.all([getUserInfo(),getInitialCards()])
//         .then(([userData, cardList]) => 
//         {
//             myDataId = userData.id;
//             myData = userData;

//             document.querySelector('.profile__title').textContent = userData.name;
//             document.querySelector('.profile__description').textContent = userData.about;
//             document.querySelector('.profile__image').setAttribute('style',`background-image: url('${userData.avatar}')`);

//             cardList.forEach(function(post)
//             {
//                 // console.log(isMyCard(item.owner._id));
//                 // console.log(item);
//                 placesList.append(createCard(post, cardTemplate, deleteCard, likeCard, openPlacePopup, myDataId, myData));
//             })
//         })
// }

// getUserInfoAndCardBuild();

// const validationConfig = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   };
  
//   // Включение валидации
//   enableValidation(validationConfig);

  
// const header__btn = document.querySelector('.profile__ava-btn');
// const popupTypeAvatar = document.querySelector('.popup_type_new-avatar');
// const formTypeAvatar = popupTypeAvatar.querySelector('.popup__form');
// const popupInputTypeAvatarUrl = popupTypeAvatar.querySelector('.popup__input_type_avatar_url');
// const popupBtnTypeAvatarUrl = popupTypeAvatar.querySelector('.popup__button');
  
// header__btn.addEventListener('click', ()=>{
//     popupInputTypeAvatarUrl.value = '';
//     clearValidation(popupTypeAvatar, validationConfig);
//     openPopup(popupTypeAvatar);
//     // console.log(1);
// });
  

// // POPUP открытие
// btnPopupTypeEdit.addEventListener('click', ()=>{
//     inputPersonName.value = personName.textContent;
//     inputPersonDescr.value = personDescr.textContent;
//     clearValidation(popupTypeEdit, validationConfig)
//     openPopup(popupTypeEdit);
// });

// btnPopupPlaceAdd.addEventListener('click', ()=>{
//     inputPlaceName.value = '';
//     inputPlaceUrl.value = '';
    
//     clearValidation(popupNewCard, validationConfig)
//     openPopup(popupNewCard);
// });



// function openPlacePopup(item){
//     popupTypeImageImg.src = item.link;
//     popupTypeImageImg.alt = item.alt;
//     popupTypeImageDescr.textContent = item.name
//     openPopup(popupTypeImage);
// }
// // конец

// function handleFormAvatarSubmit(evt) {
//     evt.preventDefault();
//     renderLoadingAva(true, popupTypeAvatar);
//     const newPersonAvatar = popupInputTypeAvatarUrl.value;
//     userInfo.avatar = newPersonAvatar;
//     userAvatarUpdate(userInfo)

//         .finally(() => 
//             {
//                 renderLoadingAva(false, popupTypeAvatar);
//             })
//     profileImage.setAttribute('style',`background-image: url('${newPersonAvatar}')`);
//     close(popupTypeAvatar);
// }
// formTypeAvatar.addEventListener('submit', handleFormAvatarSubmit);

// // Обновлние личных данных
// function handleFormPersonSubmit(evt) {
//     evt.preventDefault();
//     renderLoadingAva(true, popupTypeEdit);
//     const newPersomName = inputPersonName.value;
//     const newPersonDescr =  inputPersonDescr.value;
//     userInfo.name = newPersomName;
//     userInfo.about = newPersonDescr;
//     userInfoUpdate(userInfo)
//     .finally(() => 
//         {
//             renderLoadingAva(false, popupTypeEdit);
//         })
//     personName.textContent = newPersomName;
//     personDescr.textContent = newPersonDescr
//     close(popupTypeEdit);
// }
// formPerson.addEventListener('submit', handleFormPersonSubmit);
// // конец

// // добавление новых мест
// function hendleFormPlaceSubmit(e){
//     e.preventDefault();
//     renderLoadingAva(true, popupNewCard);
//     const newPlaceName = inputPlaceName.value;
//     const newPlaceUrl = inputPlaceUrl.value;

//     const newPlace = {
//         name: newPlaceName,
//         link: newPlaceUrl
//     }

//     postNewCard(newPlace)
//     .then((res) => 
//     {
//         if(res.ok){
//             return res.json();
//         }
//         else{
//             console.log(`Ошибка ${res.status}`);
//         }
//     })
//     .then((post) => 
//     {
//         // console.log(post);
//         placesList.prepend(createCard(post, cardTemplate, deleteCard, likeCard, openPlacePopup, myDataId, myData));
//     })
//     .finally(() => 
//         {
//             renderLoadingAva(false, popupNewCard);
//         })

//     // .then((res) => {
//     //     if(res.ok){
//     //         console.log('ok')
//     //     }
//     // })

    
//     close(popupNewCard);
// }
// formPlace.addEventListener('submit', hendleFormPlaceSubmit);
// // конец

// function renderLoadingAva(isLoading, popup){
//     const btn = popup.querySelector('.popup__button')
//     if (isLoading){
//         btn.textContent = 'Сохранение...'
//     } 
//     else{
//         btn.textContent = 'Сохранить'
//     }
// }

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









