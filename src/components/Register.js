import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import EnterPageForm from './EnterPageForm';

export default function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const intl = useIntl();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(email, password);
    resetForm();
  }

  return (
    <EnterPageForm name="register-form"
      formTitle={intl.formatMessage({id: 'registration', defaultMessage: 'Регистрация'})}
      submitButtonText={intl.formatMessage({id: 'register', defaultMessage: 'Зарегистрироваться'})}
      onSubmit={handleSubmit}>
      <input id="enter__register-email-input" type="email" name="registerEmail"
        className="page__form-text page__form-text_theme_black-box" placeholder="Email" minLength="3" maxLength="254" required="required" value={email}
        onChange={handleEmailChange}/>
      <span className="enter__register-email-input-error page__form-text-error">
        {intl.formatMessage({id: 'missed_field_error', defaultMessage: 'Вы пропустили это поле.'})}
      </span>
      <input id="enter__register-password-input" type="password" name="registerPassword"
        className="page__form-text page__form-text_theme_black-box"
        placeholder={intl.formatMessage({id: 'password', defaultMessage: 'Пароль'})}
        minLength="8" maxLength="64" required="required" value={password}
        onChange={handlePasswordChange} />
      <span className="enter__register-password-input-error page__form-text-error">
        {intl.formatMessage({id: 'missed_field_error', defaultMessage: 'Вы пропустили это поле.'})}
      </span>
      <p className="page__form-bottom-text page__form-bottom-text_theme_black-box">
        {intl.formatMessage({id: 'alrdy_registered', defaultMessage: 'Уже зарегистрированы? '})}
        <Link to="/sign-in" className="page__link page__link_size_small page__link_color_white transparent transparent_amount_more">
          {intl.formatMessage({id: 'to_login', defaultMessage: 'Войти'})}
        </Link>
      </p>
    </EnterPageForm>
  );
}
