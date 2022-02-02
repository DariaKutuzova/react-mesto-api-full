import { Link} from 'react-router-dom';
import {useState} from "react";
import SignPopup from "./SignPopup";


function Register({isOpen, onClose, onAddUser}) {

    const linkToEntry = (
        <p
            className="sign__description"
        >
            Уже зарегистрированы? <Link className="sign__link" to="/sign-in">Войти</Link>
        </p>
    )

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddUser(email, password);
    }

    return (
        <SignPopup
            name={'login'}
            title={'Регистрация'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Зарегистрироваться'}
            onSubmit={handleSubmit}
            linkToEntry={linkToEntry}
            isDisabled={!email || !password}
        >
            <input type="email" placeholder="Email" className={`popup__input popup__input_value_name sign__input`}
                   id="email-input" name="email" minLength="2" maxLength="40" required value={email}
                   onChange={handleEmailChange}/>
            <span id="email-input-error" className="popup__input-error popup__input-error_active sign__input-error"/>
            <input type="password" placeholder="Пароль"
                   className={`popup__input popup__input_value_job sign__input`}
                   id="password-input" name="password" minLength="2" maxLength="200" required value={password}
                   onChange={handlePasswordChange}/>
            <span id="password-input-error" className="popup__input-error popup__input-error_active sign__input-error"/>
        </SignPopup>
    );
}


export default Register;