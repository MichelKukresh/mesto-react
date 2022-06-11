//данные валидации
const configValidation = {
  formSelector: ".popup__content",
  buttonValid: "popup__save_valid",
  submitButtonSelector: ".popup__save",
};

const popupProfile = ".popup_type_edit-profile";
const popupCard = ".popup_type_new-card";
const popupImage = ".popup_type_image";
const popupSureDel = ".popup_type_sure-del";
const popupChanglAvatar = ".popup_type_changl-avatar";

//3 все кнопки открытия, для большой картинки событие вешается отдельно при создании класса
const popupEditProfileOpen = document.querySelector(".profile__button-open");
const popupNewCardOpen = document.querySelector(".profile__button-add-site");
const popupChanglAvatarOpen = document.querySelector(".profile__image");

//находим поля попапов для вставки/считывания данных
const namePopup = document.querySelector("#popup-input-name");
const professionPopup = document.querySelector("#popup-input-profession");

//найти элементы на открытой карточке
const inputElementSiteCard = document.querySelector("#popup-card-input-site");
const inputElementSrcCard = document.querySelector("#popup-card-input-src");

//мой id для сервера
const myId = "f03d1a7c9876ea4c7fb48341";

export { configValidation };
export {
  popupProfile,
  popupCard,
  popupImage,
  popupEditProfileOpen,
  popupNewCardOpen,
  popupChanglAvatarOpen,
  popupSureDel,
  popupChanglAvatar,
};
export {
  namePopup,
  professionPopup,
  inputElementSiteCard,
  inputElementSrcCard,
  myId,
};
