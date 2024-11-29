// Функция для открытия попапа
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
    popup.addEventListener('mousedown', closePopupClick);
}

// Функция для закрытия попапа
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');

    document.removeEventListener('keydown', closePopupEsc);
    popup.removeEventListener('mousedown', closePopupClick);
}

export function initCloseX () {
    const closeButtons = document.querySelectorAll('.popup__close'); 
    closeButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const popup = e.target.closest('.popup_is-opened'); // Находим ближайший попап
            closeModal(popup); // Закрываем его через универсальную функцию
        });
    });
} 

// Обработчик нажатия Escape
function closePopupEsc(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

// Обработчик клика по оверлею
function closePopupClick(e) {
    if (e.target === e.currentTarget) {
        closeModal(e.currentTarget);
    }
}
