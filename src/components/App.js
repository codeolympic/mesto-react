import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { SelectedCardContext } from '../contexts/SelectedCardContext';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userInfo) {
    api.saveUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });

    closeAllPopups();
  }

  function handleUpdateAvatar(avatarInfo) {
    api.saveAvatar(avatarInfo)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });

    closeAllPopups();
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addNewCard(cardInfo)
      .then((data) => {
        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });

      closeAllPopups();
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      }
    );
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });

    setCards((cards) => cards.filter((c) => c._id !== card._id));
  }

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SelectedCardContext.Provider value={selectedCard}>
        <div className="page__content">
          <Header />

          <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />

          <Footer />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <ImagePopup onClose={closeAllPopups} />
        </div>
      </SelectedCardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
