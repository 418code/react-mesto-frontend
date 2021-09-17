import { popupConfig } from "../utils/utils";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { authApi } from "../utils/api";

export default function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authApi.register({email, password})
    .then(res => {
      setEmail('');
      setPassword('');
      props.setTooltipSuccess(true);
      history.push('/sign-in');
    })
    .catch(err => {
      props.setTooltipSuccess(false);
    })
    .finally(res => {
      props.openInfoTooltip();
    });
  }

  return (
    <PopupWithForm name={popupConfig.registerScreenPopupAndFormName} formTitle="Регистрация" submitButtonText="Зарегистрироваться" isOpen={true}
      onSubmit={handleSubmit} isSaving={false} theme={popupConfig.containerThemeEntrance}>
      <input id="popup__register-email-input" type="email" name="registerEmail"
        className="popup__form-text popup__form-text_theme_black-box" placeholder="Email" minLength="3" maxLength="254" required="required" value={email}
        onChange={handleEmailChange}/>
      <span className="popup__register-email-input-error popup__form-text-error">Вы пропустили это поле.</span>
      <input id="popup__register-password-input" type="password" name="registerPassword"
        className="popup__form-text popup__form-text_theme_black-box" placeholder="Пароль" minLength="8" maxLength="64" required="required" value={password}
        onChange={handlePasswordChange} />
      <span className="popup__register-password-input-error popup__form-text-error">Вы пропустили это поле.</span>
      <p className="popup__form-bottom-text popup__form-bottom-text_theme_black-box">
        Уже зарегистрированы? <Link to="/sign-in" className="page__link page__link_size_small page__link_theme_black-box">Войти</Link>
      </p>
    </PopupWithForm>
  );
}
