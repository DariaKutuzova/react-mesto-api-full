function SignPopup({isOpen, onClose, name, title, children, onSubmit, isDisabled, linkToEntry, buttonText}) {

    function handlePopupClose(e) {
        if (e.target.classList.contains('popup_opened')) {
            onClose();
        }
    }

    return (
        <div className={`sign ${isOpen ? 'popup_opened' : ''}`}
             onClick={handlePopupClose}>
            <div className={`popup__container sign__container`}>
                <form action="#" className={`popup__form`} name={`${name}`}
                      onSubmit={onSubmit}>
                    <h2 className="popup__form-header sign__header">{title}</h2>
                    {children}
                    <button className={`popup__button sign__button`}
                            disabled={isDisabled} type="submit">{buttonText}
                    </button>
                    {linkToEntry}
                </form>
            </div>
        </div>

    );
}

export default SignPopup;