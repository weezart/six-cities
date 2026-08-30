import PlaceCardComponent from '../../components/Place-card/Place-card';
import HeaderComponent from '../../components/Header/Header';
import LocationComponent from '../../components/Location/Location';
import SortingComponent from '../../components/Sorting/Sorting';
import { CITIES, SortOption } from '../../const';
import Map from '../../components/Map/Map';
import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/offers-slice/offers-slice';
import {
  selectCityName,
  selectCityOffers,
  selectFavoritesCount,
  selectOffers,
  selectSortedCityOffers
} from '../../store/selectors';

type MainScreenProps = {
  isLogged: boolean;
};

const MainScreen = ({isLogged} : MainScreenProps) => {
  const [activeCard, setActiveCard] = useState('');
  const [activeSortOption, setActiveSortOption] = useState(SortOption.Popular);

  const dispatch = useAppDispatch();
  const cityName = useAppSelector(selectCityName);
  const offers = useAppSelector(selectOffers);
  const cityOffers = useAppSelector(selectCityOffers);
  const sortedOffers = useAppSelector((state) =>
    selectSortedCityOffers(state, activeSortOption)
  );
  const favoritesCount = useAppSelector(selectFavoritesCount);

  const pageMainClassName = useMemo(
    () => `page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`,
    [offers.length]
  );
  const placesContainerClassName = useMemo(
    () =>
      `cities__places-container ${cityOffers.length === 0 ? 'cities__places-container--empty' : ''} container`,
    [cityOffers.length]
  );

  const handleCityClick = useCallback((selectedCityName: string) => {
    dispatch(changeCity(selectedCityName));
  }, [dispatch]);
  const handleActiveCardChange = useCallback((cardId: string) => {
    setActiveCard(cardId);
  }, []);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent isLogged={isLogged} favoritesCount={favoritesCount} />

      <main className={pageMainClassName}>
        <h1 className="visually-hidden">Cities {cityName}</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((currentCityName) => (
                <LocationComponent
                  key={`city-${currentCityName}`}
                  activeCityName={cityName}
                  cityName={currentCityName}
                  onCityClick={handleCityClick}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={placesContainerClassName}>
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
                      imageUrl={offer.previewImage}
                      price={offer.price}
                      isMarkActive={offer.isFavorite}
                      ratingWidth={`${Math.round(offer.rating / 5 * 20) * 5}%`}
                      name={offer.title}
                      placeType={offer.type}
                      setActiveCard={handleActiveCardChange}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {cityName}</p>
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
