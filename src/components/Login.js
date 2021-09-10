import { popupConfig } from "../utils/utils";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

export default function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <PopupWithForm name={popupConfig.loginScreenPopupAndFormName} formTitle="Вход" submitButtonText="Войти" isOpen={true}
      onSubmit={handleSubmit} isSaving={false} theme={popupConfig.containerThemeEntrance}>
      <input id="popup__login-email-input" type="email" name="loginEmail"
        className="popup__form-text popup__form-text_theme_black-box" placeholder="Email" minLength="3" maxLength="254" required="required" value={email}
        onChange={handleEmailChange}/>
      <span className="popup__login-email-input-error popup__form-text-error">Вы пропустили это поле.</span>
      <input id="popup__login-password-input" type="password" name="loginPassword"
        className="popup__form-text popup__form-text_theme_black-box" placeholder="Пароль" minLength="8" maxLength="64" required="required" value={password}
        onChange={handlePasswordChange} />
      <span className="popup__login-password-input-error popup__form-text-error">Вы пропустили это поле.</span>
    </PopupWithForm>
  );
}
