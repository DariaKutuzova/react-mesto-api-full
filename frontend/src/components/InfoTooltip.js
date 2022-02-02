import error from "../images/error.svg";
import success from "../images/success.svg"

function InfoTooltip({isOpen, onClose, isRegistered}) {

    function handlePopupClose(e) {
        if (e.target.classList.contains('popup_opened')) {
            onClose();
        }
    }

    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}
             onClick={handlePopupClose}>
            <div className="popup__container popup__container_type_tooltip">
                <img className="popup__icon" src={isRegistered ? success : error}
                     alt={isRegistered ? 'иконка успешной регистрации' : 'иконка ошибки'}/>
                <h3 className="popup__form-header popup__tooltip-title">{isRegistered ?
                    'Вы успешно зарегистрировались!' :
                    'Что-то пошло не так... Попробуйте ещё раз.'}
                </h3>
                <button onClick={onClose} className={`popup__close`}
                        type="button" aria-label="Закрыть"/>
            </div>
        </div>
    );
}

export default InfoTooltip;