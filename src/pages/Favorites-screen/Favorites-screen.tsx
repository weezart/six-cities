import FavoriteListComponent from '../../components/Favorite-list/Favorite-list';
import HeaderComponent from '../../components/Header/Header';
import { useAppSelector } from '../../hooks';
import { selectFavoriteOffers, selectFavoriteOffersByCity } from '../../store/selectors';

type FavoriteScreenProps = {
  isLogged: boolean;
}

const FavoritesScreen = ({isLogged} : FavoriteScreenProps) => {
  const favorites = useAppSelector(selectFavoriteOffers);
  const favoritesByCity = useAppSelector(selectFavoriteOffersByCity);
  const cityGroups = Object.entries(favoritesByCity);

  return (
    <div className={`page ${favorites.length === 0 ? 'page--favorites-empty' : ''}`}>
      <HeaderComponent isLogged={isLogged} favoritesCount={favorites.length} />

      <main className={`page__main page__main--favorites ${favorites.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {favorites.length !== 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cityGroups.map(([city, offers]) => (
                  <FavoriteListComponent
                    key={`city-${city}`}
                    city={city}
                    offers={offers}
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
};

export default FavoritesScreen;
