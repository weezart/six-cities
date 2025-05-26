//import MainScreen from '../../pages/main-screen/main-screen';
//import LoginScreen from '../../pages/login-screen/login-screen';
//import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
//import {FAVORITES} from '../../mock/favorite';
//import {FAVORITES_EMPTY} from '../../mock/favorite';
//import {LOCATIONS} from '../../mock/locations';
//import {PLACES} from '../../mock/places';
//import {LOCATIONS_EMPTY} from '../../mock/locations';
//import {PLACES_EMPTY} from '../../mock/places';

const isLogged = true;

function App(): JSX.Element {
  // return <MainScreen places={PLACES_EMPTY} locations={LOCATIONS_EMPTY} />;
  // return <MainScreen places={PLACES} locations={LOCATIONS} />;
  // return <LoginScreen />;
  // return <FavoritesScreen favorites={FAVORITES_EMPTY} />;
  return <OfferScreen isLogged={isLogged} />;
}

export default App;
