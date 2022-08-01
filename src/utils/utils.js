const popupConfig = {
  popupOpenedClass: "popup_opened",
  popupSelectorPrefix: ".popup_type_",
  profileAvatarEditButtonSelector: ".profile__avatar-edit-button",
  profileAvatarEditPopupAndFormName: "edit-avatar",
  profileAddButtonSelector: ".profile__add-button",
  profileAddPopupAndFormName: "add-place",
  profileEditButtonSelector: ".profile__edit-button",
  profileEditPopupAndFormName: "edit-profile",
  cardConfirmDeletePopupAndFormName: "confirm-delete",
  popupWithFormSavingText: "Сохранение...",
};

const enterConfig = {
  containerThemeEntrance: "black-box",
};

const apiConfig = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.mesto.418co.de/"
      : "http://localhost:3000/",
  appJSONType: "application/json",
};

export { popupConfig, enterConfig, apiConfig };
