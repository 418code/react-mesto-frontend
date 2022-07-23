import { useEffect, useState, useContext, useCallback } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { api }  from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../contexts/AuthContext';
import { LocaleContext } from '../contexts/LocaleContext';
import { LOCALES } from '../i18n';

export default function App() {

  const emptyCard = {link: '', name: '', likes: [], _id: '', createdAt: '', owner: ''};

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isPopupSaving, setIsPopupSaving] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [imagePopupContent, setImagePopupContent] = useState(emptyCard);
  const [cardToDelete, setCardToDelete] = useState(emptyCard);

  //context state variables
  const blankCurrentUser = { _id: '', name: '', about: '', avatar: '', email: '', locale: LOCALES.ENGLISH };
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || blankCurrentUser);
  const [cards, setCards] = useState([]);
  const {isLoggedIn} = useContext(AuthContext);

  //locale
  const {changeLocale} = useContext(LocaleContext);
  const intl = useIntl();

  const [infoTooltipContent, setInfoTooltipContent] = useState({success: false, message: 'blank'});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setCardToDelete(emptyCard);
    setIsInfoTooltipOpen(false);
  };

  const showFailPopup = useCallback(() => {
    setInfoTooltipContent({
      message: intl.formatMessage({id: 'error_msg', defaultMessage: 'Произошла ошибка!'}),
      success: false});
  }, [intl]);

  //update current user localStorage data
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    changeLocale(currentUser.locale);
  }, [currentUser, changeLocale, intl]);

  useEffect(() => {
    const closePopupOnEsc = (evt) => {
      if (evt.key === 'Escape')
        closeAllPopups();
    };

    document.addEventListener('keydown', closePopupOnEsc);

    return () => {document.removeEventListener('keydown', closePopupOnEsc)};
  }, []);

  useEffect(() => {
    //get api data on mount and put it in react state variables
    if (isLoggedIn) {
      api.getInitialCards()
      .then((cards) => {
        setCards(cards.reverse());
      })
      .catch(err => {
        console.log(err);
        if (err.indexOf('404') === -1)
          showFailPopup();
      });
    }
  }, [isLoggedIn, showFailPopup]);

  useEffect(() => {
    if (infoTooltipContent.message !== 'blank')
      setIsInfoTooltipOpen(true);
  }, [infoTooltipContent]);

  useEffect(() => {
    if (imagePopupContent._id !== '' && imagePopupContent.owner !== '')
      setIsImagePopupOpen(true);
  }, [imagePopupContent]);

  useEffect(() => {
    if (cardToDelete._id !== '' && cardToDelete.owner !== '')
      setIsConfirmDeletePopupOpen(true);
  }, [cardToDelete]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setImagePopupContent(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
    .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
  }

  const handleProfileUpdate = ({name, about, email, locale}) => {
    setIsPopupSaving(true);
    api.setUserInfo({name, about, email, locale})
    .then(user => {
      setCurrentUser(user.data);
      closeAllPopups();
      setInfoTooltipContent({success: true, message: intl.formatMessage({id: 'profile_success', defaultMessage: 'Профиль успешно обновлён!'})});
    })
    .catch(err => {
      showFailPopup();
      console.log(err)
    })
    .finally(() => {setIsPopupSaving(false)});
  };

  const handleAvatarUpdate = ({avatar}) => {
    setIsPopupSaving(true);
    api.setUserAvatar(avatar)
    .then(res => {
      const userInfo = {...currentUser};
      userInfo.avatar = avatar;
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
    .finally(() => {setIsPopupSaving(false)});
  };

  const handleAddPlaceSubmit = (evt, {name, link}) => {
    evt.preventDefault();
    setIsPopupSaving(true);
    api.addCard({name, link})
    .then(card => {
      setCards(cards => [card, ...cards]);
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
    .finally(() => {setIsPopupSaving(false)});
  };

  const handleConfirmDeleteSubmit = (evt) => {
    evt.preventDefault();
    setIsPopupSaving(true);
    api.deleteCard(cardToDelete._id)
    .then(res => {
      setCards(cards => cards.filter(c => c._id !== cardToDelete._id));
      closeAllPopups();
    })
    .catch(err => console.log(err))
    .finally(() => {setIsPopupSaving(false)});
  };

  //auth logic

  const history = useHistory();
  const { setupIsLoggedIn } = useContext(AuthContext);

  const onLogin = (email, password) => {
    api.signIn({ email, password })
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        api.makeAuthHeaders(data.token);
        setCurrentUser(data.user);
        setupIsLoggedIn(true);
        history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
      showFailPopup();
    });
  };

  const onLogout = () => {
    setCurrentUser(blankCurrentUser);
    setupIsLoggedIn(false);
    closeAllPopups();
    setImagePopupContent(emptyCard);
    localStorage.clear();
  };

  const onRegister = (email, password) => {
    api.register({email, password})
    .then(res => {
      setInfoTooltipContent({
        message: intl.formatMessage({id: 'register_success_msg', defaultMessage: 'Вы успешно зарегистрировались!'}),
        success: true});
      onLogin(email, password);
    })
    .catch(err => {
      console.log(err);
      showFailPopup();
    })
  };

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      <div className="page body__element">
        <Helmet>
          <html lang={intl.formatMessage({id: 'lang', defaultMessage: 'ru'})} />
          <title>{intl.formatMessage({id: 'app_title', defaultMessage: 'Место'})}</title>
          <noscript>{intl.formatMessage({id: 'noscript', defaultMessage: 'Вам нужно включить Javascript, чтобы запустить это приложение.'})}</noscript>
        </Helmet>
        <Header onLogout={onLogout} />
        <Switch>
          <ProtectedRoute exact path="/" render={() => (
            <>
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
              <Footer />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} handleProfileUpdate={handleProfileUpdate} isSaving={isPopupSaving} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSaving={isPopupSaving} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} isSaving={isPopupSaving} />
              <ImagePopup isOpen={isImagePopupOpen} card={imagePopupContent} onClose={closeAllPopups} />
              <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleConfirmDeleteSubmit} isSaving={isPopupSaving} />
            </>
          )} />
          <Route path="/sign-up" render={ () => (
              <Register onRegister={onRegister} />
          )} />
          <Route path="/sign-in" render={() => (
              <Login onLogin={onLogin} />
          )} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} infoTooltipContent={infoTooltipContent} />
      </div>
    </CurrentUserContext.Provider>
  );
}
