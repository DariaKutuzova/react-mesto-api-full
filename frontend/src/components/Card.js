import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    //Подписываемся на контекст
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : 'element__like'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
            <div className="element__caption">
                <h2 className="element__description">{card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" aria-label="Нравится" />
                    <span className="element__number-of-likes">{card.likes.length}</span>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="Удалить" />
        </article>
    );
}

export default Card;