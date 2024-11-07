// export const popupBtnOpen = document.querySelectorAll('.popup-open');
// export const popupTypeEdit = document.querySelector('.popup_type_edit');
// export const popupNewCard = document.querySelector('.popup_type_new-card');
// export const popupTypeImage = document.querySelectorAll('.popup_type_image');



// Инфа ава
export const personName = document.querySelector('.profile__title');
export const personDescr = document.querySelector('.profile__description');
 
 // попапы 
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupTypeImageImg = popupTypeImage.querySelector('.popup__image');
export const popupTypeImageDescr = popupTypeImage.querySelector('.popup__caption');
 // 
 
 // форма из попапа редактированния
export const formPerson = popupTypeEdit.querySelector('.popup__form');
export const inputPersonName = popupTypeEdit.querySelector('.popup__input_type_name');
export const inputPersonDescr = popupTypeEdit.querySelector('.popup__input_type_description');
//

// форма из попапа нового места
export const formPlace = popupNewCard.querySelector('.popup__form');
export const inputPlaceName = popupNewCard.querySelector('.popup__input_type_card-name');
export const inputPlaceUrl = popupNewCard.querySelector('.popup__input_type_url');

// кнопки открытия попап
export const btnPopupTypeEdit = document.querySelector('.profile__edit-button');
export const btnPopupPlaceAdd = document.querySelector('.profile__add-button');
// 
// место и темплейт для карточек
export const placesList = document.querySelector('.places__list');
export const cardTemplate = document.querySelector('#card-template').content;