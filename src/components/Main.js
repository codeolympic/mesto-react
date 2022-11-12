import React from 'react';
import api from '../utils/api';
import Card from './Card';
import blackBackgroundPath from '../images/Black-Background.jpg';

function Main(props) {
  const [userName, setUserName] = React.useState('...');
  const [userDescription , setUserDescription ] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState(blackBackgroundPath);
  const [userId, setUserId] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setUserId(data.userId);
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
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img className="profile__avatar" src={userAvatar} alt="Фотография профиля" />
          <button className="profile__avatar-edit-button link" onClick={props.onEditAvatar} type="button" name="avatar-edit-button"></button>
          <div className="profile__info">
            <div className="profile__container-name">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button link" onClick={props.onEditProfile} type="button" name="edit-button"></button>
            </div>
            <p className="profile__work">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button link" onClick={props.onAddPlace} type="button"></button>
      </section>
      <section className="places" aria-label="Места">
        <ul className="cards">
          {cards.map((cardData) => {
            return (
              <Card key={cardData._id} userId={userId} onCardClick={props.onCardClick} {...cardData} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
