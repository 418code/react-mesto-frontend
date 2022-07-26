import { popupConfig } from "../utils/utils";
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from './FormValidate';

export default function AddPlacePopup(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const intl = useIntl();

  useEffect(() => {
    return resetForm();
  }, [resetForm, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAddPlace({name: values['name'], link: values['url']});
  };

  return (
    <PopupWithForm name={popupConfig.profileAddPopupAndFormName}
      formTitle={intl.formatMessage({id: 'new_place', defaultMessage: 'Новое место'})}
      submitButtonText={intl.formatMessage({id: 'add_place', defaultMessage: 'Создать'})}
      isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving}
      isSubmitDisabled={!isValid}>
      <input id="popup__place-name-input" type="text" name="name"
        className="page__form-text"
        placeholder={intl.formatMessage({id: 'place_name', defaultMessage: 'Название'})}
        minLength="2" maxLength="30"
        required="required" value={values['name'] || ''} onChange={handleChange} />
      <span className={`page__form-text-error ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['name']}</span>
      <input id="popup__place-url-input" type="url" name="url"
        className="page__form-text"
        placeholder={intl.formatMessage({id: 'img_link', defaultMessage: 'Ссылка на картинку'})}
        required="required" value={values['url'] || ''} onChange={handleChange} />
      <span className={`page__form-text-error ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['url']}</span>
    </PopupWithForm>
  );
}
