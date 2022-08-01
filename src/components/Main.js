import { useContext } from "react";
import { useIntl } from "react-intl";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  //subscribe to context
  const { currentUser } = useContext(CurrentUserContext);

  const intl = useIntl();

  return (
    <main className="content body__element">
      <section className="profile body__element">
        <div className="profile__pic-info-container">
          <div className="profile__pic-container">
            <img
              src={currentUser.avatar}
              alt={intl.formatMessage({
                id: "acc_pic",
                defaultMessage: "фото аккаунта",
              })}
              className="profile__pic"
            />
            <button
              className="profile__avatar-edit-button transparent transparent_amount_much-more"
              type="button"
              aria-label={intl.formatMessage({
                id: "avatar_edit_btn",
                defaultMessage: "Кнопка редактирования аватара",
              })}
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__name-edit-wrap">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button transparent transparent_amount_more"
                type="button"
                aria-label={intl.formatMessage({
                  id: "profile_edit_btn",
                  defaultMessage: "Кнопка редактирования профиля",
                })}
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button transparent transparent_amount_more"
          type="button"
          aria-label={intl.formatMessage({
            id: "add_place_btn",
            defaultMessage: "Кнопка добавления карточки места",
          })}
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places body__element">
        <ul className="places__list body__element">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
