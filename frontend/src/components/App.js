import {useState, useEffect} from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from '../components/EditProfilePopup'
import EditAvatarPopup from '../components/EditAvatarPopup'
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Register from './Register';
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";
import {Routes, Route, useNavigate} from "react-router-dom";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setIsSelectedCard] = useState(null);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);
    const [authorizedEmail, setIsAuthorizedEmail] = useState('');

    const [currentUser, setIsCurrentUser] = useState({avatar: '', name: '', about: ''})
    ;
    const [cards, setIsCards] = useState([]);

    const [loggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([api.getAllCards(), api.getApiUserInfo()])
            .then(([allCards, userData]) => {
                setIsCurrentUser(userData);
                setIsCards(allCards);
            })
            .catch((err) => {
                console.log(`${err}`);
            });
        const close = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', close)
        return () => document.removeEventListener('keydown', close)
    }, []);

    useEffect(() => {
        handleTokenCheck()
    }, [])

    useEffect(() => {
        if (loggedIn === true) {
            navigate('/')
        }
    }, [loggedIn, navigate])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setIsSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleDeleteClick(card) {
        setIsSelectedCard(card);
        setIsConfirmPopupOpen(true);
    }


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsConfirmPopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
    }

    //Изменить инфо пользователя
    function handleUpdateUser(data) {
        api.patchUserInfo(data)
            .then(
                (data) => {
                    setIsCurrentUser(data);
                    closeAllPopups();
                })
            .catch((err) => {
                console.log(err);
            })
    }

    //Изменить аватар
    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
            .then(
                (data) => {
                    setIsCurrentUser(data);
                    closeAllPopups();
                })
            .catch((err) => {
                console.log(err);
            })
    }

    //Функция лайка карточки
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setIsCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Функция удаления карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setIsCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //Функция добавления карточки
    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((newCard) => {
                setIsCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    //Регистрация
    function handleSignUp(email, password) {
        auth.register(email, password)
            .then(
                () => {
                    setIsRegistered(true);
                    navigate('/sign-in');
                })
            .catch((err) => {
                console.log(err);
                setIsRegistered(false);
            })
            .finally(() => {
                setIsInfoTooltipPopupOpen(true);
            })
    }

    //Проверка токена
    function handleTokenCheck() {
        const jwt = localStorage.getItem("jwt")
        if (jwt) {
            const jwt = localStorage.getItem("jwt")
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true)
                        setIsAuthorizedEmail(res.data.email)
                    }
                })
                .catch((err) => {
                    console.log(`Не удалось получить токен: ${err}`)
                })
        }
    }

    //Функция выхода из акка
    function handleLogout() {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        navigate('/sign-in')
    }

    //Функция входа
    function handleAuthorize(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setIsLoggedIn(true);
                setIsAuthorizedEmail(email)
                navigate('/');
            })
            .catch((err) => {
                if (err===Number(400)) {
                    alert('Не заполнено одно из полей')
                } else if (err===Number(401)) {
                    alert('Неправильно введен логин или пароль')
                }
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={loggedIn}
                    autoEmail={authorizedEmail}
                    onSingOut={handleLogout}
                />
                <Routes>
                    <Route path="/sign-up" element={
                        <Register
                            onAddUser={handleSignUp}
                        />}/>
                    <Route path="/sign-in" element={
                        <Login
                            onEntryUser={handleAuthorize}
                        />}/>
                    <Route exact path="/" element={
                        <ProtectedRoute
                            element={Main}
                            loggedIn={loggedIn}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteClick}
                            cards={cards}
                        />}
                    />
                </Routes>
                <Footer/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>
                <ImagePopup
                    isOpen={isImagePopupOpen}
                    card={selectedCard}
                    onClose={closeAllPopups}/>
                <ConfirmPopup onClose={closeAllPopups} isOpen={isConfirmPopupOpen} card={selectedCard}
                              onCardDelete={handleCardDelete}/>
                <InfoTooltip onClose={closeAllPopups}
                             isOpen={isInfoTooltipPopupOpen}
                             isRegistered={isRegistered}/>


            </div>
        </CurrentUserContext.Provider>
    )
        ;
}

export default App;

