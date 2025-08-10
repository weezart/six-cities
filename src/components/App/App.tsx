import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../Private-route/Private-route';
import MainScreen from '../../pages/Main-screen/Main-screen';
import LoginScreen from '../../pages/Login-screen/Login-screen';
import FavoritesScreen from '../../pages/Favorites-screen/Favorites-screen';
import OfferScreen from '../../pages/Offer-screen/Offer-screen';
import NotFoundScreen from '../../pages/Not-found-screen/Not-found-screen';
import {FAVORITES} from '../../mock/favorite';
import {LOCATIONS} from '../../mock/locations';
import {OFFERS} from '../../mock/offers';

const isLogged = true;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen offers={OFFERS} locations={LOCATIONS} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen favorites={FAVORITES} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen isLogged={isLogged} />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
