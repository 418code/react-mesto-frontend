import { popupConfig } from "../utils/utils";
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import PopupWithForm from "./PopupWithForm";
import { useFormWithValidation } from './FormValidate';

export default function EditAvatarPopup(props) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const intl = useIntl();

  useEffect(() => {
    return resetForm();
  }, [resetForm, props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateAvatar({avatar: values.url});
  };

  return (
    <PopupWithForm name={popupConfig.profileAvatarEditPopupAndFormName}
      formTitle={intl.formatMessage({id: 'update_avatar', defaultMessage: 'Обновить аватар'})}
      submitButtonText={intl.formatMessage({id: 'save', defaultMessage: 'Сохранить'})}
      isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving} isSubmitDisabled={!isValid}>
      <input id="popup__profile-avatar-url-input"
        type="url" name="url" className="page__form-text"
        placeholder={intl.formatMessage({id: 'avatar_link', defaultMessage: 'Ссылка на аватар'})}
        required="required" value={values.url || ''} onChange={handleChange} />
      <span className={`page__form-text-error ${!isValid ? 'page__form-text-error_active' : ''}`}>{errors['url']}</span>
    </PopupWithForm>
  );
}
