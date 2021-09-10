const popupConfig = {
  popupOpenedClass: 'popup_opened',
  popupSelectorPrefix: '.popup_type_',
  profileAvatarEditButtonSelector: '.profile__avatar-edit-button',
  profileAvatarEditPopupAndFormName: 'edit-avatar',
  profileAddButtonSelector: '.profile__add-button',
  profileAddPopupAndFormName: 'add-place',
  profileEditButtonSelector: '.profile__edit-button',
  profileEditPopupAndFormName: 'edit-profile',
  cardConfirmDeletePopupAndFormName: 'confirm-delete',
  popupWithFormSavingText: 'Сохранение...',
  registerScreenPopupAndFormName: 'register-form',
  loginScreenPopupAndFormName: 'login-form',
  containerThemeEntrance: 'black-box',
};

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25/',
  authorization: 'd8d84bac-32d7-42f9-a622-bbe14f1aa9f5'
};

export {popupConfig, apiConfig};
