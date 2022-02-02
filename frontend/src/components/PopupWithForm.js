import React from 'react';

function PopupWithForm({isOpen, onClose, name, title, children, onSubmit, isDisabled, buttonText}) {

    function handlePopupClose(e) {
        if (e.target.classList.contains('popup_opened')) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
        onClick={handlePopupClose}>
            <div className={`popup__container popup__container_type_${name}`}>
                <form action="#" className={`popup__form popup__form_type_${name}`} name={`${name}`}
                      onSubmit={onSubmit}>
                    <h2 className="popup__form-header">{title}</h2>
                    {children}
                    <button className={`popup__button ${isDisabled ?
                        'popup__button_disabled'
                        :
                        ''
                    }`}
                            disabled={isDisabled} type="submit">{buttonText}
                    </button>
                </form>
                <button onClick={onClose} className={`popup__close popup__close_type_${name}`}
                        type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default PopupWithForm;