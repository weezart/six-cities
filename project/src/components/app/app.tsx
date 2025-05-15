//import MainScreen from '../../pages/main-screen/main-screen';
import {LOCATIONS, LOCATIONS_EMPTY} from '../../mock/locations';
import {PLACES, PLACES_EMPTY} from '../../mock/places';
import MainScreenEmpty from '../../pages/main-screen-empty/main-screen-empty';

function App(): JSX.Element {
  return <MainScreenEmpty places={PLACES_EMPTY} locations={LOCATIONS_EMPTY} />;
  // return <MainScreen places={PLACES} locations={LOCATIONS} />;
}

export default App;
