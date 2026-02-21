import FavoritePlaceComponent from '../favorite-place/favorite-place';
import {Offer} from '../../types/types';
import {Link} from 'react-router-dom';

type FavoriteListScreen = {
  city: string;
  offers: Offer[];
}

const FavoriteListComponent = ({city, offers} : FavoriteListScreen) => {

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
        {offers.map((place, i) => (
          <FavoritePlaceComponent
            key={place.id}
            id={place.id}
            isPremium={place.isPremium}
            imageUrl={place.previewImage}
            price={place.price}
            ratingWidth={Math.round(place.rating / 5 * 20) * 5 + '%'}
            name={place.title}
            placeType={place.type}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoriteListComponent;
