import React from 'react';
import PopupWithForm from "./PopupWithForm";


function ConfirmPopup({card, isOpen, onClose, onCardDelete}) {

    function handleSubmit(e) {

        e.preventDefault();

        onCardDelete(card);
    }


    return (
        <PopupWithForm
            name={'confirm'}
            title={'Вы уверены?'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}

export default ConfirmPopup;