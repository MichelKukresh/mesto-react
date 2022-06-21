//import './App.css';
import Headers from "./Headers";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import { api } from "../../src/utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentCardsContext } from "../contexts/CurrentCardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [onEditProfile, isEditProfilePopupOpen] = useState(false); // профиль
  const [onAddPlace, isAddPlacePopupOpen] = useState(false); // карточка
  const [onEditAvatar, isEditAvatarPopupOpen] = useState(false); // аватар

  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер

  //для данных о пользователе
  useEffect(() => {
    api
      .getInitialUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = useState([]); // для данных карточек => провайдер

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            name: item.name,
            link: item.link,
            likes: item.likes, //массив из лайкнувших
            owner: item.owner._id, //для проверки кто создал карточку\вешать корзину?
            _id: item._id, //id самой карточки
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    let apiMethod = isLiked ? "DELETE" : "PUT";
    //Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, apiMethod)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const cardsWithoutDeleteCard = cards.filter((c) => c._id !== card._id);
        setCards(cardsWithoutDeleteCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  function handleUpdateUser({ name, profession }) {
    api
      .patchUserInfoNameAbout(name, profession)
      .then((data) => {
        setCurrentUser(data);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {    
    api
      .patchAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .postCard(name, link)
      .then((newCards) => {
        setCards([newCards, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CurrentCardsContext.Provider value={{ cards, setCards }}>
        <div className="page">
          <div className="page__container">
            <Headers />
            <Main
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDelete}
              isOpenProfile={isEditProfilePopupOpen}
              isOpenPlace={isAddPlacePopupOpen}
              isOpenAvatar={isEditAvatarPopupOpen}
              onCardClick={onCardClick}
            />
            <Footer />

            <EditProfilePopup
              isOpen={onEditProfile}
              closeAllPopups={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={onEditAvatar}
              closeAllPopups={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            ></EditAvatarPopup>

            <AddPlacePopup
              isOpen={onAddPlace}
              closeAllPopups={closeAllPopups}
              onUpdatePlace={handleAddPlace}
            ></AddPlacePopup>

            <ImagePopup
              onCardClick={selectedCard}
              closeAllPopups={closeAllPopups}
            ></ImagePopup>

            <PopupWithForm
              name="sure-del"
              title="Вы уверены ?"
              buttonText="Да"
            ></PopupWithForm>
          </div>
        </div>
      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>    
  );
}

export default App;
