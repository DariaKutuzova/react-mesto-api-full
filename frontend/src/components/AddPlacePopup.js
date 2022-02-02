import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [inputValues, setInputValues] = useState({name: '', link: ''});
    const [inputValid, setInputValid] = useState({name: false, link: false});
    const [inputError, setInputError] = useState({name: '', link: ''});
    const [inputDirty, setInputDirty] = useState({name: false, link: false});

    function handleSubmit(e) {

        e.preventDefault();

        onAddPlace({
            name: inputValues.name,
            link: inputValues.link,
        });
    }

    //Если убрал курсор из инпута
    function blurHandler(e) {
        switch (e.target.name) {
            case 'name':
                setInputDirty({name: true});
                break;
            case 'link':
                setInputDirty({link: true});
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
        setInputValid ({
            ...inputValid,
            [e.target.name]: e.target.validity.valid
        });
        setInputError({
            ...inputError,
            [e.target.name]: e.target.validationMessage
        });
    }

    useEffect(() => {
        if (isOpen) {
            setInputValues({name: '', link: ''});
            setInputValid({name: false, link: false});
            setInputError({name: '', link: ''});
            setInputDirty({name: false, link: false});
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name={'add-place'}
            title={'Новое место'}
            buttonText={'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={!inputValid.name || !inputValid.link}
        >
            <input type="text" placeholder="Название" className={`popup__input popup__input_value_place 
            ${!inputValid.name && inputDirty.name ? 'popup__input_type_error'
        : ''}`}
                   id="place-input" name="name" minLength="2" maxLength="30" value={inputValues.name || ""}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid}
                   required/>
            <span id="place-input-error" className="popup__input-error  popup__input-error_active">
                {inputValid.name && !inputDirty.name ? '' : inputError.name}
            </span>
            <input type="url" placeholder="Ссылка на картинку"
                   className={`popup__input popup__input_value_link 
                   ${!inputValid.link && inputDirty.link ? 'popup__input_type_error'
        : ''}`}
                   id="link-input" name="link" value={inputValues.link || ""}
                   onBlur={e => blurHandler(e)}
                   onChange={checkInputValid} required/>
            <span id="link-input-error" className="popup__input-error  popup__input-error_active">
                {inputValid.link && !inputDirty.link ? '' : inputError.link}
            </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;