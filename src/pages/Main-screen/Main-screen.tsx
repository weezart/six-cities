import PlaceCardComponent from '../../components/Place-card/Place-card';
import HeaderComponent from '../../components/Header/Header';
import LocationComponent from '../../components/Location/Location';
import SortingComponent from '../../components/Sorting/Sorting';
import { SortOption } from '../../const';
import Map from '../../components/Map/Map';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {City, Offer} from '../../types/types';
import { CITIES } from '../../mock/cities';
import { changeCity } from '../../store/action';


type MainScreenProps = {
  isLogged: boolean;
}

const getSortedOffers = (
  offers: Offer[],
  sortOption: SortOption
) => {
  switch (sortOption) {
    case SortOption.PriceLowToHigh:
      return [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);

    case SortOption.PriceHighToLow:
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);

    case SortOption.TopRatedFirst:
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);

    case SortOption.Popular:
      return [...offers];
  }
};

const MainScreen = ({isLogged} : MainScreenProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeSortOption, setActiveSortOption] = useState(SortOption.Popular);

  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state.city);

  const offers = useAppSelector((state) => state.offers);

  const cityOffers = offers.filter(
    (offer) => offer.city.name === city.name
  );

  const sortedOffers = getSortedOffers(cityOffers, activeSortOption);

  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;

  const handleCityClick = (selectedCity: City) => {
    dispatch(changeCity(selectedCity));
  };

  return (
    <div className="page page--gray page--main">
      <HeaderComponent isLogged={isLogged} favoritesCount={favoritesCount} />

      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities {city.name}</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((citiesItem) => (
                <LocationComponent
                  key={`city-${citiesItem.name}`}
                  activeCity={city}
                  city={citiesItem}
                  onCityClick={handleCityClick}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${cityOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            {cityOffers.length !== 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {cityOffers[0].city.name}</b>
                <SortingComponent
                  activeSortOption={activeSortOption}
                  onSortOptionChange={setActiveSortOption}
                />
                <div className="cities__places-list places__list tabs__content">
                  {sortedOffers.map((offer) => (
                    <PlaceCardComponent
                      key={offer.id}
                      id={offer.id}
                      isPremium={offer.isPremium}
                      imageUrl={offer.images[Math.floor(Math.random() * offer.images.length)]}
                      price={offer.price}
                      isMarkActive={offer.isFavorite}
                      ratingWidth={`${Math.round(offer.rating / 5 * 20) * 5}%`}
                      name={offer.title}
                      placeType={offer.type}
                      setActiveCard={() => {
                        setActiveCard(offer.id);
                      }}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
            )}
            <div className="cities__right-section">
              {cityOffers.length !== 0 ? (
                <Map
                  city={cityOffers[0].city}
                  offers={cityOffers}
                  selectedOfferId={activeCard}
                />
              ) : '' }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
