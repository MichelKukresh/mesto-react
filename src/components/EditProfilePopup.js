import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      profession: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input
        value={name}
        onChange={handleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
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
  );
}

export default EditProfilePopup;
