import {useParams} from 'react-router-dom';
import HeaderComponent from '../../components/Header/Header';
import NearPlaceCardComponent from '../../components/Place-card/Near-place-card';
import ReviewFormComponent from '../../components/ReviewForm/ReviewForm';
import { useEffect, useState } from 'react';
import ReviewsListComponent from '../../components/Reviews-list/Reviews-list';
import Map from '../../components/Map/Map';
import NotFoundScreen from '../Not-found-screen/Not-found-screen';
import Loading from '../Loading/Loading';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearOfferData, setOfferNotFound } from '../../store/action';
import { fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction } from '../../store/api-actions';

type OfferScreenProps = {
  isLogged: boolean;
}

type OfferRouteParams = {
  id: string;
};

const OfferScreen = ({isLogged} : OfferScreenProps) => {
  const dispatch = useAppDispatch();
  const urlParams = useParams<OfferRouteParams>();
  const placeId = urlParams.id ?? '';
  const offers = useAppSelector((state) => state.offers);
  const selectedOffer = useAppSelector((state) => state.currentOffer);
  const nearOffers = useAppSelector((state) => state.nearbyOffers);
  const comments = useAppSelector((state) => state.comments);
  const isOfferNotFound = useAppSelector((state) => state.isOfferNotFound);
  const isOfferDataLoading = useAppSelector((state) => state.isOfferDataLoading);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;
  const [activeCard, setActiveCard] = useState('');

  useEffect(() => {
    dispatch(clearOfferData());
    if (!placeId) {
      dispatch(setOfferNotFound(true));
      return;
    }

    void dispatch(fetchOfferAction(placeId));
    void dispatch(fetchNearbyOffersAction(placeId));
    void dispatch(fetchCommentsAction(placeId));
  }, [dispatch, placeId, urlParams.id]);

  useEffect(() => {
    if (selectedOffer) {
      setActiveCard(selectedOffer.id);
    }
  }, [selectedOffer]);

  if (isOfferNotFound) {
    return <NotFoundScreen />;
  }

  if (isOfferDataLoading || !selectedOffer) {
    return <Loading />;
  }

  const offersForMap = [selectedOffer, ...nearOffers];
  const { images, isPremium, title, isFavorite, rating, price, type, bedrooms, maxAdults, goods, host, description } = selectedOffer;

  return (
    <div className="page">
      <HeaderComponent isLogged={isLogged} favoritesCount={favoritesCount} />
      <main className="page__main page__main--offer">
        <section className="offer">
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
                  <span style={{width: `${Math.round(rating / 5 * 20) * 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
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
                <ReviewsListComponent reviews={comments} />
                {isLogged && <ReviewFormComponent offerId={selectedOffer.id} />}
              </section>
            </div>
          </div>
          <Map
            city={selectedOffer.city}
            offers={offersForMap}
            selectedOfferId={activeCard}
            className="offer__map map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((offer) => (
                <NearPlaceCardComponent
                  key={offer.id}
                  id={offer.id}
                  isPremium={offer.isPremium}
                  imageUrl={offer.previewImage}
                  price={offer.price}
                  isMarkActive={offer.isFavorite}
                  ratingWidth={`${Math.round(offer.rating / 5 * 20) * 5}%`}
                  name={offer.title}
                  placeType={offer.type}
                  setActiveCard={setActiveCard}
                  resetActiveCard={() => setActiveCard(selectedOffer.id)}
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
