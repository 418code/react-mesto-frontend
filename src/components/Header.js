import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header(props) {
  const location = useLocation();
  const currentRouteElement = () => {
    switch (location.pathname) {
      case '/sign-up': return (<Link to="/sign-in"
        className="page__link page__link_size_adaptive page__link_color_white transparent transparent_amount_more">Войти</Link>);
      case '/sign-in': return (<Link to="/sign-up"
        className="page__link page__link_size_adaptive page__link_color_white transparent transparent_amount_more">Регистрация</Link>);
      case '/': return (<div className="header__container">
                        <p className="header__text">{props.email && props.email}</p>
                        <Link to="sign-in" onClick={props.onLogout}
                          className="page__link page__link_size_adaptive page__link_color_gray transparent transparent_amount_more">Выйти</Link>
                       </div>);
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
