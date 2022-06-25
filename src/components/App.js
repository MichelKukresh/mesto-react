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

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // карточка
  const [isOnEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); // аватар
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" }); //о пользователе => провайдер
  const [isEditCourseDeletePopupOpen, setIsEditCourseDeletePopupOpen] =
    useState(false); // подтверждение удаления
  const [cardDeleteAfterCourse, setCardDeleteAfterCourse] = useState({}); //карточка которую нужно удалить

  const [buttonInfomationAboutSave, setButtonInfomationAboutSave] =
    useState("Сохранить"); // функционал добавления подсказки
  const [buttonInfomationDelete, setButtonInfomationDelete] = useState("Да"); // функционал добавления подсказки

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
    setButtonInfomationDelete("Удаление...");
    api
      .deleteCard(card._id)
      .then(() => {
        const cardsWithoutDeleteCard = cards.filter((c) => c._id !== card._id);
        setCards(cardsWithoutDeleteCard);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationDelete("Да"));
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
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ state: false, name: "", link: "" });
    setIsEditCourseDeletePopupOpen(false);
  }

  function handleUpdateUser({ name, profession }) {
    setButtonInfomationAboutSave("Сохранение...");
    api
      .patchUserInfoNameAbout(name, profession)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  function handleUpdateAvatar({ avatar }) {
    setButtonInfomationAboutSave("Сохранение...");

    api
      .patchAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
  }

  function handleAddPlace({ name, link }) {
    setButtonInfomationAboutSave("Сохранение...");
    api
      .postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setButtonInfomationAboutSave("Сохранить"));
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
            isOpenPlace={setIsAddPlacePopupOpen}
            isOpenAvatar={setIsEditAvatarPopupOpen}
            onCardClick={onCardClick}
            isOpenCourseDelete={setIsEditCourseDeletePopupOpen} //подтверждение удаления
            handleCardCourseDelete={setCardDeleteAfterCourse}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
          />

          <EditAvatarPopup
            isOpen={isOnEditAvatarPopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
          ></EditAvatarPopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            closeAllPopups={closeAllPopups}
            onUpdatePlace={handleAddPlace}
            buttonInfomationAboutSave={buttonInfomationAboutSave}
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
            buttonInfomationDelete={buttonInfomationDelete}
          ></EditCourseDeletePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
