import logo from "../images/logo.svg";
import {useLocation, Link} from "react-router-dom";
import {useState} from "react";

function Header({loggedIn, onSingOut, autoEmail}) {

    const [isActive, setIsActive] = useState(false);

    const address = useLocation();

    function handleSignOut() {
        setIsActive(false);
        setTimeout(onSingOut, 700);
    }

    function handleNavi() {
        setIsActive(!isActive);
    }

    return (
        <header className="header page__item">
            {loggedIn && (
            <div className={`header__menu ${!isActive ? 'header__menu_active' : ''}`}>
                <nav className={`header__entry header__show-menu`}>
                    <p className="header__text">{autoEmail}</p>
                    <button className="header__button" type="button" onClick={handleSignOut}>Выйти</button>
                </nav>
            </div>
            )}
            <div className="header__basic">
                <img src={logo} alt="Лого шапки" className="header__logo"/>
                {loggedIn && (
                    <>
                            <nav className="header__entry">
                                <p className="header__text">{autoEmail}</p>
                                <button className="header__button" type="button" onClick={handleSignOut}>Выйти</button>
                            </nav>
                        <button className="header__navi" type="button" onClick={handleNavi}>
                            <span
                                className={`header__navi-line 
                                ${isActive ? 'header__navi-line_active' : ''}`}>
                            </span>
                        </button>
                    </>
                )}
            {!loggedIn && (
                <p>
                    {address.pathname === '/sign-in' &&
                    (<Link className="header__link" to="/sign-up">Регистрация</Link>)}
                    {address.pathname === '/sign-up' &&
                    (<Link className="header__link" to="/sign-in">Войти</Link>)}
                </p>
            )}
            </div>
        </header>
    );
}

export default Header;