import logo from '../images/logo.svg';

export default function Header() {
  return (
    <header className="header body__element">
      <img src={logo} alt="логотип mesto Russia" className="header__logo" />
    </header>
  );
}
