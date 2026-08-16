import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Review, UserData} from '../types/types';
import {AuthorizationStatus} from '../const';

const changeCity = createAction<City>('offers/changeCity');

const loadOffers = createAction<Offer[]>('offers/load-all');
const setCurrentOffer = createAction<Offer | null>('offer/setCurrent');
const setNearbyOffers = createAction<Offer[]>('offer/setNearby');
const setComments = createAction<Review[]>('offer/setComments');
const clearOfferData = createAction('offer/clearData');
const setOfferNotFound = createAction<boolean>('offer/setNotFound');
const setOfferDataLoading = createAction<boolean>('offer/setLoading');
const setCommentSending = createAction<boolean>('offer/setCommentSending');

const setAuthorizationStatus = createAction<AuthorizationStatus>('user/setAuthStatus');
const setUser = createAction<UserData | null>('user/setUser');

const setIsLoading = createAction<boolean>('offers/setLoading');

export {
  changeCity,
  loadOffers,
  setCurrentOffer,
  setNearbyOffers,
  setComments,
  clearOfferData,
  setOfferNotFound,
  setOfferDataLoading,
  setCommentSending,
  setAuthorizationStatus,
  setUser,
  setIsLoading
};
