import mestoLogoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header" id="main">
      <a className="link" href="#main">
        <img className="header__logo" src={mestoLogoPath} alt="Логотип Mesto" />
      </a>
    </header>
  );
}

export default Header;
