import React from 'react';
import FavoritePlaceComponent from '../favorite-place/favorite-place';

type FavoritePlaceProps = {
  key: string;
  isPremium: boolean;
  imageUrl: string;
  price: number;
  ratingWidth: string;
  name: string;
  placeType: string;
}

type FavoriteListProps = {
  city: string;
  places: FavoritePlaceProps[];
}

function FavoriteListComponent({city, places} : FavoriteListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="/">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {places.map((place, i) => (
          <FavoritePlaceComponent
            key={place.key}
            isPremium={place.isPremium}
            imageUrl={place.imageUrl}
            price={place.price}
            ratingWidth={place.ratingWidth}
            name={place.name}
            placeType={place.placeType}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoriteListComponent;
