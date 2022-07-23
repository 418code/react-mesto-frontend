import { useIntl } from 'react-intl';
import { popupConfig } from "../utils/utils";

export default function ImagePopup(props) {

  const intl = useIntl();

  return (
    <div className={`popup popup_type_show-image popup_transparent_slightly ${props.card.link ? popupConfig.popupOpenedClass : ''}`}>
        <div className="page__container">
          <button className="popup__container-close-btn transparent transparent_amount_more" type="button"
            aria-label={intl.formatMessage({id: 'popup_close_btn', defaultMessage: 'Кнопка закрытия попапа'})}
            onClick={props.onClose}></button>
          <img src={props.card.link} alt={`${intl.formatMessage({id: 'photo', defaultMessage: 'Фото'})} ${props.card.name}`} className="popup__photo" onClick={props.card.onClick} />
          <p className="popup__photo-description">{props.card.name}</p>
        </div>
    </div>
  );
}
