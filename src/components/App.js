import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import api  from '../utils/api';
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

export default function App() {

  const emptyCard = {link: '', name: '', likes: [], _id: '', createdAt: '', owner: ''};

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isPopupSaving, setIsPopupSaving] = useState(false);
  const [selectedCard, setSelectedCard] = useState(emptyCard);
  const [cardToDelete, setCardToDelete] = useState(emptyCard);

  //context state variables
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: '', cohort: ''});
  const [cards, setCards] = useState([]);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(emptyCard);
    setCardToDelete(emptyCard);
  };

  useEffect(() => {
    //get api data on mount in parallel and put it in react state variables
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
      setCurrentUser(info);
      setCards(cards);
    })
    .catch(err => {console.log(err)});
  }, []);

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
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      const newCards = cards.map(c => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(err => {console.log(err)});
  }

  function handleCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card);
  }

  const handleUserUpdate = ({name, about}) => {
    setIsPopupSaving(true);
    api.setUserInfo({name, about})
    .then(info => {
      setCurrentUser(info);
      closeAllPopups();
    })
    .catch(err => {console.log(err)})
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page body__element">
          <Header />
          <Switch>
            <Route exact path="/">
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
                cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
              <Footer />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUserUpdate} isSaving={isPopupSaving} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSaving={isPopupSaving} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleAvatarUpdate} isSaving={isPopupSaving} />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onSubmit={handleConfirmDeleteSubmit} isSaving={isPopupSaving} />
            </Route>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
          </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
