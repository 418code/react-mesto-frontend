import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header() {
  let location = useLocation();
  const currentRouteElement = () => {
    switch (location.pathname) {
      case '/sign-up': return <Link to="/sign-in" className="page__link page__link_size_adaptive page__link_theme_black-box">Войти</Link>;
      case '/sign-in': return <Link to="/sign-up" className="page__link page__link_size_adaptive page__link_theme_black-box">Регистрация</Link>;
      default:
    }
  };

  return (
    <header className="header body__element">
      <img src={logo} alt="логотип mesto Russia" className="header__logo" />
      {currentRouteElement()}
    </header>
  );
}
