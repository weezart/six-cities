import cn from 'classnames';
import { City } from '../../types/types';
import styles from './Location.module.css';

type LocationProps = {
  city: City;
  activeCity: City;
  onCityClick: (city: City) => void;
}

const LocationComponent = ({activeCity, city, onCityClick} : LocationProps) => (
  <li className="locations__item">
    <button
      type="button"
      onClick={() => onCityClick(city)}
      className={cn(
        'locations__item-link',
        'tabs__item',
        styles.button,
        activeCity.name === city.name && 'tabs__item--active',
      )}
    >
      <span>{city.name}</span>
    </button>
  </li>
);

export default LocationComponent;
