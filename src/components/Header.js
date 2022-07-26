import { Link, Switch, Route } from 'react-router-dom';
import { useIntl } from 'react-intl';
import logo from '../images/logo.svg';

export default function Header(props) {
  const intl = useIntl();

  return (
    <header className="header body__element">
      <img src={logo} alt={intl.formatMessage({id: 'logo', defaultMessage: 'логотип'})}
        className="header__logo" />
      <Switch>
        <Route exact path="/">
          <div className="header__container">
            <Link to="sign-in" onClick={props.onLogout}
              className="page__link page__link_size_adaptive page__link_color_gray transparent transparent_amount_more">
                {intl.formatMessage({id: 'logout', defaultMessage: 'Выйти'})}
            </Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="page__link page__link_size_adaptive page__link_color_white transparent transparent_amount_more">
            {intl.formatMessage({id: 'login', defaultMessage: 'Войти'})}
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="page__link page__link_size_adaptive page__link_color_white transparent transparent_amount_more">
            {intl.formatMessage({id: 'registration', defaultMessage: 'Регистрация'})}
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
