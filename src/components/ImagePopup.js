import { useIntl } from 'react-intl';
import { popupConfig } from "../utils/utils";

export default function ImagePopup(props) {

  const { card } = props.imagePopupContent;
  const intl = useIntl();

  return (
    <div className={`popup popup_type_show-image popup_transparent_slightly ${props.isOpen ? popupConfig.popupOpenedClass : ''}`}>
        <div className="page__container">
          <button className="popup__container-close-btn transparent transparent_amount_more" type="button"
            aria-label={intl.formatMessage({id: 'popup_close_btn', defaultMessage: 'Кнопка закрытия попапа'})}
            onClick={props.onClose}></button>
          <img src={card.link} alt={`${intl.formatMessage({id: 'photo', defaultMessage: 'Фото'})} ${card.name}`} className="popup__photo" onClick={card.onClick} />
          <p className="popup__photo-description">{card.name}</p>
        </div>
    </div>
  );
}
