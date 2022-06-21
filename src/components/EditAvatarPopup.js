import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {  
  const counterRef = useRef(null);
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: counterRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
      name="changl-avatar"
      title="Обновить Аватар"
      buttonText="Сохранить"
    >
      <input
        ref={counterRef}
        name="link"
        className="popup__input"
        id="popup-input-avatar-src"
        placeholder="Ссылка на аватар"
        type="url"
        required
      />
      <span id="popup-input-avatar-src-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
