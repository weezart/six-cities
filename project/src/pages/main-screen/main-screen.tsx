import React from 'react';
import LocationComponent from '../../components/location/location';
import PlaceCardComponent from '../../components/place-card/place-card';

type LocationProps = {
  key: string;
  city: string;
  isActive: boolean;
}

type PlaceCardProps = {
  key: string;
  isPremium: boolean;
  imageUrl: string;
  price: number;
  isMarkActive: boolean;
  ratingWidth: string;
  name: string;
  placeType: string;
}

type MainScreenProps = {
  places: PlaceCardProps[];
  locations: LocationProps[];
}

function MainScreen({places, locations} : MainScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="/">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${places.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {locations.map((location,i) => (
                <LocationComponent
                  key={location.key}
                  city={location.city}
                  isActive={location.isActive}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${places.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            {places.length !== 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{places.length} places to stay in Amsterdam</b>
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
                  {places.map((place, i) => (
                    <PlaceCardComponent
                      key={place.key}
                      isPremium={place.isPremium}
                      imageUrl={place.imageUrl}
                      price={place.price}
                      isMarkActive={place.isMarkActive}
                      ratingWidth={place.ratingWidth}
                      name={place.name}
                      placeType={place.placeType}
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
              {places.length !== 0 ? <section className="cities__map map"></section> : '' }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
