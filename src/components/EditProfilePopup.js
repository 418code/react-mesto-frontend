import { popupConfig } from '../utils/utils';
import { useContext, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";
import { LOCALES } from '../i18n/locales';
import { useFormWithValidation } from './FormValidate';

export default function EditProfilePopup(props) {

  const {currentUser} = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid, resetForm } = useFormWithValidation(true, currentUser);
  const intl = useIntl();

  const disabledButtonCondition = (!isValid ||
    (values.name === currentUser.name &&
      values.about === currentUser.about &&
      values.email === currentUser.email &&
      values.locale === currentUser.locale));

  useEffect(() => {
    return resetForm();
  }, [resetForm, props.isOpen]);

  useEffect(() => {
    setValues(currentUser);
  }, [setValues, currentUser, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleProfileUpdate({name: values['name'], email: values['email'],
      about: values['about'], locale: values['locale']});
  };

  return (
    <PopupWithForm name={popupConfig.profileEditPopupAndFormName}
      formTitle={intl.formatMessage({id: 'edit_profile', defaultMessage: 'Редактировать профиль'})}
      submitButtonText={intl.formatMessage({id: 'save', defaultMessage: 'Сохранить'})}
      isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving} isSubmitDisabled={disabledButtonCondition} >
      <input id="popup__profile-name-input" type="text" name="name"
        className="page__form-text"
        placeholder={intl.formatMessage({id: 'Jack', defaultMessage: 'Жак-Ив Кусто'})}
        minLength="2" maxLength="40" required="required" value={values.name || ''} onChange={handleChange}/>
      <span className={`page__form-text-error ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['name']}</span>
      <input id="popup__profile-description-input" type="text" name="about"
        className="page__form-text"
        placeholder={intl.formatMessage({id: 'ocean_explorer', defaultMessage: 'Исследователь океана'})}
        minLength="2" maxLength="200" required="required" value={values.about || ''}
        onChange={handleChange} />
      <span className={`page__form-text-error ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['about']}</span>
      <input id="popup__profile-email-input" type="email" name="email"
        className="page__form-text"
        placeholder="Jaques@custeau.fr"
        minLength="2" maxLength="200" required="required" value={values.email || ''}
        onChange={handleChange} />
      <span className={`page__form-text-error ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['email']}</span>
      <select className="popup__select" name="locale" value={values['locale'] || currentUser.locale} onChange={handleChange}>
         <option value={LOCALES.ENGLISH}>English</option>
         <option value={LOCALES.RUSSIAN}>Russian</option>
      </select>
    </PopupWithForm>
  );
}
