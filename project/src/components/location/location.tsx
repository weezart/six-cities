import React from 'react';

type LocationProps = {
  key: string;
  city: string;
  isActive: boolean;
}

function LocationComponent({key, city, isActive} : LocationProps): JSX.Element {
  return (
    <li className="locations__item" id={key}>
      <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="/">
        <span>{city}</span>
      </a>
    </li>
  );
}

export default LocationComponent;
