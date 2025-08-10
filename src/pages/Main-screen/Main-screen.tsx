import LocationComponent from '../../components/Location/Location';
import PlaceCardComponent from '../../components/Place-card/Place-card';
import Logo from '../../components/Logo/Logo';
import {Offer, Location} from "../../types/types";

type MainScreenProps = {
  offers: Offer[];
  locations: Location[];
}

const MainScreen = ({offers, locations} : MainScreenProps) => {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo linkClass={'header__logo-link header__logo-link--active'} />
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

      <main className={`page__main page__main--index ${offers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {locations.map((location,i) => (
                <LocationComponent
                  key={location.id}
                  city={location.city}
                  isActive={location.isActive}
                />
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${offers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            {offers.length !== 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in Amsterdam</b>
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
                  {offers.map((offer, i) => (
                    <PlaceCardComponent
                      key={offer.id}
                      isPremium={offer.isPremium}
                      imageUrl={offer.imageUrl}
                      price={offer.price}
                      isMarkActive={offer.isMarkActive}
                      ratingWidth={offer.ratingWidth}
                      name={offer.name}
                      placeType={offer.placeType}
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
              {offers.length !== 0 ? <section className="cities__map map"></section> : '' }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
