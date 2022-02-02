import PopupWithForm from "./PopupWithForm";
import {useState, useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [inputValues, setInputValues] = useState({name: '', info: ''});
    const [inputValid, setInputValid] = useState({name: false, info: false});
    const [inputError, setInputError] = useState({name: '', info: ''});
    const [inputDirty, setInputDirty] = useState({name: false, info: false});

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        if (currentUser && isOpen) {
            setInputValues({name: currentUser.name, info: currentUser.about});
            setInputValid({name: false, info: false});
            setInputError({name: '', info: ''});
            setInputDirty({name: false, info: false});
        }
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: inputValues.name,
            info: inputValues.info,
        });
    }

    //Если убрал курсор из инпута
    function blurHandler(e) {
        switch (e.target.name) {
            case 'name':
                setInputDirty({name: true});
                break;
            case 'info':
                setInputDirty({info: true});
                break;
            default:
                setInputDirty(false);
                break;
        }
    }

    //Проверка на валидность
    function checkInputValid(e) {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
        setInputValid({
            ...inputValid,
            [e.target.name]: e.target.validity.valid
        });
        setInputError({
            ...inputError,
            [e.target.name]: e.target.validationMessage
        });
    }

    return (
        <PopupWithForm
            name={'profile'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={!inputValid.name || !inputValid.info}
        >
            <input type="text" placeholder="Имя Фамилия" className={`popup__input popup__input_value_name 
            ${!inputValid.name && inputDirty.name ? 'popup__input_type_error'
                : ''}`}
                   id="name-input" name="name" minLength="2" maxLength="40" required value={inputValues.name}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid}/>
            <span id="name-input-error" className="popup__input-error popup__input-error_active">
                {inputValid.name && !inputDirty.name ? '' : inputError.name}
            </span>
            <input type="text" placeholder="Род деятельности"
                   className={`popup__input popup__input_value_job 
            ${!inputValid.info && inputDirty.info ? 'popup__input_type_error'
                       : ''}`}
                   id="job-input" name="info" minLength="2" maxLength="200" required value={inputValues.info}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid}/>
            <span id="job-input-error" className="popup__input-error popup__input-error_active">
                {inputValid.info && !inputDirty.info ? '' : inputError.info}
            </span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;