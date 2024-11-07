import '../pages/index.css';

import {personName,personDescr, popupTypeEdit,popupNewCard,popupTypeImage,popupTypeImageImg,popupTypeImageDescr,formPerson,inputPersonName,inputPersonDescr,formPlace,inputPlaceName,inputPlaceUrl,btnPopupTypeEdit,btnPopupPlaceAdd, placesList, cardTemplate} from './components/variables';

import {initialCards} from './components/cards';

import { openPopup, close} from './components/popup';

import{createCard, deleteCard, likeCard} from './components/cardCreate';


// POPUP открытие
btnPopupTypeEdit.addEventListener('click', ()=>{
    inputPersonName.value = personName.textContent;
    inputPersonDescr.value = personDescr.textContent;
    openPopup(popupTypeEdit);
});

btnPopupPlaceAdd.addEventListener('click', ()=>{
    inputPlaceName.value = '';
    inputPlaceUrl.value = '';
    openPopup(popupNewCard);
});

function openPlacePopup(item){
    popupTypeImageImg.src = item.link;
    popupTypeImageImg.alt = item.alt;
    popupTypeImageDescr.textContent = item.name
    openPopup(popupTypeImage);
}
// конец

// Обновлние личных данных
function handleFormPersomSubmit(evt) {
    evt.preventDefault();
    const newPersomName = inputPersonName.value;
    const newPersonDescr =  inputPersonDescr.value;
    personName.textContent = newPersomName;
    personDescr.textContent = newPersonDescr;
    close(popupTypeEdit);
}
formPerson.addEventListener('submit', handleFormPersomSubmit);
// конец

// добавление новых мест
function hendleFormPlaceSubmit(e){
    e.preventDefault();

    const newPlaceName = inputPlaceName.value;
    const newPlaceUrl = inputPlaceUrl.value;

    const newPlace = {
        name: newPlaceName,
        link: newPlaceUrl
    }

    placesList.prepend(createCard(newPlace, cardTemplate, deleteCard, likeCard, openPlacePopup));
    close(popupNewCard);
}
formPlace.addEventListener('submit', hendleFormPlaceSubmit);
// конец

// начальная загрузка фото

initialCards.forEach(function(item){
    placesList.append(createCard(item, cardTemplate, deleteCard, likeCard, openPlacePopup));
})
// конец загрузки начальных фото










