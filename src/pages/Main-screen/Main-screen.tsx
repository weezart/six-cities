import PlaceCardComponent from '../../components/Place-card/Place-card';
import HeaderComponent from '../../components/Header/Header';
import LocationComponent from '../../components/Location/Location';
import {Offer} from "../../types/types";
import {CITIES} from '../../const';
import { useState } from 'react';


type MainScreenProps = {
  isLogged: boolean;
  city: string;
  offers: Offer[];
}

const MainScreen = ({isLogged, city, offers} : MainScreenProps) => {
  const cityOffers = offers.filter((offer) => offer.city.name === city);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="page page--gray page--main">
      <HeaderComponent isLogged={isLogged} favoritesCount={favoritesCount} />

      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities {city}</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((citiesItem, i) => (
                <LocationComponent
                  key={`city-${citiesItem}`}
                  isActive={city === citiesItem}
                  city={citiesItem}
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
                <div className="test">{activeCard}</div>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by </span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width={7} height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom ">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  {cityOffers.map((offer, i) => (
                    <PlaceCardComponent
                      key={offer.id}
                      id={offer.id}
                      isPremium={offer.isPremium}
                      imageUrl={offer.images[Math.floor(Math.random() * offer.images.length)]}
                      price={offer.price}
                      isMarkActive={offer.isFavorite}
                      ratingWidth={Math.round(offer.rating / 5 * 20) * 5 + '%'}
                      name={offer.title}
                      placeType={offer.type}
                      setActiveCard={() => {setActiveCard(offer.id)}}
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
              {cityOffers.length !== 0 ? <section className="cities__map map"></section> : '' }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
