import { useIntl } from 'react-intl';
import { popupConfig } from "../utils/utils";
import successIcon from '../images/success_icon.svg';
import failureIcon from '../images/failure_icon.svg';

export default function InfoTooltip(props) {

  const intl = useIntl();

  return (
    <div className={`popup popup_type_info-tooltip popup_transparent_slightly ${props.isOpen ? popupConfig.popupOpenedClass : ''}`}>
        <div className="page__container page__container_type_fixed-size-adaptive">
          <button className="popup__container-close-btn transparent transparent_amount_more"
            type="button" aria-label={intl.formatMessage({id: 'popup_close_btn', defaultMessage: 'Кнопка закрытия попапа'})}
            onClick={props.onClose}></button>
          <img src={props.infoTooltipContent.success ? successIcon : failureIcon} className="popup__confirm-icon"
            alt={props.infoTooltipContent.success ?
              intl.formatMessage({id: 'success_icon', defaultMessage: 'иконка успеха'})
             : intl.formatMessage({id: 'err_icon', defaultMessage: 'иконка ошибки'})} />
          <p className="popup__confirm-text">
            {props.infoTooltipContent.message}
          </p>
        </div>
    </div>
  );
}
