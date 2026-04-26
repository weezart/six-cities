import {useParams} from 'react-router-dom';
import {Offer} from '../../types/types';
import HeaderComponent from '../../components/Header/Header';
import NearPlaceCardComponent from '../../components/Place-card/Near-place-card';
import ReviewFormComponent from '../../components/ReviewForm/ReviewForm';
import { useState } from 'react';

type OfferScreenProps = {
  isLogged: boolean;
  offers: Offer[];
}

type OfferRouteParams = {
  id: string;
};

const OfferScreen = ({offers, isLogged} : OfferScreenProps) => {
  const urlParams = useParams<OfferRouteParams>();
  const placeId = Number(urlParams.id ?? 1);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;
  const selectedOffer = offers.filter((offer) => offer.id === placeId)[0];
  const NearOffers = offers.filter((offer) => offer.city.name === selectedOffer.city.name && offer.id !== selectedOffer.id);
  const { images, isPremium, title, isFavorite, rating, price, type, bedrooms, maxAdults, goods, host, description } = selectedOffer;
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="page">
      <HeaderComponent isLogged={isLogged} favoritesCount={favoritesCount} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="test">{activeCard}</div>
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Фото студия"/>
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                      <div className="offer__mark">
                        <span>Premium</span>
                      </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button
                  className={`offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">${isFavorite ? 'In' : 'To'} bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={`width: ${Math.round(rating / 5 * 20) * 5}%`}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">rating</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro &&
                    <span className="offer__user-status">
                      Pro
                    </span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                <ul className="reviews__list">
                  <li className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                          className="reviews__avatar user__avatar"
                          src="img/avatar-max.jpg"
                          width="54"
                          height="54"
                          alt="Reviews avatar"
                        />
                      </div>
                      <span className="reviews__user-name">
                        Max
                      </span>
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{width: '80%'}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.
                        The building is green and from 18th century.
                      </p>
                      <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                    </div>
                  </li>
                </ul>
                {isLogged && <ReviewFormComponent />}
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {NearOffers.map((offer) => (
                <NearPlaceCardComponent
                  key={offer.id}
                  id={offer.id}
                  isPremium={offer.isPremium}
                  imageUrl={offer.images[Math.floor(Math.random() * offer.images.length)]}
                  price={offer.price}
                  isMarkActive={offer.isFavorite}
                  ratingWidth={`${Math.round(offer.rating / 5 * 20) * 5}%`}
                  name={offer.title}
                  placeType={offer.type}
                  setActiveCard={() => setActiveCard(offer.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferScreen;
