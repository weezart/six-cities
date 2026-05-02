import {Link} from 'react-router-dom';
import {PlaceCardProps} from '../../types/types';

const PlaceCardComponent = ({id, isPremium, imageUrl, price, isMarkActive, ratingWidth, name, placeType, setActiveCard} : PlaceCardProps) => (
  <article className="cities__card place-card"
    onMouseOver={() => {
      setActiveCard(id);
    }}
  >
    {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
    <div className="cities__image-wrapper place-card__image-wrapper">
      <Link to={`/offer/${id}`}>
        <img className="place-card__image" src={imageUrl} width="260" height="200" alt="Place img" />
      </Link>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button ${isMarkActive ? 'place-card__bookmark-button--active' : ''}`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: ratingWidth}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${id}`}>{name}</Link>
      </h2>
      <p className="place-card__type">{placeType}</p>
    </div>
  </article>
);

export default PlaceCardComponent;
