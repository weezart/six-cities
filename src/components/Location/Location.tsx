import {Link} from 'react-router-dom';

type LocationProps = {
  isActive: boolean;
  city: string;
}

const LocationComponent = ({isActive, city} : LocationProps) => (
  <li className="locations__item">
    <Link to={`/${city}`} className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}>
      <span>{city}</span>
    </Link>
  </li>
);

export default LocationComponent;
