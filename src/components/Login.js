import { useState } from 'react';
import { useIntl } from 'react-intl';
import EnterPageForm from './EnterPageForm';

export default function Login(props) {

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
    props.onLogin(email, password);
    resetForm();
  }

  return (
    <EnterPageForm name="login-form"
      formTitle={intl.formatMessage({id: 'login', defaultMessage: 'Вход'})}
      submitButtonText={intl.formatMessage({id: 'to_login', defaultMessage: 'Войти'})}
      onSubmit={handleSubmit}>
      <input id="enter__login-email-input" type="email" name="loginEmail"
        className="page__form-text page__form-text_theme_black-box" placeholder="Email" minLength="3" maxLength="254" required="required" value={email}
        onChange={handleEmailChange}/>
      <span className="enter__login-email-input-error page__form-text-error">
        {intl.formatMessage({id: 'missed_field_error', defaultMessage: 'Вы пропустили это поле.'})}
      </span>
      <input id="enter__login-password-input" type="password" name="loginPassword"
        className="page__form-text page__form-text_theme_black-box"
        placeholder={intl.formatMessage({id: 'password', defaultMessage: 'Пароль'})}
        minLength="8" maxLength="64" required="required" value={password}
        onChange={handlePasswordChange} />
      <span className="enter__login-password-input-error page__form-text-error">
        {intl.formatMessage({id: 'missed_field_error', defaultMessage: 'Вы пропустили это поле.'})}
      </span>
    </EnterPageForm>
  );
}
