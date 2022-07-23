import { popupConfig } from "../utils/utils";
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {

  const [cardName, setCardName] = useState('');
  const [cardUrl, setCardUrl] = useState('');

  const intl = useIntl();

  useEffect(() => {
    if (props.isOpen === false) {
      setCardName('');
      setCardUrl('');
    }
  }, [props.isOpen]);

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardUrlChange = (e) => {
    setCardUrl(e.target.value);
  }

  const handleSubmit = (evt) => {
    props.onAddPlace(evt, {name: cardName, link: cardUrl});
  };

  return (
    <PopupWithForm name={popupConfig.profileAddPopupAndFormName}
      formTitle={intl.formatMessage({id: 'new_place', defaultMessage: 'Новое место'})}
      submitButtonText={intl.formatMessage({id: 'add_place', defaultMessage: 'Создать'})}
      isOpen={props.isOpen}
      onClose={props.onClose} onSubmit={handleSubmit} isSaving={props.isSaving}>
      <input id="popup__place-name-input" type="text" name="placeName"
        className="page__form-text"
        placeholder={intl.formatMessage({id: 'place_name', defaultMessage: 'Название'})}
        minLength="2" maxLength="30"
        required="required" value={cardName} onChange={handleCardNameChange} />
      <span className="popup__place-name-input-error page__form-text-error">
        {intl.formatMessage({id: 'missed_field_error', defaultMessage: 'Вы пропустили это поле.'})}
      </span>
      <input id="popup__place-url-input" type="url" name="placeUrl"
        className="page__form-text"
        placeholder={intl.formatMessage({id: 'img_link', defaultMessage: 'Ссылка на картинку'})}
        required="required" value={cardUrl} onChange={handleCardUrlChange} />
      <span className="popup__place-url-input-error page__form-text-error">
        {intl.formatMessage({id: 'enter_address_error', defaultMessage: 'Введите адрес сайта.'})}
      </span>
    </PopupWithForm>
  );
}
