import React from 'react';
import FavoriteListComponent from '../../components/favorite-list/favorite-list';
import Logo from '../../components/logo/logo';

type FavoritePlaceProps = {
  key: string;
  isPremium: boolean;
  imageUrl: string;
  price: number;
  ratingWidth: string;
  name: string;
  placeType: string;
}

type FavoriteListProps = {
  key: string;
  city: string;
  places: FavoritePlaceProps[];
}

type FavoriteScreenProps = {
  favorites: FavoriteListProps[];
}

function FavoritesScreen({favorites} : FavoriteScreenProps): JSX.Element {
  return (
    <div className={`page ${favorites.length === 0 ? 'page--favorites-empty' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo linkClass={'header__logo-link'} />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="/">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favorites.length === 0 ? '0' : '3'}</span>
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

      <main className={`page__main page__main--favorites ${favorites.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favorites.length !== 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {favorites.map((favorite, i) => (
                  <FavoriteListComponent
                    key={favorite.key}
                    city={favorite.city}
                    places={favorite.places}
                  />
                ))}
              </ul>
            </section>
          ) : (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
