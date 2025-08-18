import {Link} from 'react-router-dom';

type LocationProps = {
  isActive: boolean;
  city: string;
}

const LocationComponent = ({isActive, city} : LocationProps) => {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href={`/${city}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationComponent;
