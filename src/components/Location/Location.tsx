import {Link} from 'react-router-dom';

type LocationProps = {
  isActive: boolean;
  city: string;
}

const LocationComponent = ({isActive, city} : LocationProps) => {
  return (
    <li className="locations__item">
      <Link className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to={`/${city}`}>
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default LocationComponent;
