import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import { api } from "../../src/utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditCourseDeletePopup from "./EditCourseDeletePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false); // профиль

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false); // карточка
  const [isOnEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false); // аватар
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер
  const [isEditCourseDeletePopupOpen, setEditCourseDeletePopupOpen] =
    useState(false); // подтверждение удаления
  const [cardDeleteAfterCourse, setCardDeleteAfterCourse] = useState({}); //карточка которую нужно удалить

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
            owner: item.owner, //для проверки кто создал карточку\вешать корзину?
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
    const apiMethod = isLiked ? "DELETE" : "PUT";
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

  const [selectedCard, setSelectedCard] = useState({
    state: false,
    name: "",
    link: "",
  }); //для открытия большой карточки

  //пробрасываем в card данные для отрисовки большой карточки
  function onCardClick(name, link) {
    setSelectedCard({ state: true, name, link });
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ state: false, name: "", link: "" });
    setEditCourseDeletePopupOpen(false);
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
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            isOpenProfile={setEditProfilePopupOpen}
            isOpenPlace={setAddPlacePopupOpen}
            isOpenAvatar={setEditAvatarPopupOpen}
            onCardClick={onCardClick}
            isOpenCourseDelete={setEditCourseDeletePopupOpen} //подтверждение удаления
            handleCardCourseDelete={setCardDeleteAfterCourse}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isOnEditAvatarPopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdatePlace={handleAddPlace}
          ></AddPlacePopup>

          <ImagePopup
            onCardClick={selectedCard}
            closeAllPopups={closeAllPopups}
          ></ImagePopup>

          <EditCourseDeletePopup
            isOpen={isEditCourseDeletePopupOpen}
            closeAllPopups={closeAllPopups}
            cardDelete={cardDeleteAfterCourse}
            handleCardDelete={handleCardDelete}
          ></EditCourseDeletePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
