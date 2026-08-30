import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../Private-route/Private-route';
import MainScreen from '../../pages/Main-screen/Main-screen';
import LoginScreen from '../../pages/Login-screen/Login-screen';
import FavoritesScreen from '../../pages/Favorites-screen/Favorites-screen';
import OfferScreen from '../../pages/Offer-screen/Offer-screen';
import NotFoundScreen from '../../pages/Not-found-screen/Not-found-screen';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Loading from '../../pages/Loading/Loading';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import {
  selectAuthorizationStatus,
  selectIsOffersLoading
} from '../../store/selectors';

const App = () => {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isOffersLoading = useAppSelector(selectIsOffersLoading);
  const isLogged = authorizationStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen isLogged={isLogged}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen isLogged={isLogged} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen isLogged={isLogged}/>}
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
