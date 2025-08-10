import {Location} from "../../types/types";

const LocationComponent = ({city, isActive} : Location) => {
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="/">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationComponent;
