import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const';
import PrivateRoute from '../Private-route/Private-route';
import MainScreen from '../../pages/Main-screen/Main-screen';
import LoginScreen from '../../pages/Login-screen/Login-screen';
import FavoritesScreen from '../../pages/Favorites-screen/Favorites-screen';
import OfferScreen from '../../pages/Offer-screen/Offer-screen';
import NotFoundScreen from '../../pages/Not-found-screen/Not-found-screen';
import {OFFERS} from '../../mock/offers';

const isLogged = true;

const App = () => {
  const FAVORITES = OFFERS.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen offers={OFFERS} city={CITIES[0]} isLogged={isLogged}/>}
        />
        {CITIES.map((city) => (
          <Route
            key={`city-${city}`}
            path={`${AppRoute.Root + city}`}
            element={<MainScreen offers={OFFERS} city={city} isLogged={isLogged}/>}
          />
        ))}
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen favorites={FAVORITES} isLogged={isLogged}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen offers={OFFERS} isLogged={isLogged}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
