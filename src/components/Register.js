import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import EnterPageForm from './EnterPageForm';
import { useFormWithValidation } from './FormValidate';

export default function Register(props) {

  const intl = useIntl();
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(values['email'], values['password']);
  };

  return (
    <EnterPageForm name="register-form"
      formTitle={intl.formatMessage({id: 'registration', defaultMessage: 'Регистрация'})}
      onSubmit={handleSubmit}>
      <div className="enter__form-fields">
        <input id="enter__register-email-input" type="email" name="email"
          className="page__form-text page__form-text_theme_black-box" placeholder="Email" minLength="3" maxLength="254" required="required" value={values['email'] || ''}
          onChange={handleChange}/>
        <span className={`page__form-text-error page__form-text-error_theme_black-box ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['email']}</span>
        <input id="enter__register-password-input" type="password" name="password"
          className="page__form-text page__form-text_theme_black-box"
          placeholder={intl.formatMessage({id: 'password', defaultMessage: 'Пароль'})}
          minLength="8" maxLength="64" required="required" value={values['password'] || ''}
          onChange={handleChange} />
        <span className={`page__form-text-error page__form-text-error_theme_black-box ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['password']}</span>
      </div>
      <button className={`page__form-submit-btn page__form-submit-btn_theme_black-box ${props.isSubmitDisabled ?
        'page__form-submit-btn_disabled' : 'transparent transparent_amount_near-max'}`}
        type="submit" disabled={!isValid}>
        {intl.formatMessage({id: 'register', defaultMessage: 'Зарегистрироваться'})}
      </button>
      <p className="page__form-bottom-text page__form-bottom-text_theme_black-box">
        {intl.formatMessage({id: 'alrdy_registered', defaultMessage: 'Уже зарегистрированы? '})}
        <Link to="/sign-in" className="page__link page__link_size_small page__link_color_white transparent transparent_amount_more">
          {intl.formatMessage({id: 'to_login', defaultMessage: 'Войти'})}
        </Link>
      </p>
    </EnterPageForm>
  );
}
