import { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { popupConfig } from "../utils/utils";

export default function PopupWithForm(props) {

  const intl = useIntl();
  const form = useRef();

  //clear custom validity messages
  useEffect(() => {
    //not an array, can't use map
    for (let child of form.current.children) {
      if (child.nodeName === 'INPUT') {
        child.setCustomValidity('');
      }
    }
    form.current.reset();
  }, [props.isOpen]);

  return (
    <div className={`popup popup_type_${props.name} popup_transparent_medium ${props.isOpen && popupConfig.popupOpenedClass}`}>
      <div className="page__container">
        <button className="popup__container-close-btn transparent transparent_amount_more" type="button"
         aria-label={intl.formatMessage({id: 'popup_close_btn', defaultMessage: 'Кнопка закрытия попапа'})}
         onClick={props.onClose}></button>
        <form ref={form} name={props.name} className="page__form" onSubmit={props.onSubmit} noValidate>
          <h2 className={`page__form-title ${props.onlyTitle ? 'page__form-title_onlytitle' : ''}`}>{props.formTitle}</h2>
          {props.children}
          <button className={`page__form-submit-btn ${props.isSubmitDisabled ?
            'page__form-submit-btn_disabled' : 'transparent transparent_amount_much-more'}`}
            type="submit" disabled={props.isSubmitDisabled}>
            {props.isSaving
              ? intl.formatMessage({id: 'saving', defaultMessage: 'Сохранение...'})
              : props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}
