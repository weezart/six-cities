import MainScreen from '../../pages/main-screen/main-screen';
//import {LOCATIONS} from '../../mock/locations';
//import {PLACES} from '../../mock/places';
import {LOCATIONS_EMPTY} from '../../mock/locations';
import {PLACES_EMPTY} from '../../mock/places';

function App(): JSX.Element {
  return <MainScreen places={PLACES_EMPTY} locations={LOCATIONS_EMPTY} />;
  // return <MainScreen places={PLACES} locations={LOCATIONS} />;
}

export default App;
