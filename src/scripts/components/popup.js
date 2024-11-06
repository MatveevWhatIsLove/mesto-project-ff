
export function openPopup(popup) {
    popup.classList.add('popup_is-animated');

    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 0,1); 

    const btnClose = popup.querySelector('.popup__close');
    const closeHandlerPopupX = (e) => closePopupX(e);
    const closeHandlerPopupEsc = (e) => closePopupEsc(e);
    const closeHandlePopupClick = (e) => closePopupClick(e);

    btnClose.addEventListener('click', closeHandlerPopupX);
    document.addEventListener('keydown', closeHandlerPopupEsc);
    popup.addEventListener('click', closeHandlePopupClick);

    popup.closeHandlerPopupX = closeHandlerPopupX;
    popup.closeHandlerPopupEsc = closeHandlerPopupEsc;
    popup.closeHandlePopupClick = closeHandlePopupClick;
}

export function close(item) {
    item.classList.remove('popup_is-opened');
    setTimeout(() => item.classList.remove('popup_is-animated'), 600);
    

    // Удаляем обработчики событий
    item.querySelector('.popup__close').removeEventListener('click', item.closeHandlerPopupX);
    document.removeEventListener('keydown', item.closeHandlerPopupEsc);
    item.removeEventListener('click', item.closeHandlePopupClick);
}

function closePopupX(e) {
    const closestPopup = e.target.closest('.popup');
    close(closestPopup);
}

function closePopupEsc(e) {
    if (e.key === 'Escape') {
        const closestPopup = document.querySelector('.popup_is-opened');
        close(closestPopup);
    }
}

function closePopupClick(e){
    if(e.target === e.currentTarget){
        close(e.currentTarget);
    }
}

