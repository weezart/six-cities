import { createSelector } from 'reselect';
import { SortOption } from '../const';
import type { State } from '../types/state';
import type { Offer } from '../types/types';

const selectOffersSlice = (state: State) => state.offers;
const selectOfferSlice = (state: State) => state.offer;
const selectUserSlice = (state: State) => state.user;
const selectFavoritesSlice = (state: State) => state.favorites;

export const selectCityName = createSelector(selectOffersSlice, (offers) => offers.cityName);
export const selectOffers = createSelector(selectOffersSlice, (offers) => offers.offers);
export const selectIsOffersLoading = createSelector(
  selectOffersSlice,
  (offers) => offers.isOffersLoading
);

export const selectAuthorizationStatus = createSelector(
  selectUserSlice,
  (user) => user.authorizationStatus
);
export const selectUser = createSelector(selectUserSlice, (user) => user.user);
export const selectUserEmail = createSelector(selectUser, (user) => user?.email ?? '');

export const selectCurrentOffer = createSelector(
  selectOfferSlice,
  (offer) => offer.currentOffer
);
export const selectNearbyOffers = createSelector(
  selectOfferSlice,
  (offer) => offer.nearbyOffers
);
export const selectComments = createSelector(selectOfferSlice, (offer) => offer.comments);
export const selectIsOfferNotFound = createSelector(
  selectOfferSlice,
  (offer) => offer.isOfferNotFound
);
export const selectIsOfferDataLoading = createSelector(
  selectOfferSlice,
  (offer) => offer.isOfferDataLoading
);
export const selectIsCommentSending = createSelector(
  selectOfferSlice,
  (offer) => offer.isCommentSending
);

export const selectFavoriteOffers = createSelector(
  selectFavoritesSlice,
  (favorites) => favorites.favorites
);
export const selectIsFavoritesLoading = createSelector(
  selectFavoritesSlice,
  (favorites) => favorites.isFavoritesLoading
);
export const selectFavoritesCount = createSelector(
  selectFavoriteOffers,
  (favoriteOffers) => favoriteOffers.length
);
export const selectCityOffers = createSelector(
  [selectOffers, selectCityName],
  (offers, cityName) => offers.filter((offer) => offer.city.name === cityName)
);

const sortOffers = (offers: Offer[], sortOption: SortOption) => {
  switch (sortOption) {
    case SortOption.PriceLowToHigh:
      return [...offers].sort((firstOffer, secondOffer) => firstOffer.price - secondOffer.price);
    case SortOption.PriceHighToLow:
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.price - firstOffer.price);
    case SortOption.TopRatedFirst:
      return [...offers].sort((firstOffer, secondOffer) => secondOffer.rating - firstOffer.rating);
    case SortOption.Popular:
    default:
      return offers;
  }
};

export const selectSortedCityOffers = createSelector(
  [selectCityOffers, (_state: State, sortOption: SortOption) => sortOption],
  (cityOffers, sortOption) => sortOffers(cityOffers, sortOption)
);

export const selectOffersForMap = createSelector(
  [selectCurrentOffer, selectNearbyOffers],
  (currentOffer, nearbyOffers) => {
    if (!currentOffer) {
      return [];
    }
    return [currentOffer, ...nearbyOffers];
  }
);

export const selectFavoriteOffersByCity = createSelector(selectFavoriteOffers, (favorites) =>
  favorites.reduce<Record<string, Offer[]>>((grouped, favorite) => {
    const cityName = favorite.city.name;
    if (!grouped[cityName]) {
      grouped[cityName] = [];
    }
    grouped[cityName].push(favorite);
    return grouped;
  }, {})
);
