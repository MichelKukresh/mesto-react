import { useEffect, useState } from "react";
import { api } from "../../src/utils/Api.js";
import Cards from "./Cards.js";
import krest from "../images/krest.svg";

function Main(props) {
  //для данных о пользователе
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  //для данных карточек
  const [card, setCards] = useState();

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(
        data.map((item) => ({
          name: item.name,
          link: item.link,
          likes: item.likes, //массив из лайкнувших, потом посчитаю и проверю свой
          owner: item.owner._id, //для проверки кто создал карточку\вешать корзину?
          _id: item._id, //id самой карточки
        }))
      );
    });
  }, []);

  //для данных о пользователе
  useEffect(() => {
    api.getInitialUser().then((data) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    });
  }, []);

  return (
    <main className="content page__content">
      <section className="section profile content__section">
        <div className="profile__image-text-pen">
          <div className="profile__change">
            <img
              onClick={() => props.isOpenAvatar(true)}
              className="profile__image"
              src={userAvatar}
              alt="аватар"
            />
          </div>
          <div className="profile__text-pen">
            <div className="profile__text-pen-position">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={() => props.isOpenProfile(true)}
                className="profile__button-open"
                aria-label="Open"
                type="button"
              ></button>
            </div>
            <p className="profile__profession">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={() => props.isOpenPlace(true)}
          className="profile__button-add-site"
          type="button"
        >
          <img src={krest} alt="крестик" />
        </button>
      </section>
      <section className="section elements content__section">
        <ul className="elements__item">
          {card &&
            card.map((cards) => (
              <Cards
                name={cards.name}
                link={cards.link}
                likes={cards.likes}
                owner={cards.owner}
                _id={cards._id}
                onCardClick={props.onCardClick}
                key={cards._id}
              ></Cards>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
