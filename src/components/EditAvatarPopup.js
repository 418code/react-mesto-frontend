import { popupConfig } from "../utils/utils";
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {

  const inputRef = useRef();
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  };

  return (
    <PopupWithForm name={popupConfig.profileAvatarEditPopupAndFormName}
      formTitle={intl.formatMessage({id: 'update_avatar', defaultMessage: 'Обновить аватар'})}
      submitButtonText={intl.formatMessage({id: 'save', defaultMessage: 'Сохранить'})}
      isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving} >
      <input ref={inputRef} id="popup__profile-avatar-url-input"
        type="url" name="avatarUrl" className="page__form-text"
        placeholder={intl.formatMessage({id: 'avatar_link', defaultMessage: 'Ссылка на аватар'})}
        required="required" />
      <span className="popup__profile-avatar-url-input-error page__form-text-error">
        {intl.formatMessage({id: 'avatar_addr_err', defaultMessage: 'Введите адрес аватара.'})}
      </span>
    </PopupWithForm>
  );
}
