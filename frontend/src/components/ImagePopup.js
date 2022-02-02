function ImagePopup({isOpen, card, onClose}) {

    function handlePopupClose(e) {
        if (e.target.classList.contains('popup_opened')) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_open-image ${isOpen ? 'popup_opened' : ''}`}
             onClick={handlePopupClose}>
            <div className="popup__open-image">
                <img src={card ? card.link : ''} alt={card ? card.name: ''} className="popup__image"/>
                <p className="popup__image-title">{card ? card.name: ''}</p>
                <button className="popup__close popup__close_type_image" type="button" aria-label="Закрыть"
                        onClick={onClose}/>
            </div>
        </div>
    );
}

export default ImagePopup;