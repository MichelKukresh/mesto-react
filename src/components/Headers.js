import logo from "../images/logo.svg";

function Headers () {
    return(
        <header className="header section page__header">
        <img className="header__logo" src={logo} alt="логотип"/>
      </header>
    )
}

export default Headers;