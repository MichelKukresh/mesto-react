//import './App.css';
import Headers from "./Headers";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import ImagePopup from "./ImagePopup";

function App() {
  const [onEditProfile, isEditProfilePopupOpen] = useState(false); // профиль
  const [onAddPlace, isAddPlacePopupOpen] = useState(false); // карточка
  const [onEditAvatar, isEditAvatarPopupOpen] = useState(false); // аватар

  const [selectedCard, handleCardClick] = useState({}); //для открытия большой карточки

  //пробрасываем в card данные для отрисовки большой карточки
  function onCardClick(name, link) {    
    handleCardClick({ state: true, name, link });
  }

  function closeAllPopups() {
    isEditProfilePopupOpen(false);
    isAddPlacePopupOpen(false);
    isEditAvatarPopupOpen(false);
    handleCardClick({});
  }

  return (
    // <html lang="ru">
    //   <head>
    //     <meta charSet="UTF-8" />
    //     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    //     <title>Mesto</title>
    //   </head>
       <div className="page">
        <div className="page__container">
          <Headers />
          <Main
            isOpenProfile={isEditProfilePopupOpen}
            isOpenPlace={isAddPlacePopupOpen}
            isOpenAvatar={isEditAvatarPopupOpen}
            onCardClick={onCardClick}
          />
          <Footer />

          <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={onEditProfile}
            closeAllPopups={closeAllPopups}
            buttonText="Сохранить"
          >
            <input
              name="name"
              className="popup__input"
              id="popup-input-name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              type="text"
              required
            />
            <span id="popup-input-name-error" className="popup__error"></span>
            <input
              name="profession"
              className="popup__input"
              id="popup-input-profession"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              type="text"
              required
            />
            <span id="popup-input-profession-error" className="popup__error"></span>
          </PopupWithForm>

          <PopupWithForm
            name="new-card"
            title="Новое место"
            isOpen={onAddPlace}
            closeAllPopups={closeAllPopups}
            buttonText="Сохранить"
          >
            <input
              name="name"
              className="popup__input"
              placeholder="Название"
              id="popup-card-input-site"
              minLength="2"
              maxLength="30"
              type="text"
              required
            />
            <span id="popup-card-input-site-error" className="popup__error"></span>
            <input
              name="link"
              className="popup__input"
              placeholder="Ссылка на название"
              id="popup-card-input-src"
              type="url"
              required
            />
            <span id="popup-card-input-src-error" className="popup__error"></span>
          </PopupWithForm>

          <ImagePopup
            onCardClick={selectedCard}
            closeAllPopups={closeAllPopups}
          ></ImagePopup>

          <PopupWithForm name="sure-del" title="Вы уверены ?" buttonText="Да"></PopupWithForm>

          <PopupWithForm
            name="changl-avatar"
            title="Обновить Аватар"
            isOpen={onEditAvatar}
            closeAllPopups={closeAllPopups}
            buttonText="Сохранить"
          >
            <input
              name="link"
              className="popup__input"
              id="popup-input-avatar-src"
              placeholder="Ссылка на аватар"
              type="url"
              required
            />
            <span id="popup-input-avatar-src-error" className="popup__error"></span>
          </PopupWithForm>
        </div>
     </div> 
    //</html> */}
  );
}

export default App;
