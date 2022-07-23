import { useIntl } from 'react-intl';
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {

  const intl = useIntl();

  return (
    <PopupWithForm
      formTitle={intl.formatMessage({id: 'sure?', defaultMessage: 'Вы уверены?'})}
      submitButtonText={intl.formatMessage({id: 'yes', defaultMessage: 'Да'})}
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={props.onSubmit}
      onlyTitle={true} isSaving={props.isSaving} />
  );
}
