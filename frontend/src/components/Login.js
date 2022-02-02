// import * as auth from '../auth.js';

import SignPopup from "./SignPopup";
import {useState} from "react";

function Login({isOpen, onClose, onEntryUser}) {

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
        onEntryUser(email, password);
    }

    return (
        <SignPopup
            name={'login'}
            title={'Вход'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Войти'}
            onSubmit={handleSubmit}
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


export default Login;