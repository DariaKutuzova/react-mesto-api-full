import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = useRef('');
    const [inputValid, setInputValid] = useState(false);
    const [inputError, setInputError] = useState('');
    const [inputDirty, setInputDirty] = useState(false);
    const className = !inputValid && inputDirty ? 'popup__input_type_error popup__input popup__input_type_notlast'
        : 'popup__input popup__input_type_notlast';

    //Если убрал курсор из инпута
    function blurHandler(e) {
        switch (e.target.name) {
            case 'avatar':
                setInputDirty(true);
                break;
            default:
                setInputDirty(false);
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    function checkInputValid() {
        setInputValid(avatarRef.current.validity.valid);
        setInputError(avatarRef.current.validationMessage);
    }


    useEffect(() => {
        if (isOpen) {
            avatarRef.current.value = '';
            setInputValid(false);
            setInputError('');
            setInputDirty(false);
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isDisabled={!inputValid}
        >
            <input type="url" placeholder="https://somewebsite.com/someimage.jpg"
                   className={className}
                   id="avatar-input"
                   name="avatar" required
                   ref={avatarRef}
                   defaultValue={''}
                   onChange={checkInputValid}
                   onBlur={e => blurHandler(e)}
            />
            <span id="avatar-input-error" className="popup__input-error popup__input-error_active">
            {inputValid && !inputDirty ? '' : inputError}
            </span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;