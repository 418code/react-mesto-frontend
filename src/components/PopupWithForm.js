import { popupConfig } from "../utils/utils";

export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.onClose ? 'popup_transparent_medium' : ''} ${props.isOpen && popupConfig.popupOpenedClass}`}>
      <div className={`popup__container ${props.theme ? `popup__container_theme_${props.theme}` : ''}`}>
        {props.onClose && <button className="popup__container-close-btn transparent transparent_amount_more" type="button" aria-label="Кнопка закрытия попапа"
         onClick={props.onClose}></button>}
        <form name={props.name} className={`popup__form ${props.theme ? `popup__form_theme_${props.theme}` : ''}`}
          noValidate onSubmit={props.onSubmit}>
          <h2 className={`popup__form-title ${props.theme ? `popup__form-title_theme_${props.theme}` : ''}
           ${props.onlyTitle ? 'popup__form-title_onlytitle' : ''}`}>{props.formTitle}</h2>
          {props.children && props.children.filter(child => !(child.props.className.includes('popup__form-bottom-text')))}
          <button className={`popup__form-submit-btn ${props.theme ? `popup__form-submit-btn_theme_${props.theme}` : ''}`}
            type="submit">{props.isSaving ? popupConfig.popupWithFormSavingText : props.submitButtonText}</button>
          {props.children && props.children.filter(child => child.props.className.includes('popup__form-bottom-text'))}
        </form>
      </div>
    </div>
  );
}
