import cn from 'classnames';
import styles from './Location.module.css';

type LocationProps = {
  cityName: string;
  activeCityName: string;
  onCityClick: (cityName: string) => void;
}

const LocationComponent = ({activeCityName, cityName, onCityClick} : LocationProps) => (
  <li className="locations__item">
    <button
      type="button"
      onClick={() => onCityClick(cityName)}
      className={cn(
        'locations__item-link',
        'tabs__item',
        styles.button,
        activeCityName === cityName && 'tabs__item--active',
      )}
    >
      <span>{cityName}</span>
    </button>
  </li>
);

export default LocationComponent;
