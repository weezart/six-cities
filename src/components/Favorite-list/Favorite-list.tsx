import FavoritePlaceComponent from '../Favorite-place/Favorite-place';
import {Offer} from '../../types/types';
import {Link} from 'react-router-dom';
import { memo, useCallback } from 'react';

type FavoriteListScreen = {
  city: string;
  offers: Offer[];
}

function FavoriteListComponent({city, offers} : FavoriteListScreen) {
  const handleCardHover = useCallback(() => undefined, []);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`/${city}`}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((place) => (
          <FavoritePlaceComponent
            key={place.id}
            id={place.id}
            isPremium={place.isPremium}
            imageUrl={place.previewImage}
            price={place.price}
            isMarkActive
            ratingWidth={`${Math.round(place.rating / 5 * 20) * 5}%`}
            name={place.title}
            placeType={place.type}
            setActiveCard={handleCardHover}
          />
        ))}
      </div>
    </li>
  );
}

const MemoizedFavoriteListComponent = memo(FavoriteListComponent);
export default MemoizedFavoriteListComponent;
