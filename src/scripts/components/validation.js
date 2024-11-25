import {config} from "./variables";

const turnOffBtn = (btn, config) => {
    btn.classList.add(config.inactiveButtonClass);
    btn.disabled = true;
}

// Функция для показа ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => 
{
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// Универсальная проверка валидности
const isInputValid = (inputElement) => {
    // данные из input
    const { id, value, validity, dataset, minLength, maxLength } = inputElement;

    if (!validity.valid) return inputElement.validationMessage; //Стандартная валидность


    // Все ок
    return '';
};

// Отображение ошибок
const checkInputValidity = (formElement, inputElement, config) => {
    const errorMessage = isInputValid(inputElement);

    if (errorMessage) {
        showInputError(formElement, inputElement, errorMessage, config);
    } 
    else {
        hideInputError(formElement, inputElement, config);
    }
};

// Проверка на наличие невалидных инпутов
// Если в каком-то из инпутов не валид, то вернется не true
const hasInvalidInput = (inputList) => inputList.some((inputElement) => isInputValid(inputElement) !== '');

// Переключение состояния кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        turnOffBtn(buttonElement, config);
    } 
    else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};



// Добавление слушателей на инпуты формы
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    // сброс кнопки при загрузке страницы
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        // при каждом изменении в инпут проверяется влидация и если что - меняется кнопка
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Включение валидации для всех форм
export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        // formElement.addEventListener('submit', (evt) => evt.preventDefault());
        setEventListeners(formElement, config);
    });
};

// Очистка ошибок и отключение кнопки при открытии формы
export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => hideInputError(formElement, inputElement, config));
    turnOffBtn(buttonElement, config);
};
