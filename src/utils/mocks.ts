import type {Action} from 'redux';
import type {ThunkDispatch} from 'redux-thunk';
import type {AxiosInstance} from 'axios';
import {AuthorizationStatus, CITIES, FavoriteStatus} from '../const';
import type {State} from '../types/state';
import type {Comment, Offer, Review, UserData} from '../types/types';

export type AppThunkDispatch = ThunkDispatch<State, AxiosInstance, Action<string>>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

const city = {
  name: CITIES[0],
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
};

export const makeFakeOffer = (id = 'offer-id'): Offer => ({
  id,
  title: 'Nice apartment',
  type: 'apartment',
  price: 120,
  city,
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 16,
  },
  isFavorite: false,
  isPremium: false,
  rating: 4,
  description: 'A quiet apartment in the center.',
  images: ['img/apartment-01.jpg'],
  goods: ['Wi-Fi'],
  host: {
    id: 'host-id',
    name: 'Angelina',
    avatarUrl: 'img/avatar.svg',
    isPro: true,
  },
  bedrooms: 2,
  maxAdults: 3,
  previewImage: 'img/apartment-01.jpg',
});

export const makeFakeReview = (id = 1): Review => ({
  id,
  userName: 'Max',
  avatarUrl: 'img/avatar.svg',
  rating: 4,
  text: 'A great stay.',
  dateTime: '2024-06-15T12:00:00.000Z',
  dateLabel: 'June 2024',
});

export const makeFakeComment = (
  id = 1,
  date = '2024-06-15T12:00:00.000Z',
): Comment => ({
  id,
  date,
  user: {
    name: 'Max',
    avatarUrl: 'img/avatar.svg',
    isPro: false,
  },
  comment: 'A great stay.',
  rating: 4,
});

export const makeFakeUser = (): UserData => ({
  name: 'Max',
  email: 'max@test.com',
  token: 'secret-token',
  avatarUrl: 'img/avatar.svg',
  isPro: false,
});

export const makeFakeFavoritePayload = (offerId = 'offer-id') => ({
  offerId,
  status: FavoriteStatus.Yes,
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  offers: {
    cityName: CITIES[0],
    offers: [],
    isOffersLoading: false,
  },
  offer: {
    currentOffer: null,
    nearbyOffers: [],
    comments: [],
    isOfferNotFound: false,
    isOfferDataLoading: false,
    isCommentSending: false,
  },
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
  favorites: {
    favorites: [],
    isFavoritesLoading: false,
  },
  ...initialState,
});
