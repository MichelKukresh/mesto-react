import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const refName = useRef(null);
  const refLink = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: refName.current.value,
      link: refLink.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      closeAllPopups={props.closeAllPopups}
      name="new-card"
      title="Новое место"
      buttonText="Сохранить"
    >
      <input
        ref={refName}
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
        ref={refLink}
        name="link"
        className="popup__input"
        placeholder="Ссылка на название"
        id="popup-card-input-src"
        type="url"
        required
      />
      <span id="popup-card-input-src-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
