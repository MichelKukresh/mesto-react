import "./Cards.js";

function Сards(props) {

  function handleCardClick() {
    props.onCardClick(props.name, props.link)
  }
  
  return (
    <li className="elements__item-list">
      <img
        className="elements__image"
        src={props.link}
        alt={props.name}
        onClick={handleCardClick}
      />
      <button className="elements__dell" type="button"></button>
      <div className="elements__txt-hart">
        <h3 className="elements__cut-text">{props.name}</h3>
        <div>
          <button className="elements__hart" type="button"></button>
          <h3 className="elements__how-like">{props.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Сards;
